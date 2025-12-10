import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TransactionComparison } from "@/types/kycV3";
import { getOutcomeType, getOutcomeColor } from "@/utils/kycDataParser";
import { Check, X, Minus, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KYCTransactionListProps {
  transactions: TransactionComparison[];
  selectedGUID: string | null;
  onSelectGUID: (guid: string) => void;
  sortBy: "guid" | "v2Score" | "v3Score" | "delta";
  onSortChange: (sort: "guid" | "v2Score" | "v3Score" | "delta") => void;
}

export const KYCTransactionList = ({
  transactions,
  selectedGUID,
  onSelectGUID,
  sortBy,
  onSortChange,
}: KYCTransactionListProps) => {
  const sortedTransactions = [...transactions].sort((a, b) => {
    switch (sortBy) {
      case "guid":
        return a.guid.localeCompare(b.guid);
      case "v2Score":
        return b.v2BestScore - a.v2BestScore;
      case "v3Score":
        return (b.v3Score ?? 0) - (a.v3Score ?? 0);
      case "delta":
        return (b.scoreDelta ?? 0) - (a.scoreDelta ?? 0);
      default:
        return 0;
    }
  });

  const getOutcomeIcon = (outcome: string) => {
    const type = getOutcomeType(outcome);
    if (type === "pass") return <Check className="w-3 h-3 text-emerald-600" />;
    if (type === "caution") return <Minus className="w-3 h-3 text-amber-600" />;
    return <X className="w-3 h-3 text-red-600" />;
  };

  return (
    <div className="space-y-3">
      {/* Sort controls */}
      <div className="flex flex-wrap gap-1.5">
        <span className="text-xs text-muted-foreground mr-1">Sort by:</span>
        {[
          { key: "guid", label: "GUID" },
          { key: "v2Score", label: "V2" },
          { key: "v3Score", label: "V3" },
          { key: "delta", label: "Δ" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onSortChange(key as typeof sortBy)}
            className={cn(
              "text-xs px-2 py-0.5 rounded border transition-colors",
              sortBy === key
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-1.5 pr-2">
          {sortedTransactions.map((tx) => (
            <button
              key={tx.guid}
              onClick={() => onSelectGUID(tx.guid)}
              className={cn(
                "w-full p-2.5 rounded-lg border text-left transition-all",
                selectedGUID === tx.guid
                  ? "bg-primary/10 border-primary/50 shadow-sm"
                  : "bg-card border-border/50 hover:bg-muted/50 hover:border-border"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-mono text-foreground truncate">
                    {tx.guid.slice(0, 8)}...
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {tx.v2RecordCount} records
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* V2 Score */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">V2:</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] px-1.5 py-0",
                        getOutcomeColor(getOutcomeType(tx.v2BestOutcome))
                      )}
                    >
                      {tx.v2BestScore}
                    </Badge>
                    {getOutcomeIcon(tx.v2BestOutcome)}
                  </div>

                  {/* V3 Score (if available) */}
                  {tx.v3Score !== undefined && (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-muted-foreground">V3:</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] px-1.5 py-0",
                          tx.v3Outcome && getOutcomeColor(getOutcomeType(tx.v3Outcome))
                        )}
                      >
                        {tx.v3Score}
                      </Badge>
                    </div>
                  )}

                  {/* Delta */}
                  {tx.scoreDelta !== undefined && (
                    <div className="flex items-center gap-0.5">
                      {tx.scoreDelta > 0 ? (
                        <TrendingUp className="w-3 h-3 text-emerald-600" />
                      ) : tx.scoreDelta < 0 ? (
                        <TrendingDown className="w-3 h-3 text-red-600" />
                      ) : (
                        <Minus className="w-3 h-3 text-muted-foreground" />
                      )}
                      <span
                        className={cn(
                          "text-[10px] font-semibold",
                          tx.scoreDelta > 0 && "text-emerald-600",
                          tx.scoreDelta < 0 && "text-red-600",
                          tx.scoreDelta === 0 && "text-muted-foreground"
                        )}
                      >
                        {tx.scoreDelta > 0 ? `+${tx.scoreDelta}` : tx.scoreDelta}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
