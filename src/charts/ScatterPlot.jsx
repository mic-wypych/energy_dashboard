import {AxisLeft} from '../components/LeftAxis.jsx'
import {AxisBottom} from '../components/BottomAxis.jsx'


export function ScatterPlot({width, height, boundsWidth, boundsHeight, circles, xScale, yScale, MARGIN}) {

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
