import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { KYCAddressRecord } from "@/types/kyc";
import { getAddressComponents, parseErrorList, getOutcomeType, getOutcomeColor } from "@/utils/kycDataParser";
import { MatchScoreBadge } from "@/components/MatchScoreBadge";
import { Check, X, AlertTriangle } from "lucide-react";
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
  bestRecord: KYCAddressRecord;
}

export const KYCV2Panel = ({ records, bestRecord }: KYCV2PanelProps) => {
  const outcomeType = getOutcomeType(bestRecord.RecordMatchResult);
  const components = getAddressComponents(bestRecord);
  const errors = parseErrorList(bestRecord.ErrorList);

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-background dark:from-blue-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
            KYC V2 — Current Algorithm
          </Badge>
          <span className="text-xs text-muted-foreground">
            {records.length} bureau records
          </span>
        </div>

        <div className="flex items-center gap-4 mt-3">
          <MatchScoreBadge score={bestRecord.Overall_Match_Score} size="lg" />
          <div>
            <Badge className={getOutcomeColor(outcomeType)}>
              {outcomeType === "pass" ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
              {bestRecord.RecordMatchResult}
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">
              Best match from {records.length} candidates
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Original Addresses */}
        <div className="grid grid-cols-1 gap-3">
          <div>
            <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1.5">
              Input Address
            </h4>
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm font-medium text-foreground leading-relaxed">
                {bestRecord.Input_Original_Full_Address || "—"}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-1.5">
              Bureau Address
            </h4>
            <div className="p-2.5 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
              <p className="text-sm font-medium text-foreground leading-relaxed">
                {bestRecord.Bureau_Original_Full_Address || "—"}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Component Breakdown */}
        <div>
          <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">
            Component Breakdown
          </h4>
          <ScrollArea className="h-[200px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold text-[10px] w-[100px]">Component</TableHead>
                  <TableHead className="font-bold text-[10px]">Input</TableHead>
                  <TableHead className="font-bold text-[10px]">Bureau</TableHead>
                  <TableHead className="font-bold text-[10px] text-center w-[50px]">Match</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {components.map((comp, idx) => (
                  <TableRow key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <TableCell className="font-semibold text-[10px] text-muted-foreground py-1.5">
                      {comp.label}
                    </TableCell>
                    <TableCell className="text-[11px] font-mono py-1.5">
                      {comp.inputValue || <span className="text-muted-foreground/50 italic">—</span>}
                    </TableCell>
                    <TableCell className="text-[11px] font-mono py-1.5">
                      {comp.bureauValue || <span className="text-muted-foreground/50 italic">—</span>}
                    </TableCell>
                    <TableCell className="text-center py-1.5">
                      {comp.isMatch ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                          <Check className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600">
                          <X className="w-3 h-3" />
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
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Match Issues
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {errors.slice(0, 5).map((error, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-[10px] font-medium border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
                  >
                    {error}
                  </Badge>
                ))}
                {errors.length > 5 && (
                  <Badge variant="outline" className="text-[10px]">
                    +{errors.length - 5} more
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
