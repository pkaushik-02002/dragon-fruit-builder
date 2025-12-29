import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { Link } from "react-router-dom";
import { Plus, FolderOpen, Users, Layers, Clock } from "lucide-react";

// Placeholder data - would come from database
const stats = [
  { title: "Total Projects", value: 3, icon: FolderOpen, description: "2 active, 1 draft" },
  { title: "Defined Entities", value: 12, icon: Layers, description: "Across all projects" },
  { title: "Team Members", value: 1, icon: Users, description: "Solo workspace" },
];

const projects = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Order management system with customer and admin roles",
    status: "in-progress" as const,
    lastModified: "2 hours ago",
    entities: 5,
    roles: 2,
  },
  {
    id: "2",
    name: "Support Ticketing",
    description: "Internal support ticket system with agent assignment",
    status: "deployed" as const,
    lastModified: "1 day ago",
    entities: 4,
    roles: 3,
  },
  {
    id: "3",
    name: "Inventory Tracker",
    description: "Simple inventory management for small warehouse",
    status: "draft" as const,
    lastModified: "3 days ago",
    entities: 3,
    roles: 1,
  },
];

export default function Dashboard() {
  return (
    <Layout showFooter={false}>
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-heading-lg font-semibold text-foreground">Dashboard</h1>
            <p className="text-body-sm text-muted-foreground mt-1">
              Manage your product definitions and builds
            </p>
          </div>
          <Link to="/builder/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-heading-sm font-semibold text-foreground">Your Projects</h2>
            <div className="flex items-center gap-2 text-caption text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Sorted by last modified</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>

        {/* Empty State - shown when no projects */}
        {projects.length === 0 && (
          <div className="text-center py-16 px-4 rounded-xl border border-dashed border-border">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-heading-sm font-semibold text-foreground mb-2">
              No projects yet
            </h3>
            <p className="text-body-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              Create your first project to start defining your product intent
            </p>
            <Link to="/builder/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create first project
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
