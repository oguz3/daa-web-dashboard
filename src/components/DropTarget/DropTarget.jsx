import { useDrop } from 'react-dnd';

import ElementBase from '@elements/ElementBase';

const disabledPosition = ['center-center', 'bottom-center'];

const DropTarget = ({ positionKey, element }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: !disabledPosition.includes(positionKey) ? 'element' : 'disabled',
    drop: () => ({ position: positionKey }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  const isDisabled = isOver && !canDrop;

  const backgroundColor = isActive
    ? '#90ee908c'
    : isDisabled
    ? '#8080808c'
    : 'black';

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
      {element ? <ElementBase item={element} /> : null}
    </div>
  );
};

export default DropTarget;
