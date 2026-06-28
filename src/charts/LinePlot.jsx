import {AxisLeft} from '../components/LeftAxis.jsx'
import {AxisBottom} from '../components/BottomAxis.jsx'
import {useDimensions} from '../components/UseDimensions.jsx'
import {useRef} from 'react'

export const LinePlot = ({boundsWidth, boundsHeight, linePath, xScale, yScale, MARGIN}) => {
  const chartRef = useRef(null);
  const chartSize = useDimensions(chartRef);

  const height = chartSize.width;

  return (
    <div ref={chartRef} style={{ width: "100%" }}>
      <BaseLinePlot
        width={chartSize.width}
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

const BaseLinePlot = ({width, height, boundsWidth, boundsHeight, linePath, xScale, yScale, MARGIN}) => {

    return <svg width = {width} height = {height}>
          <rect width = {width} height = {height} fill = "#FFFFFF" rx = {4}/>
          <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          <path d={linePath} fill="none" stroke="#21eebeff" strokeWidth={2} />
          <AxisBottom xScale={xScale} pixelsPerTick={60} yPos={boundsHeight}/>
          <AxisLeft yScale={yScale} pixelsPerTick={60} xPos={-10}/>
          </g>
        </svg>
}
