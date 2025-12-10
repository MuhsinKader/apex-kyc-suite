import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, ArrowRight, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface KYCDeltaSpineProps {
  v2Score: number;
  v3Score?: number;
  v2Outcome: string;
  v3Outcome?: string;
  v2Valid: boolean;
  v3Valid: boolean;
}

export const KYCDeltaSpine = ({
  v2Score,
  v3Score,
  v2Outcome,
  v3Outcome,
  v2Valid,
  v3Valid,
}: KYCDeltaSpineProps) => {
  const scoreDelta = v3Score !== undefined ? v3Score - v2Score : undefined;
  
  const getOutcomeLabel = (outcome: string) => {
    if (outcome.toLowerCase().includes("matched on exact") || outcome.toLowerCase().includes("matched on rules")) {
      return "Pass";
    }
    if (outcome.toLowerCase().includes("matched on fuzzy")) {
      return "Partial";
    }
    return "Fail";
  };

  const v2OutcomeLabel = getOutcomeLabel(v2Outcome);
  const v3OutcomeLabel = v3Outcome ? getOutcomeLabel(v3Outcome) : v2OutcomeLabel;
  const outcomeChanged = v2OutcomeLabel !== v3OutcomeLabel;
  const validityChanged = v2Valid !== v3Valid;

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4 px-2 min-w-[80px]">
      {/* Score Delta */}
      <div className="text-center">
        <p className="text-[10px] text-muted-foreground uppercase font-semibold mb-1">Score Δ</p>
        {scoreDelta !== undefined ? (
          <Badge
            className={cn(
              "text-sm font-bold px-2 py-1",
              scoreDelta > 0 && "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-400",
              scoreDelta < 0 && "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400",
              scoreDelta === 0 && "bg-muted text-muted-foreground border-border"
            )}
            variant="outline"
          >
            <span className="flex items-center gap-1">
              {scoreDelta > 0 && <TrendingUp className="w-3.5 h-3.5" />}
              {scoreDelta < 0 && <TrendingDown className="w-3.5 h-3.5" />}
              {scoreDelta === 0 && <Minus className="w-3.5 h-3.5" />}
              {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta}
            </span>
          </Badge>
        ) : (
          <Badge variant="outline" className="text-xs text-muted-foreground">
            N/A
          </Badge>
        )}
      </div>

      {/* Vertical connector line */}
      <div className="w-px h-6 bg-border" />

      {/* Outcome Change */}
      <div className="text-center">
        <p className="text-[10px] text-muted-foreground uppercase font-semibold mb-1">Outcome</p>
        <div className="flex flex-col items-center gap-1">
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] px-1.5",
              v2OutcomeLabel === "Pass" && "bg-emerald-100 text-emerald-700 border-emerald-300",
              v2OutcomeLabel === "Partial" && "bg-amber-100 text-amber-700 border-amber-300",
              v2OutcomeLabel === "Fail" && "bg-red-100 text-red-700 border-red-300"
            )}
          >
            {v2OutcomeLabel}
          </Badge>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] px-1.5",
              v3OutcomeLabel === "Pass" && "bg-emerald-100 text-emerald-700 border-emerald-300",
              v3OutcomeLabel === "Partial" && "bg-amber-100 text-amber-700 border-amber-300",
              v3OutcomeLabel === "Fail" && "bg-red-100 text-red-700 border-red-300"
            )}
          >
            {v3OutcomeLabel}
          </Badge>
        </div>
        {outcomeChanged && (
          <p className={cn(
            "text-[9px] font-semibold mt-1",
            v3OutcomeLabel === "Pass" && v2OutcomeLabel !== "Pass" ? "text-emerald-600" : "text-red-600"
          )}>
            {v3OutcomeLabel === "Pass" && v2OutcomeLabel !== "Pass" ? "Improved!" : "Regressed"}
          </p>
        )}
      </div>

      {/* Vertical connector line */}
      <div className="w-px h-6 bg-border" />

      {/* Validity Change */}
      <div className="text-center">
        <p className="text-[10px] text-muted-foreground uppercase font-semibold mb-1">Validity</p>
        <div className="flex flex-col items-center gap-1">
          {v2Valid ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <XCircle className="w-4 h-4 text-red-600" />
          )}
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          {v3Valid ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <XCircle className="w-4 h-4 text-red-600" />
          )}
        </div>
        {validityChanged && (
          <p className={cn(
            "text-[9px] font-semibold mt-1",
            v3Valid && !v2Valid ? "text-emerald-600" : "text-red-600"
          )}>
            {v3Valid && !v2Valid ? "Fixed!" : "Broken"}
          </p>
        )}
      </div>
    </div>
  );
};
