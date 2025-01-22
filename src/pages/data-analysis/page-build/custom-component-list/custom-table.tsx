import { Table } from 'antd';
import { BaseBoxShapeUtil, TLBaseShape } from 'tldraw';
import 'tldraw/tldraw.css';

export type TableShape = TLBaseShape<
  'table',
  { w: number; h: number; dataSource: any[]; columns: any[] }
>;

export default class TableShapeUtil extends BaseBoxShapeUtil<TableShape> {
  static override type = 'table';

  override canScroll(): boolean {
    return true;
  }

  override canEdit(): boolean {
    return true;
  }

  override getDefaultProps() {
    return {
      w: 300,
      h: 200,
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
        {
          key: '3',
          name: '11胡彦祖',
          age: 142,
          address: '111西湖区湖底公园1号',
        },
      ],
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ],
    };
  }

  override component(shape: TableShape) {
    const isEditing = this.editor.getEditingShapeId() === shape.id;

    return (
      <div
        style={{
          width: shape.props.w,
          height: shape.props.h,
          pointerEvents: isEditing ? 'all' : undefined,
          overflow: 'auto',
        }}
      >
        <Table
          dataSource={shape.props.dataSource}
          columns={shape.props.columns}
        />
      </div>
    );
  }

  override indicator(shape: TableShape) {
    return <rect width={shape.props.w} height={shape.props.h} rx={8} ry={8} />;
  }
}
