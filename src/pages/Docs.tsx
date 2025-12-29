import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Layers, 
  Shield, 
  Sparkles, 
  Eye, 
  History,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const docSections = [
  {
    icon: Layers,
    title: "Intent Graph Builder",
    description: "Learn how to define your product intent step by step",
    articles: [
      "Defining Users and Roles",
      "Specifying Actions and Permissions",
      "Creating Data Entities",
      "Setting Business Rules"
    ]
  },
  {
    icon: Shield,
    title: "Deterministic Execution",
    description: "Understanding how builds are generated from confirmed intent",
    articles: [
      "How the Engine Works",
      "Confirmation Gates",
      "No Placeholder Guarantee",
      "Build Verification"
    ]
  },
  {
    icon: Sparkles,
    title: "AI Assistance",
    description: "Using AI helpers within guard rails",
    articles: [
      "Enabling AI Assist",
      "Scoped Assistance Modes",
      "Transparency Panel",
      "Tier Limitations"
    ]
  },
  {
    icon: Eye,
    title: "Preview & Build",
    description: "Reviewing and confirming before deployment",
    articles: [
      "Reading the Preview",
      "Data Model Validation",
      "Workflow Visualization",
      "Confirm and Build Process"
    ]
  },
  {
    icon: History,
    title: "Version Control",
    description: "Managing changes and rollbacks",
    articles: [
      "Version Labels",
      "Comparing Versions",
      "One-Click Rollback",
      "Version Best Practices"
    ]
  }
];

export default function Docs() {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <Badge variant="outline" className="mb-4">Documentation</Badge>
          <h1 className="text-display font-semibold text-foreground mb-4">
            Learn Dragon Fruit
          </h1>
          <p className="text-body-lg text-muted-foreground">
            Comprehensive guides for building products with precision. 
            No guesswork, just clear documentation.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-12 border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-heading-sm">Quick Start Guide</CardTitle>
                <CardDescription>Get up and running in 5 minutes</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-caption font-medium">1</span>
                <span className="text-body-sm text-foreground">Create a new project and give it a clear name</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-caption font-medium">2</span>
                <span className="text-body-sm text-foreground">Define your users and their roles</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-caption font-medium">3</span>
                <span className="text-body-sm text-foreground">Specify what actions each role can perform</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-caption font-medium">4</span>
                <span className="text-body-sm text-foreground">Define your data entities and relationships</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-caption font-medium">5</span>
                <span className="text-body-sm text-foreground">Set business rules, review the preview, and confirm build</span>
              </li>
            </ol>
            <Link 
              to="/builder/new" 
              className="inline-flex items-center gap-1 mt-6 text-body-sm font-medium text-primary hover:underline"
            >
              Start your first project
              <ChevronRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docSections.map((section, index) => (
            <Card key={index} className="group hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary mb-3">
                  <section.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="text-heading-sm">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.articles.map((article, i) => (
                    <li key={i}>
                      <a 
                        href="#" 
                        className="flex items-center gap-2 text-body-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Reference */}
        <div className="mt-12 p-6 rounded-xl border border-border bg-secondary/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-heading-sm font-semibold text-foreground">API Reference</h3>
              <p className="text-body-sm text-muted-foreground mt-1">
                Technical documentation for advanced integrations
              </p>
            </div>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-body-sm font-medium text-primary hover:underline"
            >
              View API docs
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
