import { cn } from "@/lib/utils"
import { HTMLAttributes, ReactNode } from "react"

interface HeadingTectProps extends HTMLAttributes<HTMLHeadElement> {
  children?: ReactNode

}

const HeadingText = ({ children, className, ...props }: HeadingTectProps) => {
  return (
    <h1 className={cn("text-5xl sm:text-6xl text-pretty font-heading font-semibold tracking-tight text-zinc-800", className)}
      {...props}>{children}</h1>
  )
}

export default HeadingText