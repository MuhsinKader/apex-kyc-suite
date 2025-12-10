import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Eye, MapPin, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface KYCCompactHeaderProps {
  distinctIDNumbers: string[];
  selectedIDNumber: string;
  onIDChange: (id: string) => void;
  guidsForSelectedID: string[];
  selectedGUID: string | null;
  onGUIDChange: (guid: string) => void;
  inputAddress: string;
  matchedCount: number;
  totalBureauRecords: number;
  bestScore: number;
  getGUIDCount: (id: string) => number;
}

export const KYCCompactHeader = ({
  distinctIDNumbers,
  selectedIDNumber,
  onIDChange,
  guidsForSelectedID,
  selectedGUID,
  onGUIDChange,
  inputAddress,
  matchedCount,
  totalBureauRecords,
  bestScore,
  getGUIDCount,
}: KYCCompactHeaderProps) => {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      {/* Top Row: Title + Selectors */}
      <div className="px-4 py-3 border-b border-border/50 bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <div className="flex flex-wrap items-center gap-4">
          {/* Icon + Title */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">KYC Vision</h2>
              <p className="text-[10px] text-muted-foreground">V2 vs V3 Comparison</p>
            </div>
          </div>

          <div className="h-8 w-px bg-border/50 hidden sm:block" />

          {/* ID Number Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">ID:</span>
            <Select value={selectedIDNumber} onValueChange={onIDChange}>
              <SelectTrigger className="w-[180px] h-8 text-xs font-mono bg-background border-border/50">
                <SelectValue placeholder="Select ID..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg z-50">
                {distinctIDNumbers.map((id) => (
                  <SelectItem key={id} value={id} className="font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span>{id}</span>
                      <Badge variant="secondary" className="text-[9px] px-1 py-0">
                        {getGUIDCount(id)}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* GUID Selector */}
          {selectedIDNumber && guidsForSelectedID.length > 0 && (
            <>
              <div className="h-8 w-px bg-border/50 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium">Transaction:</span>
                <Select value={selectedGUID || ""} onValueChange={onGUIDChange}>
                  <SelectTrigger className="w-[140px] h-8 text-xs font-mono bg-background border-border/50">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-lg z-50">
                    {guidsForSelectedID.map((guid, idx) => (
                      <SelectItem key={guid} value={guid} className="font-mono text-xs">
                        Txn {idx + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge variant="outline" className="text-[10px]">
                  {guidsForSelectedID.length} txn{guidsForSelectedID.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Input Address Bar */}
      {selectedGUID && inputAddress && (
        <div className="px-4 py-3 bg-muted/30">
          <div className="flex flex-wrap items-start gap-4">
            {/* Input Address */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                  Input Address
                </span>
              </div>
              <p className="text-sm font-medium text-foreground leading-tight">
                {inputAddress}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-center px-3 py-1.5 rounded-lg bg-background border border-border/50">
                <p className="text-lg font-bold text-foreground">{totalBureauRecords}</p>
                <p className="text-[9px] text-muted-foreground uppercase">Bureau Checks</p>
              </div>
              <div className="text-center px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-1 justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <p className="text-lg font-bold text-emerald-600">{matchedCount}</p>
                </div>
                <p className="text-[9px] text-emerald-700 dark:text-emerald-400 uppercase">Matched</p>
              </div>
              <div className="text-center px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-1 justify-center">
                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                  <p className="text-lg font-bold text-red-600">{totalBureauRecords - matchedCount}</p>
                </div>
                <p className="text-[9px] text-red-700 dark:text-red-400 uppercase">Rejected</p>
              </div>
              <div className={cn(
                "text-center px-3 py-1.5 rounded-lg border",
                bestScore >= 90 
                  ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800" 
                  : bestScore >= 70 
                    ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
                    : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
              )}>
                <p className={cn(
                  "text-lg font-bold",
                  bestScore >= 90 ? "text-emerald-600" : bestScore >= 70 ? "text-amber-600" : "text-red-600"
                )}>{bestScore}</p>
                <p className="text-[9px] text-muted-foreground uppercase">Best Score</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};