const TICK_LENGTH = 6;

export const AxisBand = ({ bandScale, yPos }) => {
  const range = bandScale.range();

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
      {bandScale.domain().map((value) => (
        <g key={value} transform={`translate(${bandScale(value) + bandScale.bandwidth() / 2}, ${yPos})`}>
          <line y2={TICK_LENGTH} stroke="currentColor" />
          <text
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
