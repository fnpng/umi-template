import {
  Carousel,
  ChartPieOne,
  Components,
  GraphicDesignTwo,
  MoreTwo,
} from '@icon-park/react';
import { Input, Segmented, Splitter } from 'antd';
import { useEditor, useValue } from 'tldraw';
import LayerList from './components/layer-list';
import CustomComponentList from './custom-component-list';

export default function LeftPanel() {
  // const { editor } = useContext(editorContext);
  const editor = useEditor();

  const shapeIds = useValue(
    'shapeIds',
    () => editor.getSortedChildIdsForParent(editor.getCurrentPageId()),
    [editor],
  );

  const items = [
    { key: '1', label: '组件', icon: <Components /> },
    { key: '2', label: '图表', icon: <ChartPieOne /> },
    { key: '3', label: '素材', icon: <GraphicDesignTwo /> },
    { key: '4', label: 'Tab', icon: <Carousel className="rotate-180" /> },
    { key: '5', label: '其他', icon: <MoreTwo /> },
  ];

  return (
    <div className="p-3">
      <Segmented
        block
        options={[
          { value: 'List', label: '图层' },
          { value: 'Kanban', label: '资源' },
        ]}
      />

      <Splitter layout="vertical" className="h-[calc(100vh-110px)]">
        <Splitter.Panel>
          <div className="flex gap-1">
            {/* <div className="my-3 bg-slate-50 rounded">
              {items?.map((item) => (
                <div
                  key={item.label}
                  className="p-1.5 space_center flex-col rounded hover:bg-slate-200 cursor-pointer whitespace-nowrap"
                >
                  {item.icon}
                </div>
              ))}
            </div> */}
            <Segmented
              vertical
              className="mt-2"
              options={items?.map((item) => ({
                icon: item.icon,
                value: item.key,
              }))}
            />
            <CustomComponentList />
          </div>
        </Splitter.Panel>
        <Splitter.Panel min={'20%'}>
          <Input className="my-2" placeholder="搜索图层" />
          <LayerList shapeIds={shapeIds} depth={0} />
        </Splitter.Panel>
      </Splitter>
    </div>
  );
}
