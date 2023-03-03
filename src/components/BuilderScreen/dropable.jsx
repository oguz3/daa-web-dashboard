import { useDrop } from 'react-dnd';
import DraggableComponent from './draggable';

export const DropTarget = ({ positionKey, elementName }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'element',
    drop: () => ({ position: positionKey }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  const backgroundColor = isActive ? 'lightgreen' : 'white';

  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '100%',
        transition: 'all 0.4s ease',
        backgroundColor: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {elementName ? <>{elementName}</> : null}
    </div>
  );
};
