import { useDrop } from 'react-dnd';
import getElement from '@elements/getElement';

const DropTarget = ({ positionKey, element }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'element',
    drop: () => ({ position: positionKey }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  const backgroundColor = isActive ? '#90ee908c' : 'black';

  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '100%',
        transition: 'all 0.4s ease',
        backgroundColor: backgroundColor,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {element ? getElement(element) : null}
    </div>
  );
};

export default DropTarget;
