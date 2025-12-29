import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, RotateCcw, Tag, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Version {
  id: string;
  label: string;
  timestamp: string;
  author: string;
  isCurrent?: boolean;
}

interface VersionHistoryProps {
  versions: Version[];
  onRollback?: (id: string) => void;
}

export function VersionHistory({ versions, onRollback }: VersionHistoryProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-heading-sm flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Version History
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-caption">
            View all
            <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {versions.map((version, index) => (
            <div
              key={version.id}
              className={cn(
                "flex items-start justify-between p-3 rounded-lg transition-colors",
                version.isCurrent 
                  ? "bg-primary/5 border border-primary/20" 
                  : "bg-secondary/50 hover:bg-secondary"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border">
                  <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-body-sm font-medium text-foreground">
                      {version.label}
                    </p>
                    {version.isCurrent && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-caption">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-caption text-muted-foreground mt-0.5">
                    {version.timestamp} · {version.author}
                  </p>
                </div>
              </div>
              {!version.isCurrent && onRollback && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRollback(version.id)}
                  className="shrink-0"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                  Rollback
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
