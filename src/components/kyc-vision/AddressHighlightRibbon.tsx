import { V3TokenComparison, parseMatchType, V3_COMPONENT_COLORS } from "@/types/kycV3";
import { cn } from "@/lib/utils";

interface AddressHighlightRibbonProps {
  inputAddress: string;
  bureauAddress: string;
  tokenComparison: V3TokenComparison;
}

// Components to highlight (ordered by typical appearance in address)
const HIGHLIGHTABLE_COMPONENTS: Array<keyof V3TokenComparison> = [
  "StreetNumber",
  "StreetName",
  "StreetType",
  "ComplexNumber",
  "ComplexName",
  "Suburb",
  "Town",
  "City",
  "PostalCode",
];

export const AddressHighlightRibbon = ({ 
  inputAddress, 
  bureauAddress, 
  tokenComparison 
}: AddressHighlightRibbonProps) => {
  
  // Build highlighted address by finding and highlighting each component
  const highlightAddress = (address: string, isInput: boolean): React.ReactNode[] => {
    if (!address) return [<span key="empty" className="text-muted-foreground italic">—</span>];
    
    // Create a working copy
    let workingAddress = address.toUpperCase();
    const segments: { text: string; component: string | null; matched: boolean }[] = [];
    
    // Track which parts have been highlighted
    const highlightedRanges: { start: number; end: number; component: string; matched: boolean }[] = [];
    
    // Find each component in the address
    for (const component of HIGHLIGHTABLE_COMPONENTS) {
      const token = tokenComparison[component];
      const value = isInput ? token.Input : token.Bureau;
      const parsed = parseMatchType(token.Match_Type);
      
      // Skip if no value or skipped/remainder
      if (!value || parsed.type === "skipped" || parsed.type === "remainder") continue;
      
      // Only highlight if it's a match (exist or partial with score > 0)
      const isMatched = parsed.type === "exist" || (parsed.type === "partial" && parsed.score !== null && parsed.score > 50);
      
      // Find the value in the address (case-insensitive)
      const upperValue = value.toUpperCase();
      const index = workingAddress.indexOf(upperValue);
      
      if (index !== -1) {
        // Check if this range overlaps with existing highlights
        const overlaps = highlightedRanges.some(
          r => (index >= r.start && index < r.end) || (index + upperValue.length > r.start && index + upperValue.length <= r.end)
        );
        
        if (!overlaps) {
          highlightedRanges.push({
            start: index,
            end: index + upperValue.length,
            component,
            matched: isMatched
          });
        }
      }
    }
    
    // Sort ranges by start position
    highlightedRanges.sort((a, b) => a.start - b.start);
    
    // Build segments
    let lastEnd = 0;
    const originalAddress = address.toUpperCase();
    
    for (const range of highlightedRanges) {
      // Add unhighlighted text before this range
      if (range.start > lastEnd) {
        segments.push({
          text: address.slice(lastEnd, range.start),
          component: null,
          matched: false
        });
      }
      
      // Add highlighted segment
      segments.push({
        text: address.slice(range.start, range.end),
        component: range.component,
        matched: range.matched
      });
      
      lastEnd = range.end;
    }
    
    // Add remaining text
    if (lastEnd < address.length) {
      segments.push({
        text: address.slice(lastEnd),
        component: null,
        matched: false
      });
    }
    
    // If no segments, return original
    if (segments.length === 0) {
      return [<span key="full">{address}</span>];
    }
    
    // Render segments
    return segments.map((seg, i) => {
      if (seg.component && seg.matched) {
        const colors = V3_COMPONENT_COLORS[seg.component];
        return (
          <span 
            key={i}
            className={cn(
              "px-1 py-0.5 rounded border font-medium",
              colors?.bg,
              colors?.text,
              colors?.border
            )}
            title={seg.component}
          >
            {seg.text}
          </span>
        );
      }
      return <span key={i}>{seg.text}</span>;
    });
  };

  return (
    <div className="rounded-lg border border-border bg-gradient-to-r from-primary/5 via-transparent to-accent/5 overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 bg-muted/30 border-b border-border">
        <span className="text-[10px] font-bold text-foreground uppercase tracking-wide">
          Full Address Comparison — V3 Token Highlighting
        </span>
      </div>
      
      {/* Side by Side Addresses */}
      <div className="grid grid-cols-2 divide-x divide-border">
        {/* Input Address */}
        <div className="p-3">
          <div className="text-[9px] font-bold text-primary uppercase tracking-wide mb-2">
            Input Address
          </div>
          <div className="text-xs font-mono leading-relaxed flex flex-wrap gap-0.5">
            {highlightAddress(inputAddress, true)}
          </div>
        </div>
        
        {/* Bureau Address */}
        <div className="p-3">
          <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide mb-2">
            Bureau Address
          </div>
          <div className="text-xs font-mono leading-relaxed flex flex-wrap gap-0.5">
            {highlightAddress(bureauAddress, false)}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-3 py-2.5 bg-muted/20 border-t border-border flex flex-wrap gap-3">
        {Object.entries(V3_COMPONENT_COLORS).map(([component, colors]) => (
          <div key={component} className="flex items-center gap-1.5">
            <div className={cn("w-3 h-3 rounded-sm", colors.bg, "border", colors.border)} />
            <span className="text-xs text-muted-foreground font-medium">{component}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
