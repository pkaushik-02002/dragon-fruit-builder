import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sparkles, Shield, Info, Lock } from "lucide-react";
import { useState } from "react";

interface AIAssistPanelProps {
  tier?: "free" | "plus" | "enterprise";
}

export function AIAssistPanel({ tier = "free" }: AIAssistPanelProps) {
  const [assistEnabled, setAssistEnabled] = useState(false);
  
  const isLimited = tier === "free";

  return (
    <Card className="border-dashed">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <CardTitle className="text-heading-sm">AI Assist</CardTitle>
          </div>
          <Badge 
            variant="outline" 
            className={isLimited ? "bg-muted text-muted-foreground" : "bg-accent text-accent-foreground"}
          >
            {tier === "free" ? "Limited" : tier === "plus" ? "Plus" : "Enterprise"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="ai-assist" className="text-body-sm font-medium">
              Enable AI Assistance
            </Label>
            <p className="text-caption text-muted-foreground">
              Opt-in help for text refinement only
            </p>
          </div>
          <Switch
            id="ai-assist"
            checked={assistEnabled}
            onCheckedChange={setAssistEnabled}
          />
        </div>

        {assistEnabled && (
          <div className="rounded-lg bg-secondary/50 p-4 space-y-3 animate-fade-in">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <div className="text-body-sm">
                <p className="font-medium text-foreground">Guard Rails Active</p>
                <p className="text-muted-foreground mt-0.5">
                  AI cannot modify structure, logic, or features. Text refinement only.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Lock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="text-body-sm">
                <p className="font-medium text-foreground">Deterministic Mode</p>
                <p className="text-muted-foreground mt-0.5">
                  All outputs are verified. No auto-generated content.
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-3 mt-3">
              <p className="text-caption text-muted-foreground flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" />
                Transparency: Using scoped assistance model
              </p>
            </div>
          </div>
        )}

        {isLimited && (
          <div className="rounded-lg border border-border p-3 flex items-center justify-between">
            <p className="text-caption text-muted-foreground">
              Upgrade for extended AI capabilities
            </p>
            <Button variant="outline" size="sm">
              View plans
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
