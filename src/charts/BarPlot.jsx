import {AxisBand} from '../components/BandAxis.jsx'
import {AxisLeft} from '../components/LeftAxis.jsx'
import {useDimensions} from '../components/UseDimensions.jsx'
import {useRef} from 'react'

export const BarPlot = ({boundsWidth, boundsHeight, bars, bandScale, yScale, MARGIN}) => {
  const chartRef = useRef(null);
  const chartSize = useDimensions(chartRef);

  const height = chartSize.width;

  return (
    <div ref={chartRef} style={{ width: "100%" }}>
      <BaseBarPlot
        width={chartSize.width}
        height={height}
        boundsWidth={boundsWidth}
        boundsHeight={boundsHeight}
        bars={bars}
        bandScale={bandScale}
        yScale={yScale}
        MARGIN={MARGIN}
      />
    </div>
  );
};

const BaseBarPlot = ({width, height, boundsWidth, boundsHeight, bars, bandScale, yScale, MARGIN}) => {

    return <svg width = {width} height = {height}>
          <rect width = {width} height = {height} fill = "#FFFFFF" rx = {4}/>
          <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          {bars}
          <AxisLeft yScale={yScale} pixelsPerTick={60} xPos={-10}/>
          <AxisBand bandScale={bandScale} yPos={boundsHeight} />
           </g>
        </svg>
}