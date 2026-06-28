import {useState} from 'react'
import './App.css'
import {BarPlot} from './charts/BarPlot.jsx'
import {LinePlot} from './charts/LinePlot.jsx'
import {ScatterPlot} from './charts/ScatterPlot.jsx'

const MARGIN = { top: 40, right: 40, bottom: 40, left: 40 }

const data = [
  {x: 10, y: 30},
  {x: 0,  y: 15},
  {x: 14, y: 36},
  {x: 7,  y: 23},
  {x: 12, y: 9}
]

function App() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return <>
    <div>
      <h1>Test dashboard</h1>
    </div>
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', gap: '20px'}}>
      <div style={{flex: '1 1 400px', minWidth: '200px', maxWidth: '420px'}}>
        <ScatterPlot data={data} MARGIN={MARGIN} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
      </div>
      <div style={{flex: '1 1 400px', minWidth: '200px', maxWidth: '420px'}}>
        <BarPlot data={data} MARGIN={MARGIN} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
      </div>
      <div style={{flex: '1 1 400px', minWidth: '200px', maxWidth: '420px'}}>
        <LinePlot data={data} MARGIN={MARGIN} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
      </div>
    </div>
  </>
}

export default App
