// tick length
const TICK_LENGTH = 6;

export const AxisLeft = ({ yScale, pixelsPerTick, xPos }) => {
  const range = yScale.range();

  const width = Math.abs(range[1] - range[0]);
  const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

  return (
    <>
      {/* Main horizontal line */}
      <line
        x1={xPos}
        y1={range[0]}
        x2={xPos}
        y2={range[1]}
        stroke="currentColor"
        fill="none"
      />

      {/* Ticks and labels */}
      {yScale.ticks(numberOfTicksTarget).map((value) => (
        <g key={value} transform={`translate(${xPos}, ${yScale(value)})`}>
          <line x1={-TICK_LENGTH} x2={0} stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'end',
              transform: 'translateX(-10px)',
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};