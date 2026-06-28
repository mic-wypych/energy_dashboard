import {useRef} from 'react'
import {scaleBand} from 'd3'
import {AxisBand} from '../components/BandAxis.jsx'
import {AxisLeft} from '../components/LeftAxis.jsx'
import {useDimensions} from '../components/UseDimensions.jsx'
import {scaleY} from '../components/scaleY.jsx'

export const BarPlot = ({data, MARGIN, hoveredIndex, setHoveredIndex}) => {
  const chartRef = useRef(null);
  const {width} = useDimensions(chartRef);
  const height = width;

  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const bandScale = scaleBand()
    .domain(data.map(d => d.x))
    .range([0, boundsWidth])
    .padding(0.4);

  const yScale = scaleY([0, ...data.map(d => d.y)], 0, boundsHeight);

  const bars = data.map((d, i) => (
    <rect
      key={i}
      x={bandScale(d.x)}
      y={yScale(d.y)}
      width={bandScale.bandwidth()}
      height={boundsHeight - yScale(d.y)}
      rx={12}
      fill="#21eebeff"
      opacity={hoveredIndex === null || hoveredIndex === i ? 1 : 0.2}
      style={{transition: 'opacity 0.2s', cursor: 'pointer'}}
      onMouseEnter={() => setHoveredIndex(i)}
      onMouseLeave={() => setHoveredIndex(null)}
    />
  ));

  return (
    <div ref={chartRef} style={{width: "100%"}}>
      <BaseBarPlot
        width={width}
        height={height}
        boundsHeight={boundsHeight}
        bars={bars}
        bandScale={bandScale}
        yScale={yScale}
        MARGIN={MARGIN}
      />
    </div>
  );
};

const BaseBarPlot = ({width, height, boundsHeight, bars, bandScale, yScale, MARGIN}) => (
  <svg width={width} height={height}>
    <rect width={width} height={height} fill="#FFFFFF" rx={4} />
    <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
      {bars}
      <AxisLeft yScale={yScale} pixelsPerTick={60} xPos={-10} />
      <AxisBand bandScale={bandScale} yPos={boundsHeight} />
    </g>
  </svg>
);
