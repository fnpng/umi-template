import { UploadOne } from '@icon-park/react';
import { Upload } from 'antd';

export default function CustomUpload({
  title = '上传图片',
  subText = '支持点击或拖拽上传, 支持扩展名：.jpg .png',
}) {
  return (
    <Upload.Dragger
      listType="picture-card"
      showUploadList={false}
      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
    >
      <div className="space_center flex-col text-sm gap-1 text-gray-400">
        <UploadOne size={32} strokeWidth={3} />
        <span className="text-base">{title}</span>
        <span>{subText}</span>
      </div>
    </Upload.Dragger>
  );
}
