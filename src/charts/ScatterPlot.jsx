import {useRef, useState} from 'react'
import {AxisLeft} from '../components/LeftAxis.jsx'
import {AxisBottom} from '../components/BottomAxis.jsx'
import {useDimensions} from '../components/UseDimensions.jsx'
import {scaleX} from '../components/scaleX.jsx'
import {scaleY} from '../components/scaleY.jsx'
import {Tooltip} from '../components/Tooltip.jsx'


export const ScatterPlot = ({data, MARGIN, hoveredIndex, setHoveredIndex}) => {
  const chartRef = useRef(null);
  const {width} = useDimensions(chartRef);
  const height = width;

  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = scaleX(data.map(d => d.x), 0, boundsWidth);
  const yScale = scaleY([0, ...data.map(d => d.y)], 0, boundsHeight);

  const [interactionData, setInteractionData] = useState(null);

  const circles = data.map((d, i) => (
    <circle
      key={i}
      cx={xScale(d.x)}
      cy={yScale(d.y)}
      r={6}
      fill="#21eebeff"
      opacity={hoveredIndex === null || hoveredIndex === i ? 1 : 0.2}
      style={{transition: 'opacity 0.2s', cursor: 'pointer'}}
      onMouseEnter={() => {
        setHoveredIndex(i);
        setInteractionData({
          xPos: xScale(d.x) + MARGIN.left,
          yPos: yScale(d.y) + MARGIN.top,
          xValue: d.x,
          yValue: d.y,
          color: "#21eebeff",
        });
      }}
      onMouseLeave={() => {
        setHoveredIndex(null);
        setInteractionData(null);
      }}
    />
  ));

  return (
    <div ref={chartRef} style={{width: "100%"}}>
      <BaseScatterPlot
        width={width}
        height={height}
        boundsHeight={boundsHeight}
        circles={circles}
        xScale={xScale}
        yScale={yScale}
        MARGIN={MARGIN}
        interactionData={interactionData}
      />
    </div>
  );
};

const BaseScatterPlot = ({width, height, boundsHeight, circles, xScale, yScale, MARGIN, interactionData}) => (
  <div style={{position: "relative"}}>
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="#FFFFFF" rx={4} />
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        {circles}
        <AxisBottom xScale={xScale} pixelsPerTick={60} yPos={boundsHeight} />
        <AxisLeft yScale={yScale} pixelsPerTick={60} xPos={-10} />
      </g>
    </svg>
    <div style={{position: "absolute", width, height, top: 0, left: 0, pointerEvents: "none"}}>
      <Tooltip interactionData={interactionData} />
    </div>
  </div>
);
