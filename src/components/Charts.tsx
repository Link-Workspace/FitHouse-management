import { useId } from 'react'

interface LineChartProps {
  primary: number[]
  secondary?: number[]
  labels: string[]
  primaryLabel?: string
  secondaryLabel?: string
  height?: number
}

function points(values: number[], width: number, height: number, min: number, max: number) {
  return values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * width
    const y = height - ((value - min) / Math.max(max - min, 1)) * height
    return `${x},${y}`
  }).join(' ')
}

export function LineChart({ primary, secondary, labels, primaryLabel = 'Receita', secondaryLabel = 'Despesas', height = 210 }: LineChartProps) {
  const gradientId = useId().replace(/:/g, '')
  const all = secondary ? [...primary, ...secondary] : primary
  const min = Math.min(...all) * 0.86
  const max = Math.max(...all) * 1.08
  const width = 760
  const graphHeight = 170
  const primaryPoints = points(primary, width, graphHeight, min, max)
  const secondaryPoints = secondary ? points(secondary, width, graphHeight, min, max) : ''
  const area = `0,${graphHeight} ${primaryPoints} ${width},${graphHeight}`

  return (
    <div className="line-chart" style={{ minHeight: height }}>
      <div className="line-chart__legend">
        <span><i className="legend-dot legend-dot--primary" />{primaryLabel}</span>
        {secondary && <span><i className="legend-dot legend-dot--secondary" />{secondaryLabel}</span>}
      </div>
      <svg viewBox={`0 0 ${width} 205`} preserveAspectRatio="none" role="img" aria-label="Gráfico de evolução">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#e12b2f" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#e12b2f" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => <line key={line} x1="0" x2={width} y1={line * 48 + 5} y2={line * 48 + 5} className="chart-grid-line" />)}
        <polygon points={area} fill={`url(#${gradientId})`} />
        {secondary && <polyline points={secondaryPoints} className="chart-line chart-line--secondary" />}
        <polyline points={primaryPoints} className="chart-line chart-line--primary" />
        {primary.map((value, index) => {
          const [x, y] = primaryPoints.split(' ')[index].split(',')
          return <circle key={`${value}-${index}`} cx={x} cy={y} r="4.5" className="chart-point" />
        })}
      </svg>
      <div className="line-chart__labels">{labels.map((label) => <span key={label}>{label}</span>)}</div>
    </div>
  )
}

export function BarChart({ values, labels }: { values: number[]; labels: string[] }) {
  const max = Math.max(...values)
  return (
    <div className="bar-chart">
      {values.map((value, index) => (
        <div className="bar-chart__item" key={labels[index]}>
          <div className="bar-chart__value">{value}</div>
          <div className="bar-chart__track"><span style={{ height: `${Math.max(8, (value / max) * 100)}%` }} /></div>
          <div className="bar-chart__label">{labels[index]}</div>
        </div>
      ))}
    </div>
  )
}

export function DonutChart({ value, label, helper }: { value: number; label: string; helper: string }) {
  return (
    <div className="donut-wrap">
      <div className="donut" style={{ background: `conic-gradient(#e12b2f ${value * 3.6}deg, #2a2522 0deg)` }}>
        <div><strong>{value}%</strong><span>{label}</span></div>
      </div>
      <p>{helper}</p>
    </div>
  )
}
