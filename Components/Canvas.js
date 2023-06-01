import React, { useRef, useEffect } from 'react';

function Canvas({ width, height }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Add some code here to draw on the canvas using the context object

  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
}

export default Canvas;
