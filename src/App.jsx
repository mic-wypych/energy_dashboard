import { useState } from 'react'
import './App.css'
import {scaleX} from './components/scaleX.jsx'
import {scaleY} from './components/scaleY.jsx'

function App() {

  /* build constants*/
  const width = 800
  const height = 800

  /* data */

  const data = [
    {x: 10, y: 30},
    {x: 0, y: 15},
    {x: 14, y: 36},
    {x: 7, y: 23}
  ]


  /* build scales*/

  const xScale = scaleX(data.map(d => d.x))
  const yScale = scaleY(data.map(d => d.y))


  /* build the plot*/

  return <div display = "Flex" justifyContent = "center" alignItems = "center">
      <svg width = {width} height = {height}>

    {data.map((d, i) => (
        <circle
          key={i}
          cx={xScale(d.x)}  // data value → pixel position
          cy={yScale(d.y)}     // all circles on the same line
          r={6}
          fill="#21eebeff"
        />
      ))}
  </svg>

  </div>
  


}

export default App
