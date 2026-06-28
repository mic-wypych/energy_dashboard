import {useRef} from 'react'
import {AxisLeft} from '../components/LeftAxis.jsx'
import {AxisBottom} from '../components/BottomAxis.jsx'
import {useDimensions} from '../components/UseDimensions.jsx'
import {scaleX} from '../components/scaleX.jsx'
import {scaleY} from '../components/scaleY.jsx'

export const ScatterPlot = ({data, MARGIN}) => {
  const chartRef = useRef(null);
  const {width} = useDimensions(chartRef);
  const height = width;

  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = scaleX(data.map(d => d.x), 0, boundsWidth);
  const yScale = scaleY([0, ...data.map(d => d.y)], 0, boundsHeight);

  const circles = data.map((d, i) => (
    <circle key={i} cx={xScale(d.x)} cy={yScale(d.y)} r={6} fill="#21eebeff" />
  ));

  return (
    <div ref={chartRef} style={{width: "100%"}}>
      <BaseScatterPlot
        width={width}
        height={height}
        boundsWidth={boundsWidth}
        boundsHeight={boundsHeight}
        circles={circles}
        xScale={xScale}
        yScale={yScale}
        MARGIN={MARGIN}
      />
    </div>
  );
};

const BaseScatterPlot = ({width, height, boundsHeight, circles, xScale, yScale, MARGIN}) => (
  <svg width={width} height={height}>
    <rect width={width} height={height} fill="#FFFFFF" rx={4} />
    <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
      {circles}
      <AxisBottom xScale={xScale} pixelsPerTick={60} yPos={boundsHeight} />
      <AxisLeft yScale={yScale} pixelsPerTick={60} xPos={-10} />
    </g>
  </svg>
);
