import { V3TokenComparison, parseMatchType, V3_COMPONENT_COLORS } from "@/types/kycV3";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface V3TokenBreakdownPanelProps {
  tokenComparison: V3TokenComparison;
  // V3 Address Lines (optional - for displaying Line 1-5 + PostCode)
  addressLines?: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    postCode: string;
  };
  bureauAddressLines?: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    postCode: string;
  };
}

// Component display order (excluding Remainder_Tokens which is shown separately)
const COMPONENT_ORDER: Array<keyof Omit<V3TokenComparison, "Remainder_Tokens">> = [
  "ComplexNumber",
  "ComplexName",
  "StreetNumber",
  "StreetName",
  "StreetType",
  "Suburb",
  "Town",
  "City",
  "PostalCode",
];

// Friendly labels
const COMPONENT_LABELS: Record<string, string> = {
  ComplexNumber: "Complex No.",
  ComplexName: "Complex Name",
  StreetNumber: "Street No.",
  StreetName: "Street Name",
  StreetType: "Street Type",
  Suburb: "Suburb",
  Town: "Town",
  City: "City",
  PostalCode: "Post Code",
};

// Address line labels
const ADDRESS_LINE_LABELS = [
  { key: "line1", label: "Line 1" },
  { key: "line2", label: "Line 2" },
  { key: "line3", label: "Line 3 (Suburb)" },
  { key: "line4", label: "Line 4 (Town)" },
  { key: "line5", label: "Line 5 (City)" },
  { key: "postCode", label: "Post Code" },
] as const;

export const V3TokenBreakdownPanel = ({ 
  tokenComparison, 
  addressLines,
  bureauAddressLines 
}: V3TokenBreakdownPanelProps) => {
  const getMatchIcon = (matchType: string) => {
    const parsed = parseMatchType(matchType);
    
    if (parsed.type === "exist") {
      return <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />;
    }
    if (parsed.type === "skipped") {
      return <Minus className="w-3 h-3 text-muted-foreground/40" />;
    }
    if (parsed.type === "remainder") {
      return <Minus className="w-3 h-3 text-muted-foreground/40" />;
    }
    if (parsed.type === "partial") {
      return <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400">~</span>;
    }
    // not_exist
    return <X className="w-3 h-3 text-red-600 dark:text-red-400" />;
  };

  const getScoreDisplay = (matchType: string) => {
    const parsed = parseMatchType(matchType);
    
    if (parsed.type === "exist") {
      return null; // No score shown for exact match
    }
    if (parsed.type === "skipped" || parsed.type === "remainder") {
      return null;
    }
    if (parsed.score !== null && parsed.score > 0) {
      return (
        <span className={cn(
          "text-[9px] font-mono",
          parsed.type === "partial" ? "text-amber-600 dark:text-amber-400" : "text-red-500 dark:text-red-400"
        )}>
          {parsed.score}%
        </span>
      );
    }
    return null;
  };

  const getRowStyle = (matchType: string) => {
    const parsed = parseMatchType(matchType);
    
    if (parsed.type === "exist") {
      return "bg-emerald-50/50 dark:bg-emerald-950/20";
    }
    if (parsed.type === "partial") {
      return "bg-amber-50/50 dark:bg-amber-950/20";
    }
    if (parsed.type === "not_exist" && parsed.score !== null && parsed.score > 0) {
      return "bg-red-50/30 dark:bg-red-950/10";
    }
    return "";
  };

  return (
    <div>
      {/* V3 Address Lines Section (Line 1-5 + PostCode) */}
      {addressLines && (
        <>
          <div className="grid grid-cols-[100px_1fr_1fr] gap-1 px-2 py-1.5 bg-primary/10 border-b border-border text-[9px] font-bold text-primary uppercase">
            <div>Address Line</div>
            <div>Input</div>
            <div>Bureau</div>
          </div>
          {ADDRESS_LINE_LABELS.map((item, i) => {
            const inputValue = addressLines[item.key as keyof typeof addressLines];
            const bureauValue = bureauAddressLines?.[item.key as keyof typeof bureauAddressLines] || "";
            
            return (
              <div 
                key={item.key}
                className={cn(
                  "grid grid-cols-[100px_1fr_1fr] gap-1 px-2 py-1.5 text-[11px]",
                  i !== ADDRESS_LINE_LABELS.length - 1 && "border-b border-border/30"
                )}
              >
                <div className="font-medium text-muted-foreground truncate">{item.label}</div>
                <div className="font-mono text-foreground truncate" title={inputValue}>
                  {inputValue || <span className="text-muted-foreground/40 italic text-[10px]">—</span>}
                </div>
                <div className="font-mono text-foreground truncate" title={bureauValue}>
                  {bureauValue || <span className="text-muted-foreground/40 italic text-[10px]">—</span>}
                </div>
              </div>
            );
          })}
          
          {/* Divider between address lines and token components */}
          <div className="h-px bg-border my-1" />
        </>
      )}

      {/* V3 Token Components Header */}
      <div className="grid grid-cols-[100px_1fr_1fr_36px_40px] gap-1 px-2 py-1.5 bg-emerald-50/50 dark:bg-emerald-950/30 border-b border-border text-[9px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
        <div>Component</div>
        <div>Input</div>
        <div>Bureau</div>
        <div className="text-center">Match</div>
        <div className="text-center">Score</div>
      </div>
      
      {/* V3 Component Rows */}
      {COMPONENT_ORDER.map((key, i) => {
        const token = tokenComparison[key];
        const label = COMPONENT_LABELS[key] || key;
        
        return (
          <div 
            key={key}
            className={cn(
              "grid grid-cols-[100px_1fr_1fr_36px_40px] gap-1 px-2 py-1.5 text-[11px]",
              i !== COMPONENT_ORDER.length - 1 && "border-b border-border/30",
              getRowStyle(token.Match_Type)
            )}
          >
            <div className="font-medium text-muted-foreground truncate">{label}</div>
            <div className="font-mono text-foreground truncate" title={token.Input}>
              {token.Input || <span className="text-muted-foreground/40 italic text-[10px]">—</span>}
            </div>
            <div className="font-mono text-foreground truncate" title={token.Bureau}>
              {token.Bureau || <span className="text-muted-foreground/40 italic text-[10px]">—</span>}
            </div>
            <div className="flex justify-center items-center">
              {getMatchIcon(token.Match_Type)}
            </div>
            <div className="flex justify-center items-center">
              {getScoreDisplay(token.Match_Type)}
            </div>
          </div>
        );
      })}

      {/* Remainder Tokens (if any) */}
      {(tokenComparison.Remainder_Tokens.Input || tokenComparison.Remainder_Tokens.Bureau) && (
        <div className="px-2 py-1.5 text-[10px] bg-muted/30 border-t border-border">
          <span className="font-medium text-muted-foreground">Remainder: </span>
          <span className="font-mono text-foreground">
            {tokenComparison.Remainder_Tokens.Input && (
              <span className="text-amber-600 dark:text-amber-400">
                Input: "{tokenComparison.Remainder_Tokens.Input}"
              </span>
            )}
            {tokenComparison.Remainder_Tokens.Input && tokenComparison.Remainder_Tokens.Bureau && " | "}
            {tokenComparison.Remainder_Tokens.Bureau && (
              <span className="text-blue-600 dark:text-blue-400">
                Bureau: "{tokenComparison.Remainder_Tokens.Bureau}"
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  );
};
