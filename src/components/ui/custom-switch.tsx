"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const CustomSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-[#d1d5db] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ba4e0] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[#2ba4e0] data-[state=unchecked]:bg-white data-[state=checked]:bg-[#2ba4e0]",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:bg-[#9ca3af] data-[state=checked]:bg-white",
      )}
    />
  </SwitchPrimitives.Root>
))
CustomSwitch.displayName = SwitchPrimitives.Root.displayName

export { CustomSwitch }
