import { KYCAddressRecord } from "@/types/kyc";
import { getAddressComponents, parseErrorList, getScoreColor } from "@/utils/kycDataParser";
import { MatchScoreBadge } from "./MatchScoreBadge";
import { Check, X, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AddressComparisonCardProps {
  record: KYCAddressRecord;
  index: number;
}

export const AddressComparisonCard = ({ record, index }: AddressComparisonCardProps) => {
  const components = getAddressComponents(record);
  const errors = parseErrorList(record.ErrorList);
  const isMatched = record.RecordMatchResult.toLowerCase().includes("matched on");

  return (
    <Card className="border border-border/50 bg-card/80 backdrop-blur-sm shadow-md overflow-hidden">
      {/* Header with Score and Match Result */}
      <CardHeader className="pb-3 pt-4 px-5 bg-gradient-to-r from-muted/40 to-muted/20">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <MatchScoreBadge score={record.Overall_Match_Score} size="md" />
            <div>
              <CardTitle className="text-base font-bold text-foreground">
                Record #{index + 1}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                ID: {record.KYCIndividualMatchLog_Version2_id}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1.5">
            <Badge
              variant={isMatched ? "default" : "destructive"}
              className={`${isMatched ? "bg-emerald-600 hover:bg-emerald-700" : ""} font-semibold text-xs px-3 py-1`}
            >
              {isMatched ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
              {record.RecordMatchResult}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        {/* Full Address Comparison - Side by Side */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wide">Input Address</h4>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm font-medium text-foreground leading-relaxed">
                {record.Input_Original_Full_Address || "—"}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-accent uppercase tracking-wide">Bureau Address</h4>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
              <p className="text-sm font-medium text-foreground leading-relaxed">
                {record.Bureau_Original_Full_Address || "—"}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Component Breakdown Table */}
        <div>
          <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">
            Address Component Breakdown
          </h4>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold text-xs w-[140px]">Component</TableHead>
                  <TableHead className="font-bold text-xs">Input Value</TableHead>
                  <TableHead className="font-bold text-xs">Bureau Value</TableHead>
                  <TableHead className="font-bold text-xs text-center w-[80px]">Match</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {components.map((comp, idx) => (
                  <TableRow key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <TableCell className="font-semibold text-xs text-muted-foreground">
                      {comp.label}
                    </TableCell>
                    <TableCell className="text-sm font-mono">
                      {comp.inputValue || <span className="text-muted-foreground/50 italic">empty</span>}
                    </TableCell>
                    <TableCell className="text-sm font-mono">
                      {comp.bureauValue || <span className="text-muted-foreground/50 italic">empty</span>}
                    </TableCell>
                    <TableCell className="text-center">
                      {comp.isMatch ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                          <Check className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600">
                          <X className="w-4 h-4" />
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Error/Reason List */}
        {errors.length > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Match Issues
              </h4>
              <div className="flex flex-wrap gap-2">
                {errors.map((error, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs font-medium border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
                  >
                    {error}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
