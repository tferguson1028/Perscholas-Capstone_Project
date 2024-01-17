import React from 'react';

function GameControls(props)
{
  const { setRoom } = props;

  return (
    <div>
      <button>Call</button>
      <button>Check</button>
      <button>Raise</button>
      <button>Fold</button>
      <button onClick={() => { setRoom(null); }}>Leave</button>
    </div>
  );
}

export default GameControls;
