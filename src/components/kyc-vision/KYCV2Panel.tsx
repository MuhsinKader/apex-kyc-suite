import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { KYCAddressRecord } from "@/types/kyc";
import { getAddressComponents, parseErrorList, getOutcomeType, getOutcomeColor } from "@/utils/kycDataParser";
import { MatchScoreBadge } from "@/components/MatchScoreBadge";
import { BureauComparisonTable } from "./BureauComparisonTable";
import { Check, X, AlertTriangle, MapPin, Building2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface KYCV2PanelProps {
  records: KYCAddressRecord[];
}

export const KYCV2Panel = ({ records }: KYCV2PanelProps) => {
  // Find the best record initially
  const sortedRecords = [...records].sort((a, b) => {
    const aMatched = a.RecordMatchResult.toLowerCase().includes("matched on");
    const bMatched = b.RecordMatchResult.toLowerCase().includes("matched on");
    if (aMatched && !bMatched) return -1;
    if (!aMatched && bMatched) return 1;
    return b.Overall_Match_Score - a.Overall_Match_Score;
  });

  const [selectedRecordIndex, setSelectedRecordIndex] = useState<number>(
    records.indexOf(sortedRecords[0]) ?? 0
  );

  const selectedRecord = records[selectedRecordIndex] ?? records[0];
  const inputAddress = records[0]?.Input_Original_Full_Address || "—";

  if (!selectedRecord) {
    return (
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardContent className="p-8 text-center text-muted-foreground">
          No records available
        </CardContent>
      </Card>
    );
  }

  const outcomeType = getOutcomeType(selectedRecord.RecordMatchResult);
  const components = getAddressComponents(selectedRecord);
  const errors = parseErrorList(selectedRecord.ErrorList);

  const matchedCount = records.filter(r => 
    r.RecordMatchResult.toLowerCase().includes("matched on")
  ).length;

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-background dark:from-blue-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
            KYC V2 — Current Algorithm
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="font-semibold text-emerald-600">{matchedCount}</span>
            <span>/</span>
            <span>{records.length} matched</span>
          </div>
        </div>

        {/* Input Address - THE transaction address being verified */}
        <div className="mt-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              Input Address (Being Verified)
            </h4>
          </div>
          <div className="p-3 bg-blue-100/50 dark:bg-blue-950/40 border-2 border-blue-300 dark:border-blue-700 rounded-lg">
            <p className="text-sm font-semibold text-foreground leading-relaxed">
              {inputAddress}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <Separator />

        {/* Bureau Address Comparison Table */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Building2 className="w-3.5 h-3.5 text-purple-600" />
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
              Bureau Address Comparisons
            </h4>
          </div>
          <BureauComparisonTable
            records={records}
            selectedRecordIndex={selectedRecordIndex}
            onSelectRecord={setSelectedRecordIndex}
          />
        </div>

        <Separator />

        {/* Selected Bureau Record Details */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
              Selected Bureau Details
            </h4>
            <div className="flex items-center gap-2">
              <MatchScoreBadge score={selectedRecord.Overall_Match_Score} size="sm" />
              <Badge className={getOutcomeColor(outcomeType) + " text-[10px]"}>
                {outcomeType === "pass" ? <Check className="w-2.5 h-2.5 mr-1" /> : <X className="w-2.5 h-2.5 mr-1" />}
                {selectedRecord.RecordMatchResult}
              </Badge>
            </div>
          </div>

          {/* Bureau address for selected record */}
          <div className="p-2.5 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg mb-3">
            <p className="text-xs font-medium text-foreground leading-relaxed">
              {selectedRecord.Bureau_Original_Full_Address || "—"}
            </p>
          </div>

          {/* Component Breakdown */}
          <ScrollArea className="h-[160px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold text-[10px] w-[90px]">Component</TableHead>
                  <TableHead className="font-bold text-[10px]">Input</TableHead>
                  <TableHead className="font-bold text-[10px]">Bureau</TableHead>
                  <TableHead className="font-bold text-[10px] text-center w-[40px]">Match</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {components.map((comp, idx) => (
                  <TableRow key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <TableCell className="font-semibold text-[10px] text-muted-foreground py-1">
                      {comp.label}
                    </TableCell>
                    <TableCell className="text-[10px] font-mono py-1">
                      {comp.inputValue || <span className="text-muted-foreground/50 italic">—</span>}
                    </TableCell>
                    <TableCell className="text-[10px] font-mono py-1">
                      {comp.bureauValue || <span className="text-muted-foreground/50 italic">—</span>}
                    </TableCell>
                    <TableCell className="text-center py-1">
                      {comp.isMatch ? (
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600">
                          <X className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                Match Issues
              </h4>
              <div className="flex flex-wrap gap-1">
                {errors.slice(0, 4).map((error, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-[9px] font-medium border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
                  >
                    {error}
                  </Badge>
                ))}
                {errors.length > 4 && (
                  <Badge variant="outline" className="text-[9px]">
                    +{errors.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
