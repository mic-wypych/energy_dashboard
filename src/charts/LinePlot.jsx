import {useRef} from 'react'
import {line} from 'd3'
import {AxisLeft} from '../components/LeftAxis.jsx'
import {AxisBottom} from '../components/BottomAxis.jsx'
import {useDimensions} from '../components/UseDimensions.jsx'
import {scaleX} from '../components/scaleX.jsx'
import {scaleY} from '../components/scaleY.jsx'

export const LinePlot = ({data, MARGIN}) => {
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

  return (
    <div ref={chartRef} style={{width: "100%"}}>
      <BaseLinePlot
        width={width}
        height={height}
        boundsWidth={boundsWidth}
        boundsHeight={boundsHeight}
        linePath={linePath}
        xScale={xScale}
        yScale={yScale}
        MARGIN={MARGIN}
      />
    </div>
  );
};

const BaseLinePlot = ({width, height, boundsHeight, linePath, xScale, yScale, MARGIN}) => (
  <svg width={width} height={height}>
    <rect width={width} height={height} fill="#FFFFFF" rx={4} />
    <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
      <path d={linePath} fill="none" stroke="#21eebeff" strokeWidth={2} />
      <AxisBottom xScale={xScale} pixelsPerTick={60} yPos={boundsHeight} />
      <AxisLeft yScale={yScale} pixelsPerTick={60} xPos={-10} />
    </g>
  </svg>
);
