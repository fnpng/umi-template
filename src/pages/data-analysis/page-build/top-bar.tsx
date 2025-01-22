import {
  ArrowLeft,
  ArrowRight,
  Checkbox,
  FiveFive,
  FontSize,
  Minus,
  MoveOne,
  Pic,
  Round,
  Save,
  Square,
  Star,
  Triangle,
  Write,
} from '@icon-park/react';
import { useNavigate } from '@umijs/max';
import { Button, Dropdown } from 'antd';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import {
  DEFAULT_SUPPORTED_MEDIA_TYPE_LIST,
  GeoShapeGeoStyle,
  useEditor,
  useValue,
} from 'tldraw';
import { editorContext } from '.';

export default function TopBar() {
  // const { editor } = useContext(editorContext);
  const editor = useEditor();

  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(['star']);
  const navigate = useNavigate();

  const currentToolId = useValue(
    'currentToolId',
    () => editor?.getCurrentToolId(),
    [editor],
  );

  const iconProps = {
    size: 18,
  };

  const toolList = [
    { id: 'select', icon: <MoveOne {...iconProps} />, label: '选择' },
    { id: 'hand', icon: <FiveFive {...iconProps} />, label: '手抓' },
    { id: 'frame', icon: <Checkbox {...iconProps} />, label: '容器' },
    { id: 'draw', icon: <Write {...iconProps} />, label: '画笔' },
    { id: 'text', icon: <FontSize {...iconProps} />, label: '文字' },
  ];

  const insertMedia = useInsertMedia();

  const items = [
    {
      key: 'rectangle',
      icon: <Square {...iconProps} />,
      label: '矩形',
    },
    {
      key: 'ellipse',
      icon: <Round {...iconProps} />,
      label: '圆形',
    },
    {
      key: 'line',
      icon: <Minus {...iconProps} />,
      label: '直线',
    },
    {
      key: 'star',
      icon: <Star {...iconProps} />,
      label: '星形',
    },
    {
      key: 'triangle',
      icon: <Triangle {...iconProps} />,
      label: '三角',
    },
    {
      key: 'arrow',
      icon: <ArrowRight {...iconProps} />,
      label: '箭头',
    },
  ];

  const dropdownClick = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
    if (['line', 'arrow'].includes(key)) {
      editor.setCurrentTool(key);
    } else {
      editor.run(() => {
        editor.setStyleForNextShapes(GeoShapeGeoStyle, key);
        editor.setCurrentTool('geo');
      });
    }
  };

  return (
    <div className="flex justify-between items-center w-full h-full px-3">
      <div>
        <Button
          className="px-2"
          color="default"
          variant="filled"
          icon={<ArrowLeft />}
          onClick={() => navigate(-1)}
        >
          返回
        </Button>
      </div>
      <div className="flex gap-2">
        {toolList.map((tool) => (
          <Button
            key={tool.id}
            color="primary"
            variant={currentToolId === tool.id ? 'solid' : 'text'}
            data-isactive={currentToolId === tool.id}
            onClick={() => editor.setCurrentTool(tool.id)}
            icon={tool.icon}
          ></Button>
        ))}
        <Dropdown
          menu={{
            selectable: true,
            items,
            selectedKeys,
            onClick: dropdownClick,
          }}
          arrow
        >
          <Button
            color="primary"
            variant={currentToolId === 'geo' ? 'solid' : 'text'}
            // data-isactive={currentToolId === 'geo'}
            onClick={() => {
              dropdownClick({ key: selectedKeys?.[0] });
            }}
            icon={
              items?.find((item) => item?.key === selectedKeys?.[0])?.icon || (
                <Star {...iconProps} />
              )
            }
          ></Button>
        </Dropdown>
        <Button
          color="primary"
          variant="text"
          onClick={() => {
            insertMedia();
          }}
          icon={<Pic {...iconProps} />}
        ></Button>
      </div>
      <div>
        <Button className="px-2" type="primary" icon={<Save />}>
          保存
        </Button>
      </div>
    </div>
  );
}

export const MimeTypeContext = React.createContext<string[] | undefined>([]);

export function useInsertMedia() {
  const { editor } = useContext(editorContext);
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const input = window.document.createElement('input');
    input.type = 'file';
    input.accept = DEFAULT_SUPPORTED_MEDIA_TYPE_LIST;
    input.multiple = true;
    inputRef.current = input;
    async function onchange(e: Event) {
      const fileList = (e.target as HTMLInputElement).files;
      if (!fileList || fileList.length === 0) return;
      editor.markHistoryStoppingPoint('insert media');
      await editor.putExternalContent({
        type: 'files',
        files: Array.from(fileList),
        point: editor.getViewportPageBounds().center,
        ignoreParent: false,
      });
      input.value = '';
    }
    input.addEventListener('change', onchange);
    return () => {
      inputRef.current = undefined;
      input.removeEventListener('change', onchange);
    };
  }, [editor]);

  return useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);
}
