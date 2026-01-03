import { useState } from "react";
import { 
  Users, 
  Layout, 
  Database, 
  Workflow, 
  Sparkles, 
  ChevronDown,
  ChevronRight,
  Edit2,
  Trash2,
  Plus,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Requirements, UserRole, PageRequirement, DataModel, Workflow as WorkflowType, Feature } from "@/types/requirements";
import { cn } from "@/lib/utils";

interface RequirementsPanelProps {
  requirements: Requirements | null;
  onUpdate: (requirements: Requirements) => void;
  onConfirm: () => void;
  isConfirmed: boolean;
}

interface SectionProps<T> {
  title: string;
  icon: React.ReactNode;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onAdd?: () => void;
  onRemove?: (index: number) => void;
  emptyMessage: string;
}

function Section<T>({ title, icon, items, renderItem, onAdd, onRemove, emptyMessage }: SectionProps<T>) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-between w-full p-3 hover:bg-muted/50 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-medium text-sm">{title}</span>
            <Badge variant="secondary" className="ml-2">
              {items.length}
            </Badge>
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-9 pr-3 pb-3 space-y-2">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">{emptyMessage}</p>
          ) : (
            items.map((item, index) => (
              <div key={index} className="group relative">
                {renderItem(item, index)}
                {onRemove && (
                  <button
                    onClick={() => onRemove(index)}
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </button>
                )}
              </div>
            ))
          )}
          {onAdd && (
            <Button variant="ghost" size="sm" onClick={onAdd} className="w-full mt-2">
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function RequirementsPanel({ requirements, onUpdate, onConfirm, isConfirmed }: RequirementsPanelProps) {
  if (!requirements) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No requirements yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Start describing your application in the chat to extract requirements.
          </p>
        </div>
      </div>
    );
  }

  const removeItem = <T,>(array: T[], index: number): T[] => {
    return array.filter((_, i) => i !== index);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">
            {requirements.projectName || 'Untitled Project'}
          </h2>
          {isConfirmed && (
            <Badge variant="default" className="bg-success text-success-foreground">
              <Check className="h-3 w-3 mr-1" />
              Confirmed
            </Badge>
          )}
        </div>
        {requirements.description && (
          <p className="text-sm text-muted-foreground">{requirements.description}</p>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          <Section
            title="User Roles"
            icon={<Users className="h-4 w-4 text-accent" />}
            items={requirements.users}
            emptyMessage="No user roles defined"
            onRemove={(index) => onUpdate({
              ...requirements,
              users: removeItem(requirements.users, index)
            })}
            renderItem={(user: UserRole) => (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{user.role}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{user.description}</p>
                <div className="flex flex-wrap gap-1">
                  {user.permissions.map((perm, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {perm}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          />

          <Section
            title="Pages"
            icon={<Layout className="h-4 w-4 text-accent" />}
            items={requirements.pages}
            emptyMessage="No pages defined"
            onRemove={(index) => onUpdate({
              ...requirements,
              pages: removeItem(requirements.pages, index)
            })}
            renderItem={(page: PageRequirement) => (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{page.name}</span>
                  <Badge variant="secondary" className="text-xs">{page.path}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{page.description}</p>
                <div className="flex flex-wrap gap-1">
                  {page.accessRoles.map((role, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          />

          <Section
            title="Data Models"
            icon={<Database className="h-4 w-4 text-accent" />}
            items={requirements.dataModels}
            emptyMessage="No data models defined"
            onRemove={(index) => onUpdate({
              ...requirements,
              dataModels: removeItem(requirements.dataModels, index)
            })}
            renderItem={(model: DataModel) => (
              <div className="p-3 bg-muted/50 rounded-lg">
                <span className="font-medium text-sm">{model.name}</span>
                <div className="mt-2 space-y-1">
                  {model.fields.map((field, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-muted-foreground">{field.name}</span>
                      <Badge variant="secondary" className="text-xs">{field.type}</Badge>
                      {field.required && (
                        <Badge variant="outline" className="text-xs">required</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          />

          <Section
            title="Workflows"
            icon={<Workflow className="h-4 w-4 text-accent" />}
            items={requirements.workflows}
            emptyMessage="No workflows defined"
            onRemove={(index) => onUpdate({
              ...requirements,
              workflows: removeItem(requirements.workflows, index)
            })}
            renderItem={(workflow: WorkflowType) => (
              <div className="p-3 bg-muted/50 rounded-lg">
                <span className="font-medium text-sm">{workflow.name}</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Trigger: {workflow.trigger}
                </p>
                <ol className="mt-2 space-y-1 list-decimal list-inside">
                  {workflow.steps.map((step, i) => (
                    <li key={i} className="text-xs text-muted-foreground">{step}</li>
                  ))}
                </ol>
              </div>
            )}
          />

          <Section
            title="Features"
            icon={<Sparkles className="h-4 w-4 text-accent" />}
            items={requirements.features}
            emptyMessage="No features defined"
            onRemove={(index) => onUpdate({
              ...requirements,
              features: removeItem(requirements.features, index)
            })}
            renderItem={(feature: Feature) => (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{feature.name}</span>
                  <Badge 
                    variant={feature.priority === 'must-have' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {feature.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            )}
          />
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <Button 
          onClick={onConfirm} 
          className="w-full"
          disabled={isConfirmed}
          variant={isConfirmed ? "secondary" : "accent"}
        >
          {isConfirmed ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Requirements Confirmed
            </>
          ) : (
            'Confirm & Proceed to Build'
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-2">
          You can still modify requirements after confirmation
        </p>
      </div>
    </div>
  );
}
