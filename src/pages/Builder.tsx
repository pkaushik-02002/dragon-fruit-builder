import { useState } from "react";
import { 
  ArrowLeft, 
  RotateCcw, 
  Settings,
  Eye,
  Code,
  History
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatInterface } from "@/components/builder/ChatInterface";
import { RequirementsPanel } from "@/components/builder/RequirementsPanel";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { VersionHistory } from "@/components/builder/VersionHistory";
import { AIAssistPanel } from "@/components/builder/AIAssistPanel";
import { useRequirementsChat } from "@/hooks/useRequirementsChat";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Builder() {
  const [rightPanel, setRightPanel] = useState<'requirements' | 'preview' | 'history'>('requirements');
  const {
    messages,
    requirements,
    isLoading,
    isConfirmed,
    sendMessage,
    updateRequirements,
    confirmRequirements,
    resetChat
  } = useRequirementsChat();

  // Mock versions for demo
  const versions = [
    {
      id: "v3",
      label: "Added checkout flow",
      timestamp: "Just now",
      author: "You",
      isCurrent: true
    },
    {
      id: "v2",
      label: "Initial user roles",
      timestamp: "1 hour ago",
      author: "You"
    },
    {
      id: "v1",
      label: "Project created",
      timestamp: "2 hours ago",
      author: "You"
    }
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold">
                {requirements?.projectName || 'New Project'}
              </h1>
              <p className="text-xs text-muted-foreground">
                AI-Powered Requirement Builder
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={resetChat}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left: Chat Interface */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="h-full flex flex-col border-r border-border">
              <div className="p-3 border-b border-border bg-muted/30">
                <h2 className="text-sm font-medium">Describe Your Application</h2>
                <p className="text-xs text-muted-foreground">
                  AI will extract structured requirements from your description
                </p>
              </div>
              <ChatInterface 
                messages={messages}
                isLoading={isLoading}
                onSendMessage={sendMessage}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right: Requirements/Preview/History */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="h-full flex flex-col">
              <div className="border-b border-border p-2">
                <Tabs value={rightPanel} onValueChange={(v) => setRightPanel(v as typeof rightPanel)}>
                  <TabsList className="grid grid-cols-3 w-full max-w-md">
                    <TabsTrigger value="requirements" className="text-xs">
                      <Code className="h-3 w-3 mr-1" />
                      Requirements
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="history" className="text-xs">
                      <History className="h-3 w-3 mr-1" />
                      History
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex-1 overflow-hidden">
                {rightPanel === 'requirements' && (
                  <RequirementsPanel
                    requirements={requirements}
                    onUpdate={updateRequirements}
                    onConfirm={confirmRequirements}
                    isConfirmed={isConfirmed}
                  />
                )}

                {rightPanel === 'preview' && (
                  <PreviewPanel
                    uiStructure={requirements?.pages.map(p => ({
                      name: p.name,
                      components: p.components
                    })) || []}
                    dataModel={requirements?.dataModels.map(m => ({
                      entity: m.name,
                      fields: m.fields.map(f => `${f.name}: ${f.type}${f.required ? ' (required)' : ''}`)
                    })) || []}
                    workflows={requirements?.workflows.map(w => ({
                      name: w.name,
                      steps: w.steps
                    })) || []}
                    isReady={isConfirmed}
                  />
                )}

                {rightPanel === 'history' && (
                  <div className="p-4">
                    <VersionHistory
                      versions={versions}
                      onRollback={(id) => console.log('Rollback to', id)}
                    />
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* AI Assist Panel (floating) */}
      <div className="absolute bottom-4 right-4 w-80">
        <AIAssistPanel tier="free" />
      </div>
    </div>
  );
}
