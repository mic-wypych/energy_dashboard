import { useState } from 'react'
import {scaleBand} from 'd3'
import './App.css'
import {scaleX} from './components/scaleX.jsx'
import {scaleY} from './components/scaleY.jsx'
import {AxisBottom} from './components/BottomAxis.jsx'
import {AxisLeft} from './components/LeftAxis.jsx'
import {AxisBand} from './components/BandAxis.jsx'

function App() {

  /* build constants*/
  const width = 400
  const height = 400
  const padding = 60

  const MARGIN = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40
  }

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  /* data */

  const data = [
    {x: 10, y: 30},
    {x: 0, y: 15},
    {x: 14, y: 36},
    {x: 7, y: 23}
  ]


  /* build scales*/

  const xScale = scaleX(data.map(d => d.x), 0, boundsWidth)
  const yScale = scaleY([0, ...data.map(d => d.y)], 0, boundsHeight)
  const bandScale = scaleBand()
  .domain(data.map(d => d.x))
  .range([0, boundsWidth])
  .padding(0.4)

  const allCircles = data.map((d, i) => (
        <circle
          key={i}
          cx={xScale(d.x)}  // data value → pixel position
          cy={yScale(d.y)}     // all circles on the same line
          r={6}
          fill="#21eebeff"
        />
      ))


  const barYScale = scaleY([0, ...data.map(d => d.y)], 0, boundsHeight)

  const allBars = data.map((d, i) => (
        <rect
          key={i}
          x={bandScale(d.x)}
          y={barYScale(d.y)}
          width={bandScale.bandwidth()}
          height={boundsHeight - barYScale(d.y)}
          rx={12}
          fill="#21eebeff"
        />
      ))

  /* build the plot*/

  return <>
  <div>
    <h1>Test dashboard</h1>
  </div>
  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
      <svg width = {width} height = {height}>
      <rect width = {width} height = {height} fill = "#FFFFFF" rx = {4}/>
      <g
      width={boundsWidth}
      height={boundsHeight}
      transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
      {allCircles}
      <AxisBottom xScale={xScale} pixelsPerTick={60} yPos={boundsHeight}/>
      <AxisLeft yScale={yScale} pixelsPerTick={60} xPos={-10}/>
      </g>
    </svg>

     <svg width = {width} height = {height}>
      <rect width = {width} height = {height} fill = "#FFFFFF" rx = {4}/>
      <g
      width={boundsWidth}
      height={boundsHeight}
      transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
      {allBars}
      <AxisLeft yScale={yScale} pixelsPerTick={60} xPos={-10}/>
      <AxisBand bandScale={bandScale} yPos={boundsHeight} />
       </g>
    </svg>
  </div>
  </>
  


}

export default App
