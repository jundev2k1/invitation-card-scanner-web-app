import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  SOURCE_COLUMN: 'source_column',
};

type UseMappingItemProps = {
  type: 'source' | 'target';
  item: { id?: number; key: string | number; order?: number };
  isMapped: boolean;
  onMap?: (sourceOrder: number, targetId: number) => void;
};

export const useMappingItem = ({
  type,
  item,
  isMapped,
  onMap,
}: UseMappingItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.SOURCE_COLUMN,
      item: { order: item.order || 0, id: item.key, type },
      canDrag: type === 'source' && !isMapped,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [item, type, isMapped]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.SOURCE_COLUMN,
      drop: (draggedItem: { order: number }) => {
        if (type === 'target' && onMap) {
          onMap(draggedItem.order, item.id || 0);
        }
      },
    }),
    [onMap, item.key, type]
  );

  if (type === 'source' || type === 'target') {
    drag(drop(ref));
  }

  return { ref, isDragging };
};
