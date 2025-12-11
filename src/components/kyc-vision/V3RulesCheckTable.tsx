import { V3RulesCheck, V3_RULE_DESCRIPTIONS } from "@/types/kycV3";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface V3RulesCheckTableProps {
  ruleCheck: V3RulesCheck;
}

const RULE_OPTIONS = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"] as const;

export const V3RulesCheckTable = ({ ruleCheck }: V3RulesCheckTableProps) => {
  // Check if any rule passed for both input and bureau
  const anyRulePassed = RULE_OPTIONS.some(option => {
    const rule = ruleCheck[option];
    return rule.Input_Matched && rule.Bureau_Matched;
  });

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border flex items-center justify-between">
        <div>
          <span className="text-sm font-bold text-foreground">V3 Validation Rules Check</span>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Address validity is determined by matching at least one rule on both Input and Bureau
          </p>
        </div>
        <Badge 
          variant={anyRulePassed ? "default" : "destructive"}
          className={cn(
            "text-[10px] font-bold",
            anyRulePassed && "bg-emerald-600 hover:bg-emerald-700"
          )}
        >
          {anyRulePassed ? "VALID" : "INVALID"}
        </Badge>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              <th className="px-3 py-2 text-left font-bold text-muted-foreground w-[180px]">Rule</th>
              <th className="px-3 py-2 text-left font-medium text-muted-foreground">Required Components</th>
              <th className="px-3 py-2 text-center font-bold text-primary w-[70px]">Input</th>
              <th className="px-3 py-2 text-left font-medium text-primary/70 w-[160px]">Missing (Input)</th>
              <th className="px-3 py-2 text-center font-bold text-accent-foreground w-[70px]">Bureau</th>
              <th className="px-3 py-2 text-left font-medium text-accent-foreground/70 w-[160px]">Missing (Bureau)</th>
            </tr>
          </thead>
          <tbody>
            {RULE_OPTIONS.map((option, index) => {
              const rule = ruleCheck[option];
              const description = V3_RULE_DESCRIPTIONS[option];
              const bothPassed = rule.Input_Matched && rule.Bureau_Matched;
              
              return (
                <tr 
                  key={option}
                  className={cn(
                    "border-b border-border/50 transition-colors",
                    bothPassed && "bg-emerald-50/50 dark:bg-emerald-950/20",
                    index % 2 === 0 && !bothPassed && "bg-muted/10"
                  )}
                >
                  <td className="px-3 py-2.5 font-bold text-foreground">{option}</td>
                  <td className="px-3 py-2.5 text-muted-foreground font-mono text-[10px]">{description}</td>
                  <td className="px-3 py-2.5 text-center">
                    {rule.Input_Matched ? (
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/50">
                        <X className="w-3 h-3 text-red-600 dark:text-red-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2.5">
                    {rule.Input_Missing_Fields.length > 0 ? (
                      <span className="text-[10px] text-red-600 dark:text-red-400 font-mono">
                        {rule.Input_Missing_Fields.join(", ")}
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    {rule.Bureau_Matched ? (
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/50">
                        <X className="w-3 h-3 text-red-600 dark:text-red-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2.5">
                    {rule.Bureau_Missing_Fields.length > 0 ? (
                      <span className="text-[10px] text-red-600 dark:text-red-400 font-mono">
                        {rule.Bureau_Missing_Fields.join(", ")}
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
