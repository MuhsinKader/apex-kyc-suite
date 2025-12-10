import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Eye, Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface KYCCompactHeaderProps {
  distinctIDNumbers: string[];
  selectedIDNumber: string;
  onIDChange: (id: string) => void;
  guidsForSelectedID: string[];
  selectedGUID: string | null;
  onGUIDChange: (guid: string) => void;
  getGUIDCount: (id: string) => number;
}

export const KYCCompactHeader = ({
  distinctIDNumbers,
  selectedIDNumber,
  onIDChange,
  guidsForSelectedID,
  selectedGUID,
  onGUIDChange,
  getGUIDCount,
}: KYCCompactHeaderProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyID = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedIDNumber) return;
    
    await navigator.clipboard.writeText(selectedIDNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      {/* Single Control Ribbon */}
      <div className="px-4 py-3 bg-gradient-to-r from-muted/50 via-background to-muted/30">
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

          {/* ID Number Section - Prominent Display */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-medium">ID:</span>
            
            {/* Prominent ID Display (when selected) */}
            {selectedIDNumber && (
              <div className="flex items-center gap-2">
                <div 
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary/15 transition-colors"
                  onClick={handleCopyID}
                  title="Click to copy ID number"
                >
                  <span className="text-base font-bold font-mono text-primary tracking-wide">
                    {selectedIDNumber}
                  </span>
                  <div className="p-0.5 rounded transition-colors">
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-primary/60 group-hover:text-primary" />
                    )}
                  </div>
                </div>
                
                {/* Change Dropdown */}
                <Select value={selectedIDNumber} onValueChange={onIDChange}>
                  <SelectTrigger className="w-[90px] h-7 text-[10px] bg-background border-border/50 text-muted-foreground">
                    <span>Change</span>
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
            )}
            
            {/* Initial Selector (when no ID selected) */}
            {!selectedIDNumber && (
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
            )}
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
    </div>
  );
};
