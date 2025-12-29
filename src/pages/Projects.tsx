import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, FolderOpen } from "lucide-react";
import { useState } from "react";

// Placeholder data - would come from database
const allProjects = [
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
  {
    id: "4",
    name: "Employee Directory",
    description: "Internal employee lookup with department structure",
    status: "deployed" as const,
    lastModified: "1 week ago",
    entities: 2,
    roles: 2,
  },
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProjects = allProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout showFooter={false}>
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-heading-lg font-semibold text-foreground">Projects</h1>
            <p className="text-body-sm text-muted-foreground mt-1">
              All your product definitions in one place
            </p>
          </div>
          <Link to="/builder/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-xl border border-dashed border-border">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-heading-sm font-semibold text-foreground mb-2">
              {searchQuery ? "No matching projects" : "No projects yet"}
            </h3>
            <p className="text-body-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              {searchQuery 
                ? "Try adjusting your search terms" 
                : "Create your first project to start defining your product intent"
              }
            </p>
            {!searchQuery && (
              <Link to="/builder/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create first project
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Results count */}
        {filteredProjects.length > 0 && (
          <p className="text-caption text-muted-foreground mt-4">
            Showing {filteredProjects.length} of {allProjects.length} projects
          </p>
        )}
      </div>
    </Layout>
  );
}
