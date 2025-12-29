import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IntentStep } from "@/components/builder/IntentStep";
import { AIAssistPanel } from "@/components/builder/AIAssistPanel";
import { VersionHistory } from "@/components/builder/VersionHistory";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { 
  ChevronLeft, 
  Save,
  Users,
  Shield,
  Zap,
  Database,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Intent step definitions
const intentSteps = [
  {
    step: 1,
    title: "Define Users",
    description: "Who will use this product?",
    icon: Users,
    placeholder: "e.g., Customers, Administrators, Support Agents"
  },
  {
    step: 2,
    title: "Define Roles",
    description: "What permissions does each user type have?",
    icon: Shield,
    placeholder: "e.g., Customers can view orders. Admins can manage all orders."
  },
  {
    step: 3,
    title: "Define Actions",
    description: "What can users do in the system?",
    icon: Zap,
    placeholder: "e.g., Submit order, Approve order, Cancel order"
  },
  {
    step: 4,
    title: "Define Data",
    description: "What information needs to be stored?",
    icon: Database,
    placeholder: "e.g., Orders (id, status, customer, items, total)"
  },
  {
    step: 5,
    title: "Define Rules",
    description: "What business logic applies?",
    icon: FileText,
    placeholder: "e.g., Orders over $1000 require admin approval"
  },
];

// Placeholder versions
const sampleVersions = [
  { id: "v3", label: "Added order approval flow", timestamp: "Today, 2:30 PM", author: "You", isCurrent: true },
  { id: "v2", label: "Initial user roles", timestamp: "Yesterday, 4:15 PM", author: "You" },
  { id: "v1", label: "Project created", timestamp: "Dec 26, 10:00 AM", author: "You" },
];

export default function Builder() {
  const { id } = useParams();
  const isNew = id === "new";
  const { toast } = useToast();

  const [projectName, setProjectName] = useState(isNew ? "" : "E-commerce Platform");
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState<Record<number, string[]>>({});
  const [inputValue, setInputValue] = useState("");

  const getStepStatus = (step: number): "pending" | "active" | "confirmed" | "locked" => {
    if (step < currentStep) return "confirmed";
    if (step === currentStep) return "active";
    return "pending";
  };

  const handleConfirmStep = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Input required",
        description: "Please define at least one item before confirming.",
        variant: "destructive"
      });
      return;
    }

    const items = inputValue.split('\n').filter(item => item.trim());
    setStepData(prev => ({ ...prev, [currentStep]: items }));
    setInputValue("");
    
    if (currentStep < intentSteps.length) {
      setCurrentStep(currentStep + 1);
    }

    toast({
      title: `Step ${currentStep} confirmed`,
      description: `${items.length} item(s) defined and locked.`
    });
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
    setInputValue(stepData[step]?.join('\n') || "");
  };

  const handleSave = () => {
    toast({
      title: "Project saved",
      description: "Connect to backend to persist changes."
    });
  };

  const isReadyToBuild = Object.keys(stepData).length === intentSteps.length;

  return (
    <Layout showFooter={false}>
      <div className="border-b border-border bg-card">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link to="/projects" className="text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project name"
              className="w-64 h-9 bg-background"
            />
          </div>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Builder Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-heading-sm font-semibold text-foreground">
                Intent Graph Builder
              </h2>
              <span className="text-body-sm text-muted-foreground">
                Step {currentStep} of {intentSteps.length}
              </span>
            </div>

            {/* Intent Steps */}
            <div className="space-y-4">
              {intentSteps.map((step) => (
                <IntentStep
                  key={step.step}
                  step={step.step}
                  title={step.title}
                  description={step.description}
                  status={getStepStatus(step.step)}
                  items={stepData[step.step] || []}
                  onEdit={() => handleEditStep(step.step)}
                  onConfirm={handleConfirmStep}
                />
              ))}
            </div>

            {/* Current Step Input */}
            {currentStep <= intentSteps.length && (
              <div className="mt-6 p-4 rounded-lg border border-primary/30 bg-card animate-fade-in">
                <h3 className="text-body font-medium text-foreground mb-2">
                  {intentSteps[currentStep - 1].title}
                </h3>
                <p className="text-body-sm text-muted-foreground mb-4">
                  {intentSteps[currentStep - 1].description}
                </p>
                <Textarea
                  placeholder={intentSteps[currentStep - 1].placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  rows={4}
                  className="mb-4"
                />
                <div className="flex items-center gap-3">
                  <Button onClick={handleConfirmStep}>
                    Confirm Step {currentStep}
                  </Button>
                  <p className="text-caption text-muted-foreground">
                    Enter one item per line
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Panel */}
            <PreviewPanel 
              projectName={projectName || "Untitled Project"}
              isReady={isReadyToBuild}
              onConfirmBuild={() => {
                toast({
                  title: "Build confirmed",
                  description: "Connect to backend to execute deterministic build."
                });
              }}
            />

            {/* AI Assist Panel */}
            <AIAssistPanel tier="free" />

            {/* Version History */}
            <VersionHistory 
              versions={sampleVersions}
              onRollback={(id) => {
                toast({
                  title: "Rollback initiated",
                  description: `Rolling back to version ${id}. Connect to backend to complete.`
                });
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
