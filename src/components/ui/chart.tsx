'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, PieChart, TrendingUp, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SimpleBarChartProps {
  data: Array<{ label: string; value: number; color?: string; tooltip?: string }>
  title?: string
  description?: string
  height?: number
  showValues?: boolean
  animated?: boolean
}

export function SimpleBarChart({ 
  data, 
  title, 
  description, 
  height = 200, 
  showValues = true,
  animated = true 
}: SimpleBarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>{title}</span>
          </CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-3" style={{ height: `${height}px` }}>
          {data.map((item, index) => (
            <div 
              key={index} 
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    {showValues && (
                      <span className={cn(
                        "text-sm font-bold transition-all duration-300",
                        hoveredIndex === index ? "text-gray-900" : "text-gray-600"
                      )}>
                        {item.value}
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={cn(
                        "h-2 rounded-full transition-all duration-500 ease-out",
                        animated && "animate-pulse"
                      )}
                      style={{
                        width: hoveredIndex === index ? `${(item.value / maxValue) * 100}%` : `${(item.value / maxValue) * 100}%`,
                        backgroundColor: item.color || '#3B82F6',
                        transform: hoveredIndex === index ? 'scaleY(1.1)' : 'scaleY(1)',
                        transformOrigin: 'left'
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Tooltip */}
              {item.tooltip && hoveredIndex === index && (
                <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
                  {item.tooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface SimplePieChartProps {
  data: Array<{ label: string; value: number; color: string; tooltip?: string }>
  title?: string
  description?: string
  size?: number
  showLegend?: boolean
  animated?: boolean
}

export function SimplePieChart({ 
  data, 
  title, 
  description, 
  size = 200, 
  showLegend = true,
  animated = true 
}: SimplePieChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0
  
  const paths = data.map((item, index) => {
    const percentage = (item.value / total) * 100
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle
    
    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180
    
    const radius = hoveredIndex === index ? 42 : 40
    const x1 = 50 + radius * Math.cos(startAngleRad)
    const y1 = 50 + radius * Math.sin(startAngleRad)
    const x2 = 50 + radius * Math.cos(endAngleRad)
    const y2 = 50 + radius * Math.sin(endAngleRad)
    
    const largeArcFlag = angle > 180 ? 1 : 0
    
    return {
      path: `M 50 50 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
      color: item.color,
      label: item.label,
      value: item.value,
      percentage,
      tooltip: item.tooltip
    }
  })
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-blue-600" />
            <span>{title}</span>
          </CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div className="flex items-center space-x-6">
          <div className="relative" style={{ width: size, height: size }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {paths.map((segment, index) => (
                <g key={index}>
                  <path
                    d={segment.path}
                    fill={segment.color}
                    stroke="white"
                    strokeWidth="0.5"
                    className={cn(
                      "transition-all duration-300 cursor-pointer",
                      hoveredIndex === index ? "opacity-100" : "opacity-90 hover:opacity-100"
                    )}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                  {segment.percentage > 5 && (
                    <text
                      x="50"
                      y="50"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xs font-medium fill-white pointer-events-none"
                      style={{
                        transform: `rotate(${(index * 360 / data.length) + (360 / data.length / 2)}deg) translate(0, -25px) rotate(-${(index * 360 / data.length) + (360 / data.length / 2)}deg)`
                      }}
                    >
                      {Math.round(segment.percentage)}%
                    </text>
                  )}
                </g>
              ))}
            </svg>
            
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{total}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>
          </div>
          
          {showLegend && (
            <div className="flex-1 space-y-2">
              {data.map((item, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-center space-x-2 p-1 rounded transition-all duration-200",
                    hoveredIndex === index ? "bg-gray-100" : ""
                  )}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-200",
                      hoveredIndex === index ? "scale-125" : ""
                    )}
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm text-gray-600">
                    ({item.value} - {Math.round((item.value / total) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Tooltip */}
        {hoveredIndex !== null && data[hoveredIndex]?.tooltip && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-blue-900">
                  {data[hoveredIndex].label}
                </div>
                <div className="text-xs text-blue-700">
                  {data[hoveredIndex].tooltip}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface SimpleLineChartProps {
  data: Array<{ label: string; value: number; tooltip?: string }>
  title?: string
  description?: string
  height?: number
  color?: string
  showPoints?: boolean
  animated?: boolean
}

export function SimpleLineChart({ 
  data, 
  title, 
  description, 
  height = 200, 
  color = '#3B82F6',
  showPoints = true,
  animated = true 
}: SimpleLineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue || 1
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((item.value - minValue) / range) * 80 - 10
    return `${x},${y}`
  }).join(' ')
  
  const pointCoordinates = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((item.value - minValue) / range) * 80 - 10
    return { x, y, value: item.value, label: item.label, tooltip: item.tooltip }
  })
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>{title}</span>
          </CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div className="relative" style={{ height: `${height}px` }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="0.5"
              />
            ))}
            
            {/* Area under the line */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            <path
              d={`M ${pointCoordinates.map(p => `${p.x},${p.y}`).join(' L ')} L 100,90 L 0,90 Z`}
              fill="url(#gradient)"
              className="transition-all duration-500"
            />
            
            {/* Data line */}
            <polyline
              points={points}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "transition-all duration-500",
                animated && "animate-pulse"
              )}
            />
            
            {/* Data points */}
            {showPoints && pointCoordinates.map((point, index) => (
              <g key={index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={hoveredIndex === index ? "4" : "2"}
                  fill={color}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                {hoveredIndex === index && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    className="animate-ping"
                  />
                )}
              </g>
            ))}
          </svg>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-2">
            {data.map((item, index) => (
              <span 
                key={index} 
                className={cn(
                  "text-xs text-gray-600 transition-all duration-200",
                  hoveredIndex === index ? "text-gray-900 font-medium" : ""
                )}
              >
                {item.label}
              </span>
            ))}
          </div>
          
          {/* Value tooltip */}
          {hoveredIndex !== null && (
            <div className="absolute top-2 right-2 bg-white rounded-lg shadow-lg border p-2">
              <div className="text-sm font-medium text-gray-900">
                {pointCoordinates[hoveredIndex].value}
              </div>
              <div className="text-xs text-gray-600">
                {pointCoordinates[hoveredIndex].label}
              </div>
              {pointCoordinates[hoveredIndex].tooltip && (
                <div className="text-xs text-blue-600 mt-1">
                  {pointCoordinates[hoveredIndex].tooltip}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface ChartPlaceholderProps {
  title: string
  description?: string
  icon?: React.ReactNode
  height?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export function ChartPlaceholder({ title, description, icon, height = 200, action }: ChartPlaceholderProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {icon || <BarChart3 className="h-5 w-5 text-blue-600" />}
          <span>{title}</span>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div 
          className="bg-gray-50 rounded-lg flex items-center justify-center"
          style={{ height: `${height}px` }}
        >
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Gráfico em desenvolvimento</p>
            <p className="text-sm text-gray-400 mb-3">Visualização de dados em breve</p>
            {action && (
              <button
                onClick={action.onClick}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                {action.label}
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
    period: string
  }
  icon?: React.ReactNode
  color?: string
  description?: string
  loading?: boolean
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon, 
  color = '#3B82F6',
  description,
  loading = false
}: MetricCardProps) {
  if (loading) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {change && (
              <div className="flex items-center mt-2">
                {change.type === 'increase' ? (
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">+{change.value}%</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <TrendingUp className="h-4 w-4 mr-1 rotate-180" />
                    <span className="text-xs font-medium">-{change.value}%</span>
                  </div>
                )}
                <span className="text-xs text-gray-500 ml-1">{change.period}</span>
              </div>
            )}
            {description && (
              <p className="text-xs text-gray-600 mt-1">{description}</p>
            )}
          </div>
          <div 
            className="flex-shrink-0 ml-4 p-3 rounded-lg"
            style={{ backgroundColor: `${color}20` }}
          >
            <div style={{ color }}>
              {icon}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}