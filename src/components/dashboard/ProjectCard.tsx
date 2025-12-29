import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Clock, Users, Database } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  status: "draft" | "in-progress" | "deployed";
  lastModified: string;
  entities: number;
  roles: number;
}

const statusConfig = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  "in-progress": { label: "In Progress", className: "bg-warning/10 text-warning-foreground border-warning/30" },
  deployed: { label: "Deployed", className: "bg-success/10 text-success border-success/30" },
};

export function ProjectCard({
  id,
  name,
  description,
  status,
  lastModified,
  entities,
  roles,
}: ProjectCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <Card className="group hover:border-primary/30 transition-colors">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1.5">
          <Link 
            to={`/builder/${id}`}
            className="text-heading-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            {name}
          </Link>
          <p className="text-body-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
        <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-caption text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{lastModified}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5" />
              <span>{entities} entities</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span>{roles} roles</span>
            </div>
          </div>
          <Badge variant="outline" className={statusInfo.className}>
            {statusInfo.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
