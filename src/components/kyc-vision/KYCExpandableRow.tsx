import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { KYCAddressRecord } from "@/types/kyc";
import { getOutcomeType, getAddressComponents } from "@/utils/kycDataParser";
import { Check, X, Minus, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KYCExpandableRowProps {
  record: KYCAddressRecord;
  index: number;
}

export const KYCExpandableRow = ({ record, index }: KYCExpandableRowProps) => {
  const outcomeType = getOutcomeType(record.RecordMatchResult);
  const components = getAddressComponents(record);
  const matchedComponents = components.filter(c => c.isMatch).length;
  
  const getStatusIcon = () => {
    if (outcomeType === "pass") return <Check className="w-3.5 h-3.5" />;
    if (outcomeType === "caution") return <Minus className="w-3.5 h-3.5" />;
    return <X className="w-3.5 h-3.5" />;
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

  const truncateAddress = (addr: string, maxLen: number = 60) => {
    if (!addr) return "—";
    return addr.length > maxLen ? addr.slice(0, maxLen) + "..." : addr;
  };

  return (
    <AccordionItem 
      value={`row-${index}`} 
      className="border-0"
    >
      <AccordionTrigger className="px-3 py-2.5 hover:no-underline hover:bg-muted/50 transition-colors group data-[state=open]:bg-muted/30">
        <div className="flex items-center gap-3 w-full text-left">
          {/* Row Number */}
          <span className="w-6 text-xs font-mono text-muted-foreground text-center flex-shrink-0">
            {index + 1}
          </span>

          {/* Bureau Address */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate pr-4">
              {truncateAddress(record.Bureau_Original_Full_Address)}
            </p>
          </div>

          {/* Score Badge */}
          <Badge className={cn("text-xs px-2 py-0.5 font-bold flex-shrink-0", getScoreStyles(record.Overall_Match_Score))}>
            {record.Overall_Match_Score}
          </Badge>

          {/* V2 Status */}
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium flex-shrink-0",
            getStatusStyles()
          )}>
            {getStatusIcon()}
            <span className="hidden sm:inline">
              {outcomeType === "pass" ? "Matched" : outcomeType === "caution" ? "Fuzzy" : "Rejected"}
            </span>
          </div>

          {/* V3 Status Placeholder */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-muted/50 text-muted-foreground flex-shrink-0">
            <span className="text-[10px]">V3</span>
            <Minus className="w-3 h-3" />
          </div>

          {/* Components Match Indicator */}
          <div className="hidden md:flex items-center gap-1 text-[10px] text-muted-foreground flex-shrink-0">
            <span>{matchedComponents}/{components.length}</span>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-3 pb-3">
        <div className="mt-2 rounded-lg border border-border bg-muted/20 overflow-hidden">
          {/* Component Comparison Header */}
          <div className="grid grid-cols-[140px_1fr_1fr_80px] gap-2 px-3 py-2 bg-muted/50 border-b border-border text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
            <div>Component</div>
            <div>Input Value</div>
            <div>Bureau Value</div>
            <div className="text-center">Match</div>
          </div>

          {/* Component Rows */}
          {components.map((comp, i) => (
            <div 
              key={i}
              className={cn(
                "grid grid-cols-[140px_1fr_1fr_80px] gap-2 px-3 py-2 text-xs",
                i !== components.length - 1 && "border-b border-border/50",
                comp.isMatch ? "bg-emerald-50/30 dark:bg-emerald-950/10" : "bg-red-50/30 dark:bg-red-950/10"
              )}
            >
              <div className="font-medium text-muted-foreground">{comp.label}</div>
              <div className="font-mono text-foreground truncate" title={comp.inputValue}>
                {comp.inputValue || <span className="text-muted-foreground/50 italic">empty</span>}
              </div>
              <div className="font-mono text-foreground truncate" title={comp.bureauValue}>
                {comp.bureauValue || <span className="text-muted-foreground/50 italic">empty</span>}
              </div>
              <div className="flex justify-center">
                {comp.isMatch ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-red-600">
                    <X className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Match Result Footer */}
          <div className="px-3 py-2 bg-muted/30 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-[10px] text-muted-foreground">
                <span className="font-medium">Result:</span> {record.RecordMatchResult}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px]">
                  {matchedComponents} of {components.length} components matched
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};