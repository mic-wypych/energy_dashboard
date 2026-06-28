import {AxisBand} from '../components/BandAxis.jsx'
import {AxisLeft} from '../components/LeftAxis.jsx'


export function BarPlot({width, height, boundsWidth, boundsHeight, bars, bandScale, yScale, MARGIN}) {

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