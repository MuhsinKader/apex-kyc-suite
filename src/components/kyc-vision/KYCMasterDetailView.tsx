import { useMemo, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { KYCAddressRecord } from "@/types/kyc";
import { KYCExpandableRow } from "./KYCExpandableRow";
import { getOutcomeType } from "@/utils/kycDataParser";
import { Check, X, Filter } from "lucide-react";
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
      <div className="px-3 py-2 border-b border-border bg-muted/30 flex flex-wrap items-center justify-between gap-2">
        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-muted-foreground" />
          <div className="flex gap-1">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors",
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
                "px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors flex items-center gap-1",
                filter === "matched" 
                  ? "bg-emerald-600 text-white" 
                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 hover:bg-emerald-200"
              )}
            >
              <Check className="w-2.5 h-2.5" />
              Matched ({matchedCount})
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors flex items-center gap-1",
                filter === "rejected" 
                  ? "bg-red-600 text-white" 
                  : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400 hover:bg-red-200"
              )}
            >
              <X className="w-2.5 h-2.5" />
              Rejected ({rejectedCount})
            </button>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-muted-foreground">Sort:</span>
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
                  "px-1.5 py-0.5 rounded text-[9px] font-medium transition-colors",
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

      {/* Column Headers - Aligned with Row Grid */}
      <div className="grid grid-cols-[32px_1fr_60px_90px_50px_50px] gap-2 px-2 py-1.5 bg-muted/20 border-b border-border text-[9px] font-bold text-muted-foreground uppercase tracking-wide">
        <div className="text-center">#</div>
        <div>Bureau Address</div>
        <div className="text-center">Score</div>
        <div className="text-center">V2 Status</div>
        <div className="text-center">V3</div>
        <div className="text-center">Match</div>
      </div>

      {/* Scrollable Table Body */}
      <ScrollArea className="h-[calc(100vh-400px)] min-h-[280px]">
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
          <div className="py-8 text-center text-muted-foreground">
            <p className="text-xs">No records match the current filter.</p>
          </div>
        )}
      </ScrollArea>

      {/* Footer Summary */}
      <div className="px-3 py-1.5 border-t border-border bg-muted/20 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>
          Showing {processedRecords.length} of {records.length} bureau comparisons
        </span>
        <span>
          Click row to expand V2/V3 comparison
        </span>
      </div>
    </div>
  );
};
