import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { KYCAddressRecord } from "@/types/kyc";
import { KYCV3Record, KYCCanonicalLines, KYCAddressValidity } from "@/types/kycV3";
import { MatchScoreBadge } from "@/components/MatchScoreBadge";
import { Check, X, AlertTriangle, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface KYCV3PanelProps {
  v2BestRecord: KYCAddressRecord;
  v3Record?: KYCV3Record;
}

// Generate placeholder V3 data based on V2 for demo purposes
// This will be replaced with real V3 data when available
const generatePlaceholderV3 = (v2Record: KYCAddressRecord): {
  canonical: KYCCanonicalLines;
  validity: KYCAddressValidity;
} => {
  return {
    canonical: {
      Line1: v2Record.Input_Complex_Number && v2Record.Input_Complex_Name 
        ? `${v2Record.Input_Complex_Number} ${v2Record.Input_Complex_Name}`.trim()
        : "",
      Line2: `${v2Record.Input_Street_Number || ""} ${v2Record.Input_Street_Name || ""}`.trim(),
      Line3: v2Record.Input_Suburb || "",
      Line4: v2Record.Input_Town || "",
      Line5: "", // City is often same as Town in SA addresses
      PostalCode: v2Record.Input_Post_Code || v2Record.Input_Line_Post_Code || "",
    },
    validity: {
      Address_Valid: !!(v2Record.Input_Street_Name && v2Record.Input_Street_Number && v2Record.Input_Suburb),
      Valid_Based_On: v2Record.Input_Street_Name && v2Record.Input_Street_Number && v2Record.Input_Suburb
        ? "Rule 2: Street Name + Street Number + Suburb"
        : "N/A",
      Missing_Components: [
        ...(!v2Record.Input_Street_Number ? ["Street Number"] : []),
        ...(!v2Record.Input_Street_Name ? ["Street Name"] : []),
        ...(!v2Record.Input_Suburb ? ["Suburb"] : []),
        ...(!(v2Record.Input_Post_Code || v2Record.Input_Line_Post_Code) ? ["Postal Code"] : []),
      ],
    },
  };
};

export const KYCV3Panel = ({ v2BestRecord, v3Record }: KYCV3PanelProps) => {
  // Use placeholder data if V3 not available
  const placeholder = generatePlaceholderV3(v2BestRecord);
  const canonical = v3Record?.Input_Canonical || placeholder.canonical;
  const validity = v3Record?.Input_Validity || placeholder.validity;

  const canonicalLines = [
    { label: "Line 1 (Complex)", value: canonical.Line1 },
    { label: "Line 2 (Street)", value: canonical.Line2 },
    { label: "Line 3 (Suburb)", value: canonical.Line3 },
    { label: "Line 4 (Town)", value: canonical.Line4 },
    { label: "Line 5 (City)", value: canonical.Line5 },
    { label: "Post Code", value: canonical.PostalCode },
  ];

  return (
    <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50/50 to-background dark:from-emerald-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
            <Sparkles className="w-3 h-3 mr-1" />
            KYC V3 — New Algorithm
          </Badge>
          <span className="text-xs text-muted-foreground">
            {v3Record ? "Live data" : "Placeholder"}
          </span>
        </div>

        {v3Record ? (
          <div className="flex items-center gap-4 mt-3">
            <MatchScoreBadge score={v3Record.Overall_Match_Score} size="lg" />
            <div>
              <Badge className="bg-emerald-600 hover:bg-emerald-700">
                <Check className="w-3 h-3 mr-1" />
                {v3Record.RecordMatchResult}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                V3 algorithm result
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 p-3 bg-muted/50 rounded-lg border border-dashed border-border">
            <p className="text-xs text-muted-foreground text-center">
              V3 data not yet available. Showing computed preview based on V2 input.
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Address Validity Card */}
        <div className={`p-3 rounded-lg border ${
          validity.Address_Valid 
            ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
            : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {validity.Address_Valid ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-sm font-bold ${validity.Address_Valid ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}`}>
              Address {validity.Address_Valid ? "Valid" : "Invalid"}
            </span>
          </div>
          
          {validity.Address_Valid && validity.Valid_Based_On !== "N/A" && (
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mb-2">
              Valid Based On: <span className="font-semibold">{validity.Valid_Based_On}</span>
            </p>
          )}

          {validity.Missing_Components.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <span className="text-xs text-muted-foreground mr-1">Missing:</span>
              {validity.Missing_Components.map((comp, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-[10px] bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700"
                >
                  {comp}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Canonical Lines */}
        <div>
          <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">
            Canonical Address Lines
          </h4>
          <ScrollArea className="h-[200px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold text-[10px] w-[120px]">Line</TableHead>
                  <TableHead className="font-bold text-[10px]">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {canonicalLines.map((line, idx) => (
                  <TableRow key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <TableCell className="font-semibold text-[10px] text-muted-foreground py-1.5">
                      {line.label}
                    </TableCell>
                    <TableCell className="text-[11px] font-mono py-1.5">
                      {line.value || <span className="text-muted-foreground/50 italic">—</span>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* V3 improvements preview */}
        <Separator />
        <div className="p-3 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
          <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            V3 Improvements
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Street type normalization (RD → ROAD, ST → STREET)</li>
            <li>• 6 validity rules based on component combinations</li>
            <li>• Smart component extraction from free-text addresses</li>
            <li>• Missing component detection</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
