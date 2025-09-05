import { Upload } from 'antd';
import { RiUploadCloudLine } from 'react-icons/ri';

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
        <RiUploadCloudLine size={32} />
        <span className="text-base">{title}</span>
        <span>{subText}</span>
      </div>
    </Upload.Dragger>
  );
}
