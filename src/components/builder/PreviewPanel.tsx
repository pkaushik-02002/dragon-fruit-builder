import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Database, Workflow, Code, Check, AlertCircle } from "lucide-react";

interface PreviewPanelProps {
  projectName?: string;
  onConfirmBuild?: () => void;
  isReady?: boolean;
}

export function PreviewPanel({ 
  projectName = "Untitled Project",
  onConfirmBuild,
  isReady = false 
}: PreviewPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-heading-sm flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              Preview
            </CardTitle>
            <CardDescription className="mt-1">
              Human-readable summary of {projectName}
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={isReady 
              ? "bg-success/10 text-success border-success/30" 
              : "bg-warning/10 text-warning-foreground border-warning/30"
            }
          >
            {isReady ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Ready to build
              </>
            ) : (
              <>
                <AlertCircle className="h-3 w-3 mr-1" />
                Incomplete
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="ui" className="w-full">
          <div className="border-b border-border px-4">
            <TabsList className="h-12 bg-transparent gap-4">
              <TabsTrigger 
                value="ui" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0"
              >
                UI Structure
              </TabsTrigger>
              <TabsTrigger 
                value="data"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0"
              >
                Data Model
              </TabsTrigger>
              <TabsTrigger 
                value="workflows"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0"
              >
                Workflows
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="ui" className="p-4 m-0">
            <div className="rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                <Code className="h-4 w-4" />
                <span>No UI elements defined yet</span>
              </div>
              <p className="mt-2 text-caption text-muted-foreground">
                Complete the intent steps to generate UI preview
              </p>
            </div>
          </TabsContent>

          <TabsContent value="data" className="p-4 m-0">
            <div className="rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                <Database className="h-4 w-4" />
                <span>No data entities defined yet</span>
              </div>
              <p className="mt-2 text-caption text-muted-foreground">
                Define entities in the Data step to see schema preview
              </p>
            </div>
          </TabsContent>

          <TabsContent value="workflows" className="p-4 m-0">
            <div className="rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                <Workflow className="h-4 w-4" />
                <span>No workflows defined yet</span>
              </div>
              <p className="mt-2 text-caption text-muted-foreground">
                Define actions and rules to see workflow preview
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t border-border">
          <Button 
            className="w-full" 
            size="lg"
            disabled={!isReady}
            onClick={onConfirmBuild}
          >
            <Check className="h-4 w-4 mr-2" />
            Confirm and Build
          </Button>
          <p className="text-caption text-muted-foreground text-center mt-2">
            Build only proceeds after explicit confirmation
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
