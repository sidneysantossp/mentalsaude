'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface SimpleLineChartProps {
  data: any[]
  xKey: string
  yKey: string
  color?: string
  height?: number
}

export default function SimpleLineChart({ 
  data, 
  xKey, 
  yKey, 
  color = '#8884d8',
  height = 300 
}: SimpleLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey={yKey} 
          stroke={color} 
          strokeWidth={2}
          dot={{ fill: color }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}