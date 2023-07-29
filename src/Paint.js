import React, { useState, useRef } from 'react';

export default function Paint() {
  const circleSize = 30; // Define the size of the circle (width and height)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lines, setLines] = useState([]); // Hold all the lines
  const [currentLine, setCurrentLine] = useState([]); // Hold points of the current line
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('red'); // Default color is red
  const [selectedShape, setSelectedShape] = useState('circle'); // Default shape is circle

  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - containerRect.left - circleSize / 2;
      const y = e.clientY - containerRect.top - circleSize / 2;
      setPosition({ x, y });
      setCurrentLine((prevLine) => [...prevLine, { x, y }]);
    }
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    setCurrentLine([]);
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
    if (currentLine.length > 1) {
      setLines((prevLines) => [...prevLines, { points: currentLine, color: selectedColor, shape: selectedShape }]);
    }
  };

  const handleMouseLeave = (e) => {
    setIsDrawing(false);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleShapeChange = (e) => {
    setSelectedShape(e.target.value);
  };

  const handleReset = () => {
    setLines([]);
  };

  const renderShape = (shape, x, y) => {
    switch (shape) {
      case 'circle':
        return (
          <div
            style={{
              position: 'absolute',
              backgroundColor: selectedColor,
              borderRadius: '50%',
              transform: `translate(${x}px, ${y}px)`,
              width: `${circleSize}px`,
              height: `${circleSize}px`,
            }}
          ></div>
        );
      case 'square':
        return (
          <div
            style={{
              position: 'absolute',
              backgroundColor: selectedColor,
              transform: `translate(${x - circleSize / 2}px, ${y - circleSize / 2}px)`,
              width: `${circleSize}px`,
              height: `${circleSize}px`,
            }}
          ></div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '70%',
          height: '70vh',
          margin: 'auto',
          marginTop: '100px',
          border: '10px solid deepskyblue',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {lines.map((line, lineIndex) => (
            <g key={lineIndex}>
              {line.points.map((point, index) =>
                index > 0 ? (
                  <line
                    key={index}
                    x1={line.points[index - 1].x + circleSize / 2}
                    y1={line.points[index - 1].y + circleSize / 2}
                    x2={point.x + circleSize / 2}
                    y2={point.y + circleSize / 2}
                    style={{ stroke: line.color, strokeWidth: 6 }}
                  />
                ) : null
              )}
            </g>
          ))}
          {/* Render the temporary line */}
          {isDrawing && currentLine.length > 1 && (
            <line
              x1={currentLine[currentLine.length - 2].x + circleSize / 2}
              y1={currentLine[currentLine.length - 2].y + circleSize / 2}
              x2={currentLine[currentLine.length - 1].x + circleSize / 2}
              y2={currentLine[currentLine.length - 1].y + circleSize / 2}
              style={{ stroke: selectedColor, strokeWidth: 6 }}
            />
          )}
        </svg>

        {renderShape(selectedShape, position.x, position.y)}
      </div>

      {/* Color picker */}
      <input type="color" value={selectedColor} onChange={handleColorChange} style={{ marginTop: '10px' }} />

      {/* Shape selector */}
      <select value={selectedShape} onChange={handleShapeChange} style={{ marginTop: '10px' }}>
        <option value="circle">Circle</option>
        <option value="square">Square</option>
      </select>

      {/* Reset button */}
      <button onClick={handleReset} style={{ marginTop: '10px' }}>
        Reset
      </button>
    </div>
  );
}
