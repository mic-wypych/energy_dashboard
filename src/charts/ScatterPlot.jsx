import {AxisLeft} from '../components/LeftAxis.jsx'
import {AxisBottom} from '../components/BottomAxis.jsx'
import {useDimensions} from '../components/UseDimensions.jsx'
import {useRef} from 'react'


export const ScatterPlot = ({boundsWidth, boundsHeight, circles, xScale, yScale, MARGIN}) => {
  const chartRef = useRef(null);
  const chartSize = useDimensions(chartRef);

  const height = chartSize.width;

  return (
    <div ref={chartRef} style={{ width: "100%" }}>
      <BaseScatterPlot
        width={chartSize.width}
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



const BaseScatterPlot = ({width, height, boundsWidth, boundsHeight, circles, xScale, yScale, MARGIN}) => {

    return <svg width = {width} height = {height}>
            <rect width = {width} height = {height} fill = "#FFFFFF" rx = {4}/>
            <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
            {circles}
            <AxisBottom xScale={xScale} pixelsPerTick={60} yPos={boundsHeight}/>
            <AxisLeft yScale={yScale} pixelsPerTick={60} xPos={-10}/>
            </g>
        </svg>
}
