import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { KYCAddressRecord } from "@/types/kyc";
import { getOutcomeType, getAddressComponents, parseErrorList } from "@/utils/kycDataParser";
import { Check, X, Minus, AlertCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface KYCExpandableRowProps {
  record: KYCAddressRecord;
  index: number;
}

export const KYCExpandableRow = ({ record, index }: KYCExpandableRowProps) => {
  const outcomeType = getOutcomeType(record.RecordMatchResult);
  const components = getAddressComponents(record);
  const errors = parseErrorList(record.ErrorList);
  const hasErrors = errors.length > 0;
  
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
        <div className="grid grid-cols-[32px_1fr_60px_110px_50px] gap-2 w-full items-center text-left">
          {/* Row Number */}
          <span className="text-[10px] font-mono text-muted-foreground text-center">
            {index + 1}
          </span>

          {/* Bureau Address */}
          <span className="text-xs font-medium text-foreground truncate pr-2" title={record.Bureau_Original_Full_Address}>
            {truncateAddress(record.Bureau_Original_Full_Address)}
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

          {/* V3 Status Placeholder */}
          <div className="flex justify-center">
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted/50 text-muted-foreground">
              <span>V3</span>
              <Minus className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>
      </AccordionTrigger>

      {/* Expanded Content - V2/V3 Side-by-Side Comparison */}
      <AccordionContent className="px-2 pb-3">
        <div className="mt-2 rounded-lg border border-border bg-card overflow-hidden">
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
            <div className="px-3 py-2 bg-muted/30">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">V3 Component Breakdown (Coming Soon)</span>
            </div>
          </div>

          {/* Side-by-Side Component Comparison */}
          <div className="grid grid-cols-2">
            {/* V2 Panel */}
            <div className="border-r border-border">
              {/* V2 Column Headers */}
              <div className="grid grid-cols-[100px_1fr_1fr_50px] gap-1 px-2 py-1.5 bg-muted/40 border-b border-border text-[9px] font-bold text-muted-foreground uppercase">
                <div>Component</div>
                <div>Input</div>
                <div>Bureau</div>
                <div className="text-center">Match</div>
              </div>
              
              {/* V2 Component Rows - NO match indicators (V2 has no component-level matching) */}
              {components.map((comp, i) => (
                <div 
                  key={i}
                  className={cn(
                    "grid grid-cols-[100px_1fr_1fr_50px] gap-1 px-2 py-1.5 text-[11px]",
                    i !== components.length - 1 && "border-b border-border/30"
                  )}
                >
                  <div className="font-medium text-muted-foreground truncate">{comp.label}</div>
                  <div className="font-mono text-foreground truncate" title={comp.inputValue}>
                    {comp.inputValue || <span className="text-muted-foreground/40 italic text-[10px]">—</span>}
                  </div>
                  <div className="font-mono text-foreground truncate" title={comp.bureauValue}>
                    {comp.bureauValue || <span className="text-muted-foreground/40 italic text-[10px]">—</span>}
                  </div>
                  {/* V2 has no component-level matching - show blank dash */}
                  <div className="flex justify-center">
                    <span className="text-muted-foreground/40 text-[10px]">—</span>
                  </div>
                </div>
              ))}
            </div>

            {/* V3 Panel (Placeholder) */}
            <div>
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
            </div>
          </div>

          {/* Footer with Result Summary */}
          <div className="grid grid-cols-2 border-t border-border bg-muted/20">
            <div className="px-3 py-2 border-r border-border flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">
                <span className="font-medium">Result:</span> {record.RecordMatchResult}
              </span>
              <Badge variant="outline" className="text-[9px] h-5 text-muted-foreground">
                Overall Score: {record.Overall_Match_Score}
              </Badge>
            </div>
            <div className="px-3 py-2 flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground/60">V3 data pending</span>
              <Badge variant="outline" className="text-[9px] h-5 border-muted-foreground/30 text-muted-foreground/50">
                —
              </Badge>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
