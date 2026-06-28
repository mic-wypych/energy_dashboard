
// AxisBottom.jsx

// tick length
const TICK_LENGTH = 6;

export const AxisBottom = ({ xScale, pixelsPerTick, yPos }) => {
  const range = xScale.range();

  const width = range[1] - range[0];
  const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

  return (
    <>
      {/* Main horizontal line */}
      <line
        x1={range[0]}
        y1={yPos}
        x2={range[1]}
        y2={yPos}
        stroke="currentColor"
        fill="none"
      />

      {/* Ticks and labels */}
      {xScale.ticks(numberOfTicksTarget).map((value) => (
        <g key={value} transform={`translate(${xScale(value)}, ${yPos})`}>
          <line y2={TICK_LENGTH} stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px)',
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};