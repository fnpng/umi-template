import { message, Spin } from 'antd';
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import QS from 'query-string';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

// 定义请求和响应的类型
interface RequestParams {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  data?: unknown;
  params?: unknown;
  loading?: boolean; // 是否开启全局加载
  debounce?: boolean; // 是否防抖重复请求
  stringify?: boolean; // 是否序列化data
}

interface ResponseData<T> {
  code: number;
  msg: string;
  data: T;
}

// 创建一个Map对象，用来存储key和cancel函数
const pendingRequest = new Map();

// 生成缓存key的函数
const generateKey = (
  config: InternalAxiosRequestConfig<Record<string, unknown>>,
) => {
  const { method, url, params, data } = config;
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
};

const service: AxiosInstance = axios.create({
  // baseURL: '/',
  timeout: 15000,
});

let loadingCount = 0; // 记录当前正在请求的数量

// 显示loading
function showLoading() {
  if (loadingCount === 0) {
    const dom = document.createElement('div');
    dom.setAttribute('id', 'loading-container');
    document.body.appendChild(dom);
    createRoot(document.querySelector('#loading-container') as Element).render(
      <Spin />,
    );
  }
  loadingCount++;
}

// 隐藏loading
function hideLoading() {
  loadingCount--;
  if (loadingCount === 0) {
    document.body.removeChild(
      document.getElementById('loading-container') as Element,
    );
  }
}

service.interceptors.request.use(
  (config) => {
    // 获取当前请求的key
    const key = generateKey(config);
    // 如果Map中已经存在该key，说明是重复请求，取消之前的请求
    if (pendingRequest.has(key)) {
      const controller = pendingRequest.get(key);
      controller.abort();
      pendingRequest.delete(key);
    }
    // 创建一个新的AbortController，并把它和key添加到Map中
    if (config?.headers?.debounce) {
      const controller = new AbortController();
      config.signal = controller.signal;
      pendingRequest.set(key, controller);
    }

    const token = window.sessionStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = token;
    }

    // 在请求头判断是否需要loading效果
    if (config?.headers?.loading) {
      showLoading();
    }
    return config;
  },
  (error) => {
    if (error.config?.headers?.loading) {
      showLoading();
    }
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response: AxiosResponse<Record<string, unknown>>) => {
    // 获取当前响应的key，并从Map中删除它，表示请求已完成
    const key = generateKey(response.config);
    if (pendingRequest.has(key)) {
      pendingRequest.delete(key);
    }

    if (response?.config?.headers?.loading) {
      hideLoading();
    }

    if (response?.data?.code === 200) {
      return response;
    } else {
      const { code, data, msg } = response?.data;
      switch (code) {
        case 600:
          setTimeout(() => {
            window.location.pathname = '/login';
            message.warning('登录过期，请重新登录');
          }, 100);
          return response;

        default:
          message.error({
            content: JSON.stringify(data || msg) || '请求错误',
          });
          return response;
      }
    }
  },
  (error) => {
    // 如果是被取消的请求，打印错误信息并返回空Promise对象，避免进入catch逻辑
    if (axios.isCancel(error)) {
      return new Promise(() => {
        console.log('Request canceled: ', error);
      });
    }
    if (error?.config?.headers?.loading) {
      hideLoading();
    }
    return Promise.reject(error);
  },
);

// 定义通用的请求方法，并使用泛型限制返回值类型
export default function request<T>(
  arg: RequestParams,
): Promise<ResponseData<T>> {
  return new Promise((resolve, reject) => {
    const {
      url,
      method,
      params,
      loading = false,
      debounce = true,
      stringify = false,
    } = arg;

    const data = stringify
      ? QS.stringify(arg.data as Record<string, unknown>)
      : arg.data;
    service({
      url,
      method,
      data,
      params,
      headers: { loading, debounce },
    })
      .then((res) => {
        resolve(res?.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { request };

export function useRequest<T>(request: () => Promise<ResponseData<T>>) {
  const [result, setData] = useState<ResponseData<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await request();
      setData(response);
    } catch (e) {
      setError((e as Record<string, string>).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    fetchData();
    return () => abortController.abort();
  }, []);

  return [result, loading, error, fetchData];
}
