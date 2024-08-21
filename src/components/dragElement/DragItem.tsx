import React, { ReactElement, memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { SourceReference } from '../../interfaces/Source';
import { ObjectId } from 'mongodb';
import { Production } from '../../interfaces/production';

interface IDrag {
  id: ObjectId;
  selectingText: boolean;
  onMoveItem: (currentId: string, nextId: string) => void;
  children: ReactElement;
  previousOrder: SourceReference[];
  currentOrder: SourceReference[];
  updateProduction: (updated: Production) => void;
  productionSetup: Production;
}

const DragItem: React.FC<IDrag> = memo(
  ({
    id,
    selectingText: selectingText,
    onMoveItem,
    children,
    previousOrder,
    currentOrder,
    updateProduction,
    productionSetup
  }) => {
    const ref = useRef(null);

    const [{ isDragging }, connectDrag] = useDrag({
      canDrag: !selectingText,
      type: 'Card',
      item: { id },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging()
        };
      }
    });

    const [, connectDrop] = useDrop({
      accept: 'Card',
      hover(hoveredOverItem: { id: ObjectId }) {
        if (hoveredOverItem.id !== id && id) {
          onMoveItem(hoveredOverItem.id.toString(), id.toString());
        }
      },
      drop() {
        const isSame = previousOrder.every(
          (item, index) => item._id === currentOrder[index]._id
        );
        if (!isSame) {
          console.log('ORDER CHANGED');
          const updatedProduction = {
            ...productionSetup,
            sources: currentOrder
          };
          updateProduction(updatedProduction);
        }
      }
    });

    connectDrag(ref);
    connectDrop(ref);

    const containerStyle = { opacity: isDragging ? 0 : 1 };

    return (
      <>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            forwardedRef: ref,
            style: containerStyle
          });
        })}
      </>
    );
  }
);

DragItem.displayName = 'DragItem';

export default DragItem;
