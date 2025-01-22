import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Radio,
  Select,
  TimePicker,
} from 'antd';
import { BaseBoxShapeUtil, TLBaseShape } from 'tldraw';
import 'tldraw/tldraw.css';

export type InputShape = TLBaseShape<
  'input',
  {
    w: number;
    h: number;
    placeholder?: string;
    text?: string;
    value?: string;
    onChange?: (e: string) => void;
  }
>;

export default class InputShapeUtil extends BaseBoxShapeUtil<InputShape> {
  static override type = 'input';

  override canScroll(): boolean {
    return true;
  }

  override canEdit(): boolean {
    return true;
  }

  override getDefaultProps() {
    return {
      w: 200,
      h: 48,
      placeholder: '请输入',
      text: '确定',
    };
  }

  override component(shape: InputShape) {
    const isEditing = this.editor.getEditingShapeId() === shape.id;
    const antdComponent = () => {
      switch (shape.meta.type) {
        case 'input':
          return <Input placeholder={shape.props.placeholder} />;
        case 'button':
          return <Button>{shape.props.text}</Button>;
        case 'checkbox':
          return <Checkbox />;
        case 'radio':
          return <Radio />;
        case 'select':
          return (
            <Select
              style={{ width: shape.props.w }}
              placeholder={shape.props.placeholder}
            />
          );
        case 'date-picker':
          return <DatePicker />;
        case 'time-picker':
          return <TimePicker />;
        default:
          return <Input placeholder={shape.props.placeholder} />;
      }
    };

    return (
      <div
        style={{
          width: shape.props.w,
          height: shape.props.h,
          pointerEvents: isEditing ? 'all' : undefined,
          overflow: 'auto',
        }}
      >
        {antdComponent()}
      </div>
    );
  }

  override indicator(shape: InputShape) {
    return <rect width={shape.props.w} height={shape.props.h} rx={8} ry={8} />;
  }
}
