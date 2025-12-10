import { MapPin, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputAddressHeroCardProps {
  inputAddress: string;
  totalBureauRecords: number;
  matchedCount: number;
  bestScore: number;
}

export const InputAddressHeroCard = ({
  inputAddress,
  totalBureauRecords,
  matchedCount,
  bestScore,
}: InputAddressHeroCardProps) => {
  const rejectedCount = totalBureauRecords - matchedCount;

  return (
    <div className="relative">
      {/* Outer glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-primary-glow to-accent rounded-2xl blur-sm opacity-30" />
      
      {/* Main Card */}
      <div className="relative bg-card border-2 border-primary/20 rounded-2xl shadow-xl overflow-hidden">
        {/* Gradient accent bar at top */}
        <div className="h-1 bg-gradient-to-r from-primary via-primary-glow to-accent" />
        
        <div className="p-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Input Address Section */}
            <div className="flex-1 min-w-0">
              {/* Label */}
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                  <MapPin className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                  Input Address
                </span>
              </div>
              
              {/* Address Text - Hero Style */}
              <div className="relative pl-1">
                <p className="text-lg font-bold text-foreground leading-snug tracking-tight">
                  {inputAddress}
                </p>
                {/* Subtle underline accent */}
                <div className="mt-2 h-0.5 w-24 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px h-20 bg-gradient-to-b from-transparent via-border to-transparent" />

            {/* Stats Section */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Bureau Checks */}
              <div className="text-center px-4 py-2.5 rounded-xl bg-muted/50 border border-border">
                <p className="text-2xl font-black text-foreground">{totalBureauRecords}</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wide font-semibold">Bureau</p>
              </div>

              {/* Matched */}
              <div className="text-center px-4 py-2.5 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/30 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                <div className="flex items-center gap-1.5 justify-center">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <p className="text-2xl font-black text-emerald-600">{matchedCount}</p>
                </div>
                <p className="text-[9px] text-emerald-700 dark:text-emerald-400 uppercase tracking-wide font-semibold">Matched</p>
              </div>

              {/* Rejected */}
              <div className="text-center px-4 py-2.5 rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/30 border border-red-200 dark:border-red-800 shadow-sm">
                <div className="flex items-center gap-1.5 justify-center">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <p className="text-2xl font-black text-red-600">{rejectedCount}</p>
                </div>
                <p className="text-[9px] text-red-700 dark:text-red-400 uppercase tracking-wide font-semibold">Rejected</p>
              </div>

              {/* Best Score */}
              <div className={cn(
                "text-center px-4 py-2.5 rounded-xl border shadow-sm",
                bestScore >= 90 
                  ? "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/30 border-emerald-200 dark:border-emerald-800" 
                  : bestScore >= 70 
                    ? "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/30 border-amber-200 dark:border-amber-800"
                    : "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/30 border-red-200 dark:border-red-800"
              )}>
                <div className="flex items-center gap-1.5 justify-center">
                  <TrendingUp className={cn(
                    "w-4 h-4",
                    bestScore >= 90 ? "text-emerald-600" : bestScore >= 70 ? "text-amber-600" : "text-red-600"
                  )} />
                  <p className={cn(
                    "text-2xl font-black",
                    bestScore >= 90 ? "text-emerald-600" : bestScore >= 70 ? "text-amber-600" : "text-red-600"
                  )}>{bestScore}</p>
                </div>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wide font-semibold">Best Score</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
