import React, { useState } from 'react';

const SimpleFunctional = () => {
  const [counter, setCounter] = useState(0);

  const handleCounter = (type) => {
    setCounter(type === '+' ? counter + 1 : counter - 1);
  };

  return (
    <>
      <h3>ini adalah component functional</h3>
      <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
        <button
          type="button"
          disabled={counter<1}
          onClick={() => handleCounter('-')}
        >
          -
        </button>
        <div>{counter}</div>
        <button type="button" onClick={() => handleCounter('+')}>+</button>
      </div>
    </>
  );
}

export default SimpleFunctional;
