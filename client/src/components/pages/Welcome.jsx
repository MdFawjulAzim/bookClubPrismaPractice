import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Welcome() {
  const features = [
    {
      title: "Modern Tech Stack",
      description: "React + Vite + shadcn/ui for fast, scalable development",
      badge: "Ready"
    },
    {
      title: "Redux Toolkit",
      description: "State management with RTK Query for efficient data fetching",
      badge: "Configured"
    },
    {
      title: "Responsive Design",
      description: "Mobile-first approach with Tailwind CSS utilities",
      badge: "Optimized"
    },
    {
      title: "Development Ready",
      description: "ESLint, structured folders, and development standards",
      badge: "Active"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block">
            <Badge variant="outline" className="mb-4 text-sm font-medium">
              Frontend Template v1.0
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Omega Solution
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Professional Frontend Development Template
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            A standardized React + Vite + shadcn/ui setup designed for scalable, 
            maintainable web applications with modern development practices.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="text-base px-8">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="text-base px-8">
            View Documentation
          </Button>
        </div>

        <Separator className="mb-16" />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card text-card-foreground">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Stack Section */}
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
              Built With Industry Standards
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Leveraging proven technologies and best practices for enterprise-grade applications
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              "React", "Vite", "shadcn/ui", "Tailwind CSS", 
              "Redux Toolkit", "React Router", "Yarn", "ESLint"
            ].map((tech, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <span className="text-sm font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Call to Action */}
        <div className="mt-20 text-center">
          <Card className="max-w-2xl mx-auto border-border bg-card">
            <CardHeader>
              <CardTitle className="text-xl">Ready to Build Something Amazing?</CardTitle>
              <CardDescription>
                Start developing with our pre-configured environment and focus on what matters most - your application logic.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="text-sm">
                  Start Development
                </Button>
                <Button variant="outline" className="text-sm">
                  Explore Components
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

