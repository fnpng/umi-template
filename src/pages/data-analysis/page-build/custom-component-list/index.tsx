import { Editor } from 'tldraw';

export default function ComponentList() {
  const list = [
    { label: '表格', value: 'table', icon: 'Table' },
    { label: '输入框', value: 'input', icon: 'Input' },
    { label: '多选框', value: 'checkbox', icon: 'Checkbox' },
    { label: '单选框', value: 'radio', icon: 'Radio' },
    { label: '按钮', value: 'button', icon: 'Button' },
    { label: '下拉框', value: 'select', icon: 'Select' },
    { label: '日期选择', value: 'date-picker', icon: 'DatePicker' },
    { label: '时间选择', value: 'time-picker', icon: 'TimePicker' },

    { label: '表单', value: 'form', icon: 'Form' },
    { label: '折叠面板', value: 'collapse', icon: 'Collapse' },
    { label: '标签页', value: 'tabs', icon: 'Tabs' },
    { label: '模态框', value: 'modal', icon: 'Modal' },
    { label: '面包屑', value: 'breadcrumb', icon: 'Breadcrumb' },
    { label: '卡片', value: 'card', icon: 'Card' },
    { label: '描述列表', value: 'descriptions', icon: 'Descriptions' },
    // { label: '空状态', value: 'empty', icon: 'Empty' },
    { label: '头像', value: 'avatar', icon: 'Avatar' },

    { label: '柱状图', value: 'bar-chart', icon: 'BarChart' },
    { label: '饼图', value: 'pie-chart', icon: 'PieChart' },
    { label: '折线图', value: 'line-chart', icon: 'LineChart' },
    { label: '混合图', value: 'more-chart', icon: 'MoreChart' },
  ];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: any) => {
    e.dataTransfer.setData('component', item.value);
  };

  return (
    <div className="grid grid-cols-2 gap-2 py-3">
      {list?.map((item) => (
        <div
          key={item.icon}
          draggable
          onDragStart={(ev) => handleDragStart(ev, item)}
          className="flex_center text-[13px] gap-1 border border-solid border-slate-200 p-1 px-2 rounded cursor-pointer hover:bg-slate-100"
        >
          <img
            src={require(`@/assets/page-build/${item.icon}.svg`)}
            className="w-4 h-4"
            alt=""
          />
          {item.label}
        </div>
      ))}
    </div>
  );
}

export function onDrag(editor: Editor, ev: DragEvent, type: string) {
  const pointer = editor.screenToPage({ x: ev.x, y: ev.y });
  if (
    [
      'table',
      'input',
      'checkbox',
      'radio',
      'button',
      'select',
      'date-picker',
      'time-picker',
      'bar-chart',
      'pie-chart',
      'line-chart',
      'more-chart',
    ]?.includes(type)
  ) {
    editor?.createShape({
      type: type?.includes('chart')
        ? 'chart'
        : [
            'input',
            'checkbox',
            'radio',
            'button',
            'select',
            'date-picker',
            'time-picker',
          ].includes(type)
        ? 'input'
        : type,
      x: pointer.x,
      y: pointer.y,
      props: {
        w: 400,
        h: 300,
      },
      meta: { type },
    });
  }
}
