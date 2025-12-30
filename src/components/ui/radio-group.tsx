"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface RadioGroupContextValue {
  value?: string
  name?: string
  onChange?: (value: string) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  name?: string
  onValueChange?: (value: string) => void
}

function RadioGroup({
  value,
  name,
  onValueChange,
  className,
  children,
  ...props
}: RadioGroupProps) {
  const contextValue = React.useMemo(
    () => ({
      value,
      name,
      onChange: onValueChange
    }),
    [value, name, onValueChange]
  )

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div role="radiogroup" className={cn("grid gap-3", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

interface RadioGroupItemProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  value: string
  disabled?: boolean
}

function RadioGroupItem({
  value,
  children,
  disabled,
  className,
  ...props
}: RadioGroupItemProps) {
  const context = React.useContext(RadioGroupContext)

  if (!context) {
    throw new Error("RadioGroupItem must be used within a RadioGroup")
  }

  const checked = context.value === value

  const handleChange = () => {
    if (disabled) return
    context.onChange?.(value)
  }

  return (
    <label
      role="radio"
      aria-checked={checked}
      tabIndex={-1}
      data-state={checked ? "checked" : "unchecked"}
      data-disabled={disabled ? "true" : undefined}
      className={cn(
        "relative flex w-full cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-60",
        checked && "border-emerald-400 bg-emerald-50 shadow-lg",
        className
      )}
      onClick={handleChange}
      {...props}
    >
      <input
        type="radio"
        className="sr-only"
        name={context.name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      {children}
    </label>
  )
}

export { RadioGroup, RadioGroupItem }
