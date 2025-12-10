import { Card } from "@/components/ui/card";
import { Users, Database, FileSearch, ArrowRightLeft } from "lucide-react";

interface KYCVisionOverviewProps {
  distinctIDCount: number;
  totalTransactions: number;
  totalRecords: number;
  selectedTransactionCount: number;
}

export const KYCVisionOverview = ({
  distinctIDCount,
  totalTransactions,
  totalRecords,
  selectedTransactionCount,
}: KYCVisionOverviewProps) => {
  const stats = [
    {
      icon: Users,
      value: distinctIDCount,
      label: "Distinct IDs",
      color: "text-primary",
    },
    {
      icon: ArrowRightLeft,
      value: totalTransactions,
      label: "Total Transactions",
      color: "text-accent",
    },
    {
      icon: Database,
      value: totalRecords,
      label: "Total Records",
      color: "text-emerald-600",
    },
    {
      icon: FileSearch,
      value: selectedTransactionCount,
      label: "Selected Transactions",
      color: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, index) => (
        <Card key={index} className="p-3 bg-card border border-border/50">
          <div className="flex items-center gap-3">
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <div>
              <p className="text-lg font-bold text-foreground">{stat.value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
