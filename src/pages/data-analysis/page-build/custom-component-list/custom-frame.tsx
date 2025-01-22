import { FrameShapeUtil, TLBaseShape, TLFrameShape } from 'tldraw';
import 'tldraw/tldraw.css';

export type TableShape = TLBaseShape<
  'cframe',
  { w: number; h: number; dataSource: any[]; columns: any[] }
>;

export default class TableShapeUtil extends FrameShapeUtil {
  override canScroll(): boolean {
    return true;
  }

  override canEdit(): boolean {
    return true;
  }

  override getDefaultProps() {
    return {
      name: 'frame',
      w: 300,
      h: 200,
    };
  }

  override component(shape: TLFrameShape) {
    const isEditing = this.editor.getEditingShapeId() === shape.id;

    return (
      <div
        style={{
          width: shape.props.w,
          height: shape.props.h,
          pointerEvents: isEditing ? 'all' : undefined,
          overflow: 'auto',
        }}
      ></div>
    );
  }

  override indicator(shape: TLFrameShape) {
    return <rect width={shape.props.w} height={shape.props.h} rx={8} ry={8} />;
  }
}
