import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, Lock, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntentStepProps {
  step: number;
  title: string;
  description: string;
  status: "pending" | "active" | "confirmed" | "locked";
  items?: string[];
  onEdit?: () => void;
  onConfirm?: () => void;
  onContinue?: () => void;
}

const statusConfig = {
  pending: { 
    badge: "Pending", 
    badgeClass: "bg-muted text-muted-foreground",
    cardClass: "opacity-60"
  },
  active: { 
    badge: "In Progress", 
    badgeClass: "bg-primary/10 text-primary border-primary/30",
    cardClass: "border-primary/50 shadow-sm"
  },
  confirmed: { 
    badge: "Confirmed", 
    badgeClass: "bg-success/10 text-success border-success/30",
    cardClass: ""
  },
  locked: { 
    badge: "Locked", 
    badgeClass: "bg-muted text-muted-foreground",
    cardClass: "opacity-60"
  },
};

export function IntentStep({
  step,
  title,
  description,
  status,
  items = [],
  onEdit,
  onConfirm,
  onContinue,
}: IntentStepProps) {
  const config = statusConfig[status];

  return (
    <Card className={cn("transition-all duration-200", config.cardClass)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-body-sm font-medium",
                status === "confirmed"
                  ? "bg-success text-success-foreground"
                  : status === "active"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {status === "confirmed" ? (
                <Check className="h-4 w-4" />
              ) : status === "locked" ? (
                <Lock className="h-3.5 w-3.5" />
              ) : (
                step
              )}
            </div>
            <div>
              <CardTitle className="text-heading-sm">{title}</CardTitle>
              <CardDescription className="mt-0.5">{description}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={config.badgeClass}>
            {config.badge}
          </Badge>
        </div>
      </CardHeader>
      
      {(status === "active" || status === "confirmed") && items.length > 0 && (
        <CardContent className="pt-0">
          <div className="rounded-lg bg-secondary/50 p-4">
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-body-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            {status === "confirmed" && onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                Edit
              </Button>
            )}
            {status === "active" && (
              <>
                {onConfirm && (
                  <Button size="sm" onClick={onConfirm}>
                    <Check className="h-3.5 w-3.5 mr-1.5" />
                    Confirm
                  </Button>
                )}
                {onContinue && (
                  <Button variant="outline" size="sm" onClick={onContinue}>
                    Continue
                    <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
