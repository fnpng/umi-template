import { message } from 'antd';

export const downloadFile = (response: BlobPart, fileName: string) => {
  if (response) {
    try {
      const blob = new Blob([response], { type: '' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      message.error('下载出错');
    }
  } else {
    message.error('下载失败');
  }
};

export default downloadFile;
