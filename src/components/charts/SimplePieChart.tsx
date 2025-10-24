'use client'

<<<<<<< HEAD
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface DataPoint {
  name: string
  value: number
  fill: string
}

interface SimplePieChartProps {
  data: DataPoint[]
}

export default function SimplePieChart({ data }: SimplePieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
=======
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface SimplePieChartProps {
  data: any[]
  dataKey: string
  nameKey: string
  colors?: string[]
  height?: number
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function SimplePieChart({ 
  data, 
  dataKey, 
  nameKey, 
  colors = DEFAULT_COLORS,
  height = 300 
}: SimplePieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
<<<<<<< HEAD
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}
        />
      </RechartsPieChart>
=======
          dataKey={dataKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
    </ResponsiveContainer>
  )
}