import {
  AlignTextCenter,
  AlignTextCenterOne,
  AlignTextLeft,
  AlignTextRight,
  AutoWidth,
  FlipHorizontally,
  FlipVertically,
  HamburgerButton,
  MaskTwo,
  PreviewClose,
  PreviewOpen,
  RotationOne,
  VerticallyCentered,
} from '@icon-park/react';
import {
  Button,
  ColorPicker,
  Divider,
  Input,
  InputNumber,
  Segmented,
  Select,
  Space,
} from 'antd';
import { Color } from 'antd/es/color-picker';
import { useEffect, useState } from 'react';
import { TLBaseShape, TLShape, TLShapeId, useEditor, useValue } from 'tldraw';

export default function LeftPanel() {
  const editor = useEditor();

  const selectedShapes = useValue(
    'selectedShapes',
    () => editor.getSelectedShapes(),
    [editor],
  );

  const selectedShapeIds = useValue(
    'selectedShapeIds',
    () => {
      return editor.getSelectedShapeIds();
    },
    [editor],
  );

  useEffect(() => {
    console.log(selectedShapes);
  }, [selectedShapeIds]);

  const getShapeValue = (
    key: keyof TLBaseShape<'shape', TLShapeId>,
    attr = '',
  ) => {
    if (selectedShapes.length === 0) return '';
    if (key === 'props') {
      const val = (selectedShapes?.[0].props as Record<string, unknown>)?.[
        attr
      ];
      const isEqual = selectedShapes.every(
        (item) => (item.props as Record<string, unknown>)?.[attr] === val,
      );
      if (typeof val === 'number') {
        return isEqual ? val?.toFixed(2) : '多值';
      }
      if (typeof val === 'string') {
        return isEqual ? val : '多值';
      }
    } else {
      const firstValue = selectedShapes[0][key];
      const isEqual = selectedShapes.every((item) => item[key] === firstValue);
      if (typeof firstValue === 'number') {
        return isEqual ? firstValue?.toFixed(2) : '多值';
      }
      if (typeof firstValue === 'string') {
        return isEqual ? firstValue : '多值';
      }
      // if (typeof firstValue === 'boolean') {
      //   return isEqual ? firstValue : false;
      // }
    }
  };

  const updateShapes = (shape: Partial<TLShape>) => {
    editor.updateShapes(
      selectedShapes?.map((item) => ({
        ...item,
        ...shape,
        props: {
          ...item?.props,
          ...shape.props,
        },
        meta: {
          ...item?.meta,
          ...shape.meta,
        },
      })) as TLShape[],
    );
  };

  const [open, setOpen] = useState(false);

  const defaultProps = (
    key: keyof TLBaseShape<'shape', TLShapeId>,
    attr = '',
    prefix?: string | JSX.Element,
    suffix?: string | JSX.Element,
  ) => {
    return {
      prefix: <div className="w-5 flex_center">{prefix}</div>,
      suffix,
      className: 'w-full',
      controls: false,
      value: getShapeValue(key, attr),
      onChange: (value: unknown) =>
        ['props', 'meta']?.includes(key)
          ? updateShapes({ [key]: { [attr]: Number(value) } })
          : updateShapes({ [key]: Number(value) }),
    };
  };

  const changeBgColor = (value: Color) => {
    console.log(value.toHexString());
    const element = document.querySelector('.tl-frame__body') as HTMLElement;
    element?.style.setProperty('fill', value.toHexString() as string);
  };

  return (
    <div className="p-3">
      <Segmented
        block
        options={[
          { value: 'List', label: '设计' },
          { value: 'Kanban', label: '数据' },
        ]}
      />
      {selectedShapes?.length === 0 && (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-2 hover:bg-slate-200 -mx-3 px-3 py-1">
            <div>背景色</div>
            <Space.Compact className="col-span-2">
              <ColorPicker
                defaultValue="63b3b0"
                placement="leftTop"
                allowClear
                mode={['single', 'gradient']}
                onChangeComplete={(value) => {
                  changeBgColor(value);
                }}
                panelRender={(panel) => (
                  <div className="custom-panel">{panel}</div>
                )}
              />
              <Input size="small" defaultValue="63b3b0" />
              <Input size="small" defaultValue="100%" />
              <Button className="p-2" type="default">
                {selectedShapes?.[0]?.meta.hidden ? (
                  <PreviewClose />
                ) : (
                  <PreviewOpen />
                )}
              </Button>
            </Space.Compact>
          </div>
          <Divider className="my-2" />
        </div>
      )}
      {selectedShapes?.length > 0 && (
        <div className="space-y-3 py-3 whitespace-pre-wrap">
          <div className="grid grid-cols-2 gap-2">
            <InputNumber {...defaultProps('x', '', 'X')} />
            <InputNumber {...defaultProps('y', '', 'Y')} />
            <InputNumber {...defaultProps('props', 'w', 'W')} />
            <InputNumber {...defaultProps('props', 'h', 'H')} />
            <InputNumber
              formatter={(value) => `${value}°`}
              parser={(value) => value?.replace('°', '') as unknown as string}
              {...defaultProps('rotation', '', <RotationOne />)}
            />
            <div className="grid grid-cols-2 gap-2">
              <Button type="default">
                <FlipHorizontally size={18} />
              </Button>
              <Button type="default">
                <FlipVertically size={18} />
              </Button>
            </div>
          </div>
          <Divider />
          <div>
            <div className="mb-2">图层</div>
            <Space.Compact className="w-full">
              <InputNumber
                formatter={(value) => `${Number(value) * 100}%`}
                parser={(value) => {
                  const num = Number(value?.replace('%', ''));
                  return (num > 100
                    ? 1
                    : num < 0
                    ? 0
                    : num / 100) as unknown as string;
                }}
                {...defaultProps('opacity', '', <MaskTwo />)}
              />
              <Button
                type="default"
                className="px-2"
                onClick={(ev) => {
                  selectedShapes?.forEach((shape) =>
                    editor.updateShape({
                      ...shape,
                      meta: { hidden: !shape.meta.hidden },
                    }),
                  );
                  ev.stopPropagation();
                }}
              >
                {selectedShapes?.[0]?.meta.hidden ? (
                  <PreviewClose />
                ) : (
                  <PreviewOpen />
                )}
              </Button>
            </Space.Compact>
          </div>
          <Divider />
          <div>
            <div className="mb-2">文字</div>
            <div className="grid grid-cols-2 gap-2">
              {/* <Popover
                content={
                  <div className="w-[180px] space_between">
                    <div>字体</div>
                    <div onClick={() => setOpen(false)}>x</div>
                  </div>
                }
                trigger="click"
                placement="leftTop"
                open={open}
                onOpenChange={(val) => setOpen(val)}
              >
                <Button
                  color="default"
                  variant="filled"
                  autoInsertSpace={false}
                  className="col-span-2"
                >
                  <div className="w-full text-left">字体</div>
                </Button>
              </Popover> */}
              <Select
                className="col-span-2"
                defaultValue="思源黑体"
                options={['思源黑体', '字由文艺黑', 'PingFang']?.map(
                  (item) => ({
                    label: item,
                    value: item,
                  }),
                )}
              />
              <Select
                defaultValue="Bold"
                options={['Light', 'Normal', 'Regular', 'Medium', 'Bold']?.map(
                  (item) => ({
                    label: item,
                    value: item,
                  }),
                )}
              />
              <Select
                defaultValue="16"
                showSearch
                options={[12, 16, 20, 24, 32, 48]?.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
              <Segmented
                options={[
                  {
                    value: 'List',
                    icon: <AlignTextLeft />,
                  },
                  {
                    value: 'Kanban',
                    icon: <AlignTextCenter />,
                  },
                  {
                    value: 'Kanba1n',
                    icon: <AlignTextRight />,
                  },
                ]}
              />
              <Segmented
                options={[
                  {
                    value: 'List',
                    icon: <AutoWidth />,
                  },
                  {
                    value: 'Kanban',
                    icon: <VerticallyCentered />,
                  },
                  {
                    value: 'Kanba1n',
                    icon: <AlignTextCenterOne />,
                  },
                ]}
              />
            </div>
          </div>
          <Divider />
          <div>
            <div className="mb-2">填充</div>
            <div className="grid grid-cols-12 gap-2 hover:bg-slate-200 -mx-3 px-3 py-1">
              <Space.Compact className="col-span-10 ">
                <ColorPicker
                  defaultValue="63b3b0"
                  placement="leftTop"
                  allowClear
                  mode={['single', 'gradient']}
                  onChangeComplete={(value) => {
                    console.log(value.toHex());
                    updateShapes({ props: { color: 'red' } });
                  }}
                />
                <Input size="small" defaultValue="63b3b0" />
                <Input size="small" defaultValue="100%" />
                <Button className="p-2" type="default">
                  {selectedShapes?.[0]?.meta.hidden ? (
                    <PreviewClose />
                  ) : (
                    <PreviewOpen />
                  )}
                </Button>
              </Space.Compact>
              <Button type="default">
                <HamburgerButton />
              </Button>
            </div>
          </div>
          <Divider />
          <div>
            <div className="mb-2">描边</div>
            <div className="grid grid-cols-12 gap-2 hover:bg-slate-200 -mx-3 px-3 py-1">
              <Space.Compact className="col-span-10">
                <ColorPicker defaultValue="63b3b0" placement="leftTop" />
                <Input size="small" defaultValue="63b3b0" />
                <Input size="small" defaultValue="100%" />
                <Button className="p-2" type="default">
                  {selectedShapes?.[0]?.meta.hidden ? (
                    <PreviewClose />
                  ) : (
                    <PreviewOpen />
                  )}
                </Button>
              </Space.Compact>
              <Button type="default">
                <HamburgerButton />
              </Button>
            </div>
          </div>
          {/* color fill geo dash font size */}
        </div>
      )}
    </div>
  );
}
