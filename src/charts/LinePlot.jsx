import {useRef} from 'react'
import {line} from 'd3'
import {AxisLeft} from '../components/LeftAxis.jsx'
import {AxisBottom} from '../components/BottomAxis.jsx'
import {useDimensions} from '../components/UseDimensions.jsx'
import {scaleX} from '../components/scaleX.jsx'
import {scaleY} from '../components/scaleY.jsx'

export const LinePlot = ({data, MARGIN, hoveredIndex, setHoveredIndex}) => {
  const chartRef = useRef(null);
  const {width} = useDimensions(chartRef);
  const height = width;

  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = scaleX(data.map(d => d.x), 0, boundsWidth);
  const yScale = scaleY([0, ...data.map(d => d.y)], 0, boundsHeight);

  const linePath = line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    ([...data].sort((a, b) => a.x - b.x));

  const highlightCircle = hoveredIndex !== null ? (
    <circle
      cx={xScale(data[hoveredIndex].x)}
      cy={yScale(data[hoveredIndex].y)}
      r={6}
      fill="#21eebeff"
      pointerEvents="none"
    />
  ) : null;

  const hoverTargets = data.map((d, i) => (
    <circle
      key={i}
      cx={xScale(d.x)}
      cy={yScale(d.y)}
      r={20}
      fill="transparent"
      style={{cursor: 'pointer'}}
      onMouseEnter={() => setHoveredIndex(i)}
      onMouseLeave={() => setHoveredIndex(null)}
    />
  ));

  return (
    <div ref={chartRef} style={{width: "100%"}}>
      <BaseLinePlot
        width={width}
        height={height}
        boundsHeight={boundsHeight}
        linePath={linePath}
        pathOpacity={hoveredIndex === null ? 1 : 0.2}
        highlightCircle={highlightCircle}
        hoverTargets={hoverTargets}
        xScale={xScale}
        yScale={yScale}
        MARGIN={MARGIN}
      />
    </div>
  );
};

const BaseLinePlot = ({width, height, boundsHeight, linePath, pathOpacity, highlightCircle, hoverTargets, xScale, yScale, MARGIN}) => (
  <svg width={width} height={height}>
    <rect width={width} height={height} fill="#FFFFFF" rx={4} />
    <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
      <path d={linePath} fill="none" stroke="#21eebeff" strokeWidth={2} opacity={pathOpacity} style={{transition: 'opacity 0.2s'}} />
      {highlightCircle}
      {hoverTargets}
      <AxisBottom xScale={xScale} pixelsPerTick={60} yPos={boundsHeight} />
      <AxisLeft yScale={yScale} pixelsPerTick={60} xPos={-10} />
    </g>
  </svg>
);
