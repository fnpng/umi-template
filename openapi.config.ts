const { generateService } = require('@umijs/openapi');

// 注意：ng 为微服务API前缀，根据swagger前缀自动生成API文件，如果api下目录已存在，会覆盖原有文件

const microservices = [
  {
    ng: 'auth',
    schemaPath: 'http://192.168.1.101:8090/auth/v3/api-docs/public',
    namespace: null,
  },
];

microservices.forEach((item) => {
  generateService({
    apiPrefix: 'ng', // api 的前缀
    requestLibPath: `import { request } from '@umijs/max'; const ng = '/${item.ng}';`, // 自定义请求方法路径
    schemaPath: `${item.schemaPath}`, // Swagger 2.0 或 OpenAPI 3.0 的地址
    serversPath: './src/api', // 生成的文件夹的路径
    projectName: `${item.ng}`, // 项目名称
    namespace: `${item?.namespace || `${item.ng.toUpperCase()}`}`, // TS 命名空间
  });
});
