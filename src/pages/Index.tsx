import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Layers, 
  Lock, 
  Eye, 
  History, 
  Sparkles,
  ChevronRight,
  Check
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Intent Graph Builder",
    description: "Define your product in plain language. Users, roles, actions, data, and rules—confirmed step by step."
  },
  {
    icon: Lock,
    title: "Deterministic Execution",
    description: "Builds strictly from confirmed intent. No auto-added pages, fields, or content."
  },
  {
    icon: Shield,
    title: "AI Guard Rails",
    description: "Optional, scoped AI assistance. No AI-generated structure or logic. Transparency by default."
  },
  {
    icon: Eye,
    title: "Preview Before Build",
    description: "Human-readable preview of UI, data model, and workflows. Build only after explicit confirmation."
  },
  {
    icon: History,
    title: "Version Control",
    description: "Simple version history with human-readable labels. One-click rollback when needed."
  },
  {
    icon: Sparkles,
    title: "Tier Awareness",
    description: "Free tier with limited AI, deterministic only. Plus and Enterprise for extended capabilities."
  }
];

const principles = [
  "If you didn't define it, it won't be built",
  "No placeholders, no inferred features",
  "AI assists, never decides",
  "Every build requires explicit confirmation"
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6">
              Enterprise-ready product building
            </Badge>
            <h1 className="text-display-lg md:text-[4rem] font-semibold text-foreground mb-6">
              Build products with
              <span className="text-primary block">zero hallucinations</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Dragon Fruit is a precision-first product builder. Define your intent clearly, 
              confirm every step, and deploy reliably. No guesswork, no surprises.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth?mode=signup">
                <Button size="xl">
                  Start building
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" size="xl">
                  Read documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Principles Section */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <p className="text-body-sm text-foreground font-medium">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="text-display font-semibold text-foreground mb-4">
            Built for trust and predictability
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Every feature is designed to give you complete control over what gets built.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary mb-4">
                <feature.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-heading-sm font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-body-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container py-20 md:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-heading-lg font-semibold text-foreground mb-4">
              Ready to build with precision?
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Start defining your product intent today. No credit card required for free tier.
            </p>
            <Link to="/auth?mode=signup">
              <Button size="xl">
                Get started for free
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
