import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/Common/ui/tooltip";
import { formatTime } from "@/utils/formatTime";
import { formatFullTime } from "@/utils/time";

function TimeTooltip({ dateString, children, className = "" }) {
  const finalDate = dateString || children;

  if (!finalDate) return null;

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <span
          className={`cursor-pointer text-sm text-muted-foreground  ${className}`}
        >
          {formatTime(finalDate)}
        </span>
      </TooltipTrigger>

      <TooltipContent side="top" className="text-sm">
        {formatFullTime(finalDate)}
      </TooltipContent>
    </Tooltip>
  );
}

export default TimeTooltip;
