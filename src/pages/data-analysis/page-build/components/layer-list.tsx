import { capitalize } from '@/utils/capitalize';
import { Lock, PreviewClose, PreviewOpen, Unlock } from '@icon-park/react';
import { Input, theme } from 'antd';
import { useState } from 'react';
import { Editor, TLShapeId, useEditor, useValue } from 'tldraw';

function ShapeItem({
  shapeId,
  depth,
  parentIsSelected,
  parentIsHidden,
}: {
  shapeId: TLShapeId;
  depth: number;
  parentIsSelected?: boolean;
  parentIsHidden?: boolean;
}) {
  // const { editor } = useContext(editorContext);
  const editor = useEditor();

  const shape = useValue('shape', () => editor.getShape(shapeId), [editor]);
  const children = useValue(
    'children',
    () => editor.getSortedChildIdsForParent(shapeId),
    [editor],
  );
  const isHidden = useValue('isHidden', () => editor.isShapeHidden(shapeId), [
    editor,
  ]);
  const isSelected = useValue(
    'isSelected',
    () => editor.getSelectedShapeIds().includes(shapeId),
    [editor],
  );
  const shapeName = useValue('shapeName', () => getShapeName(editor, shapeId), [
    editor,
  ]);

  const [isEditingName, setIsEditingName] = useState(false);

  const { useToken } = theme;
  const { token } = useToken();

  const selectedBg = token.colorPrimaryHover || '#E8F4FE';
  const childSelectedBg = token.colorPrimaryBg || '#F3F9FE';
  const childBg = '#00000006';

  if (!shape) return null;

  return (
    <>
      {!!shape && (
        <div
          className="space_between rounded pr-1 h-8 hover:bg-gray-100 select-none"
          onDoubleClick={() => {
            setIsEditingName(true);
          }}
          onClick={() => {
            // We synchronize the selection state of the layer panel items with the selection state of the shapes in the editor.
            if (editor.inputs.ctrlKey || editor.inputs.shiftKey) {
              if (isSelected) {
                editor.deselect(shape);
              } else {
                editor.select(...editor.getSelectedShapes(), shape);
              }
            } else {
              editor.select(shape);
            }
          }}
          style={{
            paddingLeft: 10 + depth * 20,
            opacity: parentIsHidden || isHidden ? 0.5 : 1,
            background: isSelected
              ? selectedBg
              : parentIsSelected
              ? childSelectedBg
              : depth > 0
              ? childBg
              : undefined,
          }}
        >
          {isEditingName ? (
            <Input
              autoFocus
              size="small"
              defaultValue={shapeName}
              onBlur={() => setIsEditingName(false)}
              onChange={(ev) => {
                if (shape.type === 'frame') {
                  editor.updateShape({
                    ...shape,
                    props: { name: ev.target.value },
                  });
                } else {
                  editor.updateShape({
                    ...shape,
                    meta: { name: ev.target.value },
                  });
                }
              }}
              onKeyDown={(ev) => {
                // finish editing on enter
                if (ev.key === 'Enter' || ev.key === 'Escape') {
                  ev.currentTarget.blur();
                }
              }}
            />
          ) : (
            <div className="shape-name">{shapeName}</div>
          )}
          <div className="flex gap-1">
            <div
              className="p-1 py-0.5 rounded cursor-pointer"
              onClick={(ev) => {
                editor.updateShape({
                  ...shape,
                  isLocked: !shape.isLocked,
                });
                ev.stopPropagation();
              }}
            >
              {shape.isLocked ? <Lock /> : <Unlock />}
            </div>
            <div
              className="p-1 py-0.5 rounded cursor-pointer"
              onClick={(ev) => {
                editor.updateShape({
                  ...shape,
                  meta: { hidden: !shape.meta.hidden },
                });
                ev.stopPropagation();
              }}
            >
              {shape.meta.hidden ? <PreviewClose /> : <PreviewOpen />}
            </div>
          </div>
        </div>
      )}
      {!!children?.length && (
        <ShapeList
          shapeIds={children}
          depth={depth + 1}
          parentIsHidden={parentIsHidden || isHidden}
          parentIsSelected={parentIsSelected || isSelected}
        />
      )}
    </>
  );
}

export default function ShapeList({
  shapeIds,
  depth,
  parentIsSelected,
  parentIsHidden,
}: {
  shapeIds: TLShapeId[];
  depth: number;
  parentIsSelected?: boolean;
  parentIsHidden?: boolean;
}) {
  if (!shapeIds.length) return null;
  return (
    <div>
      {shapeIds.map((shapeId) => (
        <ShapeItem
          key={shapeId}
          shapeId={shapeId}
          depth={depth}
          parentIsHidden={parentIsHidden}
          parentIsSelected={parentIsSelected}
        />
      ))}
    </div>
  );
}

function getShapeName(editor: Editor, shapeId: TLShapeId) {
  const shape = editor.getShape(shapeId);
  if (!shape) return 'Unknown shape';
  return (
    // meta.name is the first choice, then the shape's text, then the capitalized shape type
    (shape.meta.name as string) ||
    editor.getShapeUtil(shape).getText(shape) ||
    capitalize(shape.type)
  );
}
