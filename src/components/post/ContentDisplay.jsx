import { Card, CardContent } from "@/components/Common/ui/card";
import { cn } from "@/lib/utils";

export default function ContentDisplay({ content, className }) {
  return (
    <Card className={cn("bg-[var(--home-content)] w-full border-0 p-0 shadow-none", className)}>
      <CardContent className={"p-0"}>
        <div className="max-w-full overflow-hidden wrap-anywhere hyphens-auto">
          {content}
        </div>
      </CardContent>
    </Card>
  );
}
