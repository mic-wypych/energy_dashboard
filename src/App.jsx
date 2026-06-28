import { useState } from 'react'
import {scaleBand, line} from 'd3'
import './App.css'
import {scaleX} from './components/scaleX.jsx'
import {scaleY} from './components/scaleY.jsx'
import {useDimensions} from './components/UseDimensions.jsx'
import {BarPlot} from './charts/BarPlot.jsx'
import {LinePlot} from './charts/LinePlot.jsx'
import {ScatterPlot} from './charts/ScatterPlot.jsx'

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

  const lineGenerator = line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))

  const linePath = lineGenerator([...data].sort((a, b) => a.x - b.x))

  

  /* build the plot*/

  return <>
  <div>
    <h1>Test dashboard</h1>
  </div>
  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', gap: '20px'}}>
    <div style={{flex: '1 1 400px', minWidth: '400px', maxWidth: '420px'}}>
      <ScatterPlot
        boundsWidth={boundsWidth}
        boundsHeight={boundsHeight}
        circles={allCircles}
        xScale={xScale}
        yScale={yScale}
        MARGIN={MARGIN}
      />
    </div>
    <div style={{flex: '1 1 400px', minWidth: '400px', maxWidth: '420px'}}>
      <BarPlot
        boundsWidth={boundsWidth}
        boundsHeight={boundsHeight}
        bars={allBars}
        bandScale={bandScale}
        yScale={barYScale}
        MARGIN={MARGIN}
      />
    </div>
    <div style={{flex: '1 1 400px', minWidth: '400px', maxWidth: '420px'}}>
      <LinePlot
        boundsWidth={boundsWidth}
        boundsHeight={boundsHeight}
        linePath={linePath}
        xScale={xScale}
        yScale={yScale}
        MARGIN={MARGIN}
      />
    </div>
  </div>
  </>
  


}

export default App
