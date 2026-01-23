import { Card, CardContent } from "@/components/Common/ui/card";

export default function ContentDisplay({ content }) {
  return (
    <Card className="bg-background w-full border-0 p-0 shadow-none">
      <CardContent className={"p-0"}>
        <div className="max-w-full overflow-hidden wrap-anywhere hyphens-auto">
          {content}
        </div>
      </CardContent>
    </Card>
  );
}
