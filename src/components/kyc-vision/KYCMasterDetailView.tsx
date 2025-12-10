import { useMemo, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { KYCAddressRecord } from "@/types/kyc";
import { KYCExpandableRow } from "./KYCExpandableRow";
import { getOutcomeType } from "@/utils/kycDataParser";
import { Check, X, Minus, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface KYCMasterDetailViewProps {
  records: KYCAddressRecord[];
}

type FilterType = "all" | "matched" | "rejected";
type SortType = "score-desc" | "score-asc" | "match-first";

export const KYCMasterDetailView = ({ records }: KYCMasterDetailViewProps) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("match-first");
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  // Filter and sort records
  const processedRecords = useMemo(() => {
    let filtered = [...records];

    // Apply filter
    if (filter === "matched") {
      filtered = filtered.filter(r => getOutcomeType(r.RecordMatchResult) === "pass");
    } else if (filter === "rejected") {
      filtered = filtered.filter(r => getOutcomeType(r.RecordMatchResult) === "fail");
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sort) {
        case "score-desc":
          return b.Overall_Match_Score - a.Overall_Match_Score;
        case "score-asc":
          return a.Overall_Match_Score - b.Overall_Match_Score;
        case "match-first":
          const aMatched = getOutcomeType(a.RecordMatchResult) === "pass" ? 1 : 0;
          const bMatched = getOutcomeType(b.RecordMatchResult) === "pass" ? 1 : 0;
          if (bMatched !== aMatched) return bMatched - aMatched;
          return b.Overall_Match_Score - a.Overall_Match_Score;
        default:
          return 0;
      }
    });

    return filtered;
  }, [records, filter, sort]);

  const matchedCount = records.filter(r => getOutcomeType(r.RecordMatchResult) === "pass").length;
  const rejectedCount = records.filter(r => getOutcomeType(r.RecordMatchResult) === "fail").length;

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      {/* Table Header with Filters */}
      <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex flex-wrap items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-muted-foreground" />
          <div className="flex gap-1">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors",
                filter === "all" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              All ({records.length})
            </button>
            <button
              onClick={() => setFilter("matched")}
              className={cn(
                "px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors flex items-center gap-1",
                filter === "matched" 
                  ? "bg-emerald-600 text-white" 
                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-950/70"
              )}
            >
              <Check className="w-3 h-3" />
              Matched ({matchedCount})
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={cn(
                "px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors flex items-center gap-1",
                filter === "rejected" 
                  ? "bg-red-600 text-white" 
                  : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-950/70"
              )}
            >
              <X className="w-3 h-3" />
              Rejected ({rejectedCount})
            </button>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">Sort:</span>
          <div className="flex gap-1">
            {[
              { key: "match-first", label: "Match First" },
              { key: "score-desc", label: "Score ↓" },
              { key: "score-asc", label: "Score ↑" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSort(key as SortType)}
                className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-medium transition-colors",
                  sort === key 
                    ? "bg-primary/10 text-primary border border-primary/30" 
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-[40px_1fr_70px_100px_60px_60px] gap-2 px-3 py-2 bg-muted/20 border-b border-border text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
        <div className="text-center">#</div>
        <div>Bureau Address</div>
        <div className="text-center">Score</div>
        <div className="text-center">V2 Status</div>
        <div className="text-center">V3</div>
        <div className="text-center hidden md:block">Match</div>
      </div>

      {/* Scrollable Table Body */}
      <ScrollArea className="h-[calc(100vh-380px)] min-h-[300px]">
        <Accordion 
          type="multiple" 
          value={expandedRows}
          onValueChange={setExpandedRows}
          className="divide-y divide-border/50"
        >
          {processedRecords.map((record, index) => (
            <KYCExpandableRow 
              key={`${record.GUID}-${index}`}
              record={record}
              index={index}
            />
          ))}
        </Accordion>

        {processedRecords.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <p className="text-sm">No records match the current filter.</p>
          </div>
        )}
      </ScrollArea>

      {/* Footer Summary */}
      <div className="px-4 py-2 border-t border-border bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Showing {processedRecords.length} of {records.length} bureau address comparisons
        </span>
        <span className="text-[10px]">
          Click any row to expand component-level comparison
        </span>
      </div>
    </div>
  );
};