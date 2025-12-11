import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { KYCAddressRecord } from "@/types/kyc";
import { getOutcomeType, getAddressComponents, parseErrorList } from "@/utils/kycDataParser";
import { getV3DataForRecord } from "@/utils/kycV3Parser";
import { Check, X, Minus, AlertCircle, AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { V3TokenBreakdownPanel } from "./V3TokenBreakdownPanel";
import { AddressHighlightRibbon } from "./AddressHighlightRibbon";
import { V3RulesCheckTable } from "./V3RulesCheckTable";

interface KYCExpandableRowProps {
  record: KYCAddressRecord;
  index: number;
}

export const KYCExpandableRow = ({ record, index }: KYCExpandableRowProps) => {
  const outcomeType = getOutcomeType(record.RecordMatchResult);
  const components = getAddressComponents(record);
  const errors = parseErrorList(record.ErrorList);
  const hasErrors = errors.length > 0;
  
  // Get V3 data for this record
  const v3Data = getV3DataForRecord(record.KYCIndividualMatchLog_Version2_id, record.IDNumber);
  const hasV3 = !!v3Data;
  
  const getStatusIcon = () => {
    if (outcomeType === "pass") return <Check className="w-3 h-3" />;
    if (outcomeType === "caution") return <Minus className="w-3 h-3" />;
    return <X className="w-3 h-3" />;
  };

  const getStatusStyles = () => {
    if (outcomeType === "pass") return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400";
    if (outcomeType === "caution") return "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400";
    return "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400";
  };

  const getScoreStyles = (score: number) => {
    if (score >= 90) return "bg-emerald-600 text-white";
    if (score >= 70) return "bg-amber-500 text-white";
    return "bg-red-600 text-white";
  };

  const truncateAddress = (addr: string, maxLen: number = 40) => {
    if (!addr) return "—";
    return addr.length > maxLen ? addr.slice(0, maxLen) + "..." : addr;
  };

  return (
    <AccordionItem 
      value={`row-${index}`} 
      className="border-0"
    >
      {/* Collapsed Row - Fixed Column Grid */}
      <AccordionTrigger className="px-2 py-2 hover:no-underline hover:bg-muted/50 transition-colors group data-[state=open]:bg-muted/30">
        <div className="grid grid-cols-[32px_1fr_60px_110px_70px] gap-2 w-full items-center text-left">
          {/* Row Number */}
          <span className="text-[10px] font-mono text-muted-foreground text-center">
            {index + 1}
          </span>

          {/* Bureau Address */}
          <span className="text-xs font-medium text-foreground truncate pr-2" title={record.Bureau_Original_Full_Address}>
            {record.Bureau_Original_Full_Address || "—"}
          </span>

          {/* Score Badge */}
          <div className="flex justify-center">
            <Badge className={cn("text-[10px] px-1.5 py-0 font-bold min-w-[36px] justify-center", getScoreStyles(record.Overall_Match_Score))}>
              {record.Overall_Match_Score}
            </Badge>
          </div>

          {/* V2 Status with Error Indicator */}
          <div className="flex items-center justify-center gap-1">
            <div className={cn(
              "flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium",
              getStatusStyles()
            )}>
              {getStatusIcon()}
              <span className="hidden sm:inline">
                {outcomeType === "pass" ? "Matched" : outcomeType === "caution" ? "Fuzzy" : "Rejected"}
              </span>
            </div>
            
            {/* Error Indicator with Tooltip */}
            {hasErrors && (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950/50 cursor-help">
                      <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
                    <div className="text-xs text-amber-800 dark:text-amber-200">
                      <span className="font-semibold">Match Notes:</span>
                      <ul className="mt-1 space-y-0.5 list-disc list-inside">
                        {errors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {/* V3 Status */}
          <div className="flex justify-center">
            {hasV3 ? (
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <Sparkles className="w-2.5 h-2.5" />
                <span>V3</span>
              </div>
            ) : (
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted/50 text-muted-foreground">
                <span>V3</span>
                <Minus className="w-2.5 h-2.5" />
              </div>
            )}
          </div>
        </div>
      </AccordionTrigger>

      {/* Expanded Content - V2/V3 Side-by-Side Comparison */}
      <AccordionContent className="px-2 pb-3">
        <div className="mt-2 space-y-3">
          {/* Main Card with Component Breakdown */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            {/* Error List Banner (if any) */}
            {errors.length > 0 && (
              <div className="px-3 py-2 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-[11px] text-amber-800 dark:text-amber-200">
                    <span className="font-semibold">Match Notes:</span>
                    <ul className="mt-1 space-y-0.5 list-disc list-inside">
                      {errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* V2 / V3 Side-by-Side Headers */}
            <div className="grid grid-cols-2 border-b border-border">
              <div className="px-3 py-2 bg-primary/5 border-r border-border">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wide">V2 Component Breakdown</span>
              </div>
              <div className="px-3 py-2 bg-emerald-50/50 dark:bg-emerald-950/20">
                <div className="flex items-center gap-1.5">
                  {hasV3 && <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wide",
                    hasV3 ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground"
                  )}>
                    V3 Component Breakdown
                  </span>
                </div>
              </div>
            </div>

            {/* Side-by-Side Component Comparison */}
            <div className="grid grid-cols-2">
              {/* V2 Panel */}
              <div className="border-r border-border">
                {/* V2 Address Lines Section */}
                <div className="grid grid-cols-[100px_1fr_1fr] gap-1 px-2 py-1.5 bg-primary/10 border-b border-border text-[9px] font-bold text-primary uppercase">
                  <div>Address Line</div>
                  <div>Input</div>
                  <div>Bureau</div>
                </div>
                {/* V2 Address Line Rows */}
                {[
                  { key: "line1", label: "Line 1", input: record.Input_Line_1, bureau: record.Bureau_Line_1 },
                  { key: "line2", label: "Line 2", input: record.Input_Line_2, bureau: record.Bureau_Line_2 },
                  { key: "line3", label: "Line 3 (Suburb)", input: record.Input_Line_3, bureau: record.Bureau_Line_3 },
                  { key: "line4", label: "Line 4 (Town)", input: record.Input_Line_4, bureau: record.Bureau_Line_4 },
                  { key: "line5", label: "Line 5 (City)", input: "", bureau: "" },
                  { key: "postCode", label: "Post Code", input: record.Input_Line_Post_Code, bureau: record.Bureau_Line_Post_Code },
                ].map((item, i, arr) => (
                  <div 
                    key={item.key}
                    className={cn(
                      "grid grid-cols-[100px_1fr_1fr] gap-1 px-2 py-1.5 text-[11px]",
                      i !== arr.length - 1 && "border-b border-border/30"
                    )}
                  >
                    <div className="font-medium text-muted-foreground truncate">{item.label}</div>
                    <div className="font-mono text-foreground truncate" title={item.input}>
                      {item.input || <span className="text-muted-foreground/40 italic text-[10px]">—</span>}
                    </div>
                    <div className="font-mono text-foreground truncate" title={item.bureau}>
                      {item.bureau || <span className="text-muted-foreground/40 italic text-[10px]">—</span>}
                    </div>
                  </div>
                ))}

                {/* Divider */}
                <div className="h-px bg-border my-1" />

                {/* V2 Component Headers */}
                <div className="grid grid-cols-[100px_1fr_1fr_36px_40px] gap-1 px-2 py-1.5 bg-primary/5 border-b border-border text-[9px] font-bold text-primary uppercase">
                  <div>Component</div>
                  <div>Input</div>
                  <div>Bureau</div>
                  <div className="text-center">Match</div>
                  <div className="text-center">Score</div>
                </div>
                
                {/* V2 Component Rows */}
                {[
                  { label: "Complex No.", input: record.Input_Complex_Number, bureau: record.Bureau_Complex_Number },
                  { label: "Complex Name", input: record.Input_Complex_Name, bureau: record.Bureau_Complex_Name },
                  { label: "Street No.", input: record.Input_Street_Number, bureau: record.Bureau_Street_Number },
                  { label: "Street Name", input: record.Input_Street_Name, bureau: record.Bureau_Street_Name },
                  { label: "Street Type", input: "", bureau: "" },
                  { label: "Suburb", input: record.Input_Suburb, bureau: record.Bureau_Suburb },
                  { label: "Town", input: record.Input_Town, bureau: record.Bureau_Town },
                  { label: "City", input: "", bureau: "" },
                  { label: "Post Code", input: record.Input_Post_Code, bureau: record.Bureau_Post_Code },
                ].map((comp, i, arr) => (
                  <div 
                    key={i}
                    className={cn(
                      "grid grid-cols-[100px_1fr_1fr_36px_40px] gap-1 px-2 py-1.5 text-[11px]",
                      i !== arr.length - 1 && "border-b border-border/30"
                    )}
                  >
                    <div className="font-medium text-muted-foreground truncate">{comp.label}</div>
                    <div className="font-mono text-foreground truncate" title={comp.input}>
                      {comp.input || <span className="text-muted-foreground/40 italic text-[10px]">—</span>}
                    </div>
                    <div className="font-mono text-foreground truncate" title={comp.bureau}>
                      {comp.bureau || <span className="text-muted-foreground/40 italic text-[10px]">—</span>}
                    </div>
                    <div className="flex justify-center">
                      <span className="text-muted-foreground/40 text-[10px]">—</span>
                    </div>
                    <div className="flex justify-center">
                      <span className="text-muted-foreground/40 text-[10px]">—</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* V3 Panel */}
              <div>
                {hasV3 && v3Data ? (
                  <V3TokenBreakdownPanel 
                    tokenComparison={v3Data.tokenComparison} 
                    addressLines={v3Data.inputLines}
                    bureauAddressLines={v3Data.bureauLines}
                  />
                ) : (
                  <>
                    {/* V3 Column Headers */}
                    <div className="grid grid-cols-[100px_1fr_1fr_50px] gap-1 px-2 py-1.5 bg-muted/20 border-b border-border text-[9px] font-bold text-muted-foreground/60 uppercase">
                      <div>Component</div>
                      <div>Input</div>
                      <div>Bureau</div>
                      <div className="text-center">Match</div>
                    </div>
                    
                    {/* V3 Placeholder Rows */}
                    {components.map((comp, i) => (
                      <div 
                        key={i}
                        className={cn(
                          "grid grid-cols-[100px_1fr_1fr_50px] gap-1 px-2 py-1.5 text-[11px] bg-muted/10",
                          i !== components.length - 1 && "border-b border-border/20"
                        )}
                      >
                        <div className="font-medium text-muted-foreground/50 truncate">{comp.label}</div>
                        <div className="font-mono text-muted-foreground/40">—</div>
                        <div className="font-mono text-muted-foreground/40">—</div>
                        <div className="flex justify-center">
                          <Minus className="w-3 h-3 text-muted-foreground/30" />
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Footer with Result Summary */}
            <div className="grid grid-cols-2 border-t border-border bg-muted/20">
              <div className="px-3 py-2 border-r border-border flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">
                  <span className="font-medium">Result:</span> {record.RecordMatchResult}
                </span>
                <Badge variant="outline" className="text-[9px] h-5 text-muted-foreground">
                  V2 Score: {record.Overall_Match_Score}
                </Badge>
              </div>
              <div className="px-3 py-2 flex items-center justify-between">
                <span className={cn(
                  "text-[10px]",
                  hasV3 ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground/60"
                )}>
                  {hasV3 ? "V3 Analysis Available" : "V3 data pending"}
                </span>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-[9px] h-5",
                    hasV3 
                      ? "border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-400" 
                      : "border-muted-foreground/30 text-muted-foreground/50"
                  )}
                >
                  {hasV3 ? "V3 ✓" : "—"}
                </Badge>
              </div>
            </div>
          </div>

          {/* V3 Address Highlight Ribbon */}
          {hasV3 && v3Data && (
            <AddressHighlightRibbon
              inputAddress={record.Input_Original_Full_Address}
              bureauAddress={record.Bureau_Original_Full_Address}
              tokenComparison={v3Data.tokenComparison}
            />
          )}

          {/* V3 Rules Check Table */}
          {hasV3 && v3Data && (
            <V3RulesCheckTable ruleCheck={v3Data.ruleCheck} />
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
