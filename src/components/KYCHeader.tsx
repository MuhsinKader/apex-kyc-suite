import { Building2, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const KYCHeader = () => {
  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">CPB</h1>
                <p className="text-xs text-muted-foreground">Consumer Profile Bureau</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <span className="text-sm font-medium text-muted-foreground">Subscriber:</span>
              <span className="text-sm font-semibold text-foreground">Consumer Profile Bureau (5001)</span>
            </div>
            
            <Button variant="ghost" size="sm" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Help</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">MUHSIN KADER</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
