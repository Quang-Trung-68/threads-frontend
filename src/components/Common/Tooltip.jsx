import { forwardRef } from "react";
import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipTrigger,
} from "@/components/Common/ui/tooltip";

export const Tooltip = forwardRef(
  (
    {
      label,
      children,
      side = "bottom",
      align = "center",
      delay = 500,
      className = "",
      ...props
    },
    ref,
  ) => {
    if (!label) return children;

    return (
      <TooltipRoot delayDuration={delay}>
        <TooltipTrigger asChild ref={ref} {...props}>
          {children}
        </TooltipTrigger>

        <TooltipContent
          side={side}
          align={align}
          sideOffset={4}
          className={[
            "rounded-md px-2 py-1 text-xs",
            "bg-gray-900 text-white",
            "border border-gray-700",
            className,
          ].join(" ")}
        >
          {label}
        </TooltipContent>
      </TooltipRoot>
    );
  },
);

Tooltip.displayName = "Tooltip";
