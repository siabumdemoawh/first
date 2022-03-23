import { FC, ReactNode } from 'react'

export type TooltipProps = {
  message: string
  children: ReactNode
  direction?:
    | 'tooltip-top'
    | 'tooltip-right'
    | 'tooltip-bottom'
    | 'tooltip-left'
  className?: string
}

const Tooltip: FC<TooltipProps> = (props) => {
  const { message, children, direction = 'tooltip-right', className } = props
  return (
    <div
      className={`tooltip ${direction} ${className}`}
      data-tip={message}
      {...props}
    >
      {children}
    </div>
  )
}

export default Tooltip
