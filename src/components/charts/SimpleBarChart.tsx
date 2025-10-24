'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface SimpleBarChartProps {
  data: any[]
  xKey: string
  yKey: string
  color?: string
  height?: number
}

export default function SimpleBarChart({ 
  data, 
  xKey, 
  yKey, 
  color = '#8884d8',
  height = 300 
}: SimpleBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={yKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  )
}