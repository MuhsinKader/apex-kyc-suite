import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { KYCAddressRecord } from "@/types/kyc";
import { getOutcomeType, getOutcomeColor } from "@/utils/kycDataParser";
import { Check, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BureauComparisonTableProps {
  records: KYCAddressRecord[];
  selectedRecordIndex: number | null;
  onSelectRecord: (index: number) => void;
}

export const BureauComparisonTable = ({
  records,
  selectedRecordIndex,
  onSelectRecord,
}: BureauComparisonTableProps) => {
  // Sort records: matched first, then by score descending
  const sortedRecords = [...records]
    .map((record, originalIndex) => ({ record, originalIndex }))
    .sort((a, b) => {
      const aMatched = a.record.RecordMatchResult.toLowerCase().includes("matched on");
      const bMatched = b.record.RecordMatchResult.toLowerCase().includes("matched on");
      if (aMatched && !bMatched) return -1;
      if (!aMatched && bMatched) return 1;
      return b.record.Overall_Match_Score - a.record.Overall_Match_Score;
    });

  const matchedCount = records.filter(r => 
    r.RecordMatchResult.toLowerCase().includes("matched on")
  ).length;

  const getStatusIcon = (record: KYCAddressRecord) => {
    const type = getOutcomeType(record.RecordMatchResult);
    if (type === "pass") {
      return (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
          <Check className="w-3 h-3" />
        </span>
      );
    }
    if (type === "caution") {
      return (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600">
          <AlertTriangle className="w-3 h-3" />
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600">
        <X className="w-3 h-3" />
      </span>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800";
    if (score >= 60) return "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800";
    return "text-red-600 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800";
  };

  return (
    <div className="space-y-2">
      {/* Summary */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{records.length}</span> bureau addresses checked
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300">
            <Check className="w-2.5 h-2.5 mr-1" />
            {matchedCount} matched
          </Badge>
          <Badge variant="outline" className="text-[10px] bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-800 dark:text-red-300">
            <X className="w-2.5 h-2.5 mr-1" />
            {records.length - matchedCount} rejected
          </Badge>
        </div>
      </div>

      {/* Table */}
      <ScrollArea className="h-[280px] border rounded-lg">
        <Table>
          <TableHeader className="sticky top-0 bg-muted/95 backdrop-blur z-10">
            <TableRow>
              <TableHead className="font-bold text-[10px] w-[40px] text-center">#</TableHead>
              <TableHead className="font-bold text-[10px]">Bureau Address</TableHead>
              <TableHead className="font-bold text-[10px] w-[60px] text-center">Score</TableHead>
              <TableHead className="font-bold text-[10px] w-[40px] text-center">Status</TableHead>
              <TableHead className="font-bold text-[10px] w-[180px]">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRecords.map(({ record, originalIndex }, displayIndex) => {
              const isSelected = selectedRecordIndex === originalIndex;
              const outcomeType = getOutcomeType(record.RecordMatchResult);
              
              return (
                <TableRow
                  key={originalIndex}
                  onClick={() => onSelectRecord(originalIndex)}
                  className={cn(
                    "cursor-pointer transition-colors",
                    isSelected
                      ? "bg-primary/10 hover:bg-primary/15"
                      : "hover:bg-muted/50",
                    outcomeType === "pass" && "border-l-2 border-l-emerald-500",
                    outcomeType === "fail" && "border-l-2 border-l-red-300"
                  )}
                >
                  <TableCell className="text-[10px] text-center font-mono text-muted-foreground py-2">
                    {displayIndex + 1}
                  </TableCell>
                  <TableCell className="py-2">
                    <p className="text-[11px] font-medium text-foreground line-clamp-2 leading-tight">
                      {record.Bureau_Original_Full_Address || "—"}
                    </p>
                  </TableCell>
                  <TableCell className="text-center py-2">
                    <Badge 
                      variant="outline" 
                      className={cn("text-[10px] font-bold px-1.5 py-0", getScoreColor(record.Overall_Match_Score))}
                    >
                      {record.Overall_Match_Score}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center py-2">
                    {getStatusIcon(record)}
                  </TableCell>
                  <TableCell className="py-2">
                    <Badge 
                      variant="outline" 
                      className={cn("text-[9px] font-medium", getOutcomeColor(outcomeType))}
                    >
                      {record.RecordMatchResult}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
