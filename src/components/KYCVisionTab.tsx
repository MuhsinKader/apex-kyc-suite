import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { parseKYCData, getDistinctIDNumbers, getRecordsByIDNumber } from "@/utils/kycDataParser";
import { AddressComparisonCard } from "./AddressComparisonCard";
import { Eye, Database, FileSearch, Users } from "lucide-react";

export const KYCVisionTab = () => {
  const [selectedIDNumber, setSelectedIDNumber] = useState<string>("");
  
  const allRecords = useMemo(() => parseKYCData(), []);
  const distinctIDNumbers = useMemo(() => getDistinctIDNumbers(allRecords), [allRecords]);
  const filteredRecords = useMemo(() => {
    if (!selectedIDNumber) return [];
    return getRecordsByIDNumber(allRecords, selectedIDNumber);
  }, [allRecords, selectedIDNumber]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-background to-accent/5 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-white">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-foreground">KYC Vision — V2 Analysis</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                Address matching visualization and score breakdown
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-lg font-bold text-foreground">{distinctIDNumbers.length}</p>
                <p className="text-xs text-muted-foreground">Distinct IDs</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50">
              <Database className="w-5 h-5 text-accent" />
              <div>
                <p className="text-lg font-bold text-foreground">{allRecords.length}</p>
                <p className="text-xs text-muted-foreground">Total Records</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50">
              <FileSearch className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-lg font-bold text-foreground">{filteredRecords.length}</p>
                <p className="text-xs text-muted-foreground">Selected Records</p>
              </div>
            </div>
          </div>

          <Separator className="mb-5" />

          {/* ID Number Selector */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Select ID Number</label>
            <Select value={selectedIDNumber} onValueChange={setSelectedIDNumber}>
              <SelectTrigger className="w-full md:w-[400px] h-11 font-mono text-sm bg-background border-2 border-border/50 hover:border-primary/50 transition-colors">
                <SelectValue placeholder="Choose an ID Number to view transactions..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg z-50">
                {distinctIDNumbers.map((id) => {
                  const count = getRecordsByIDNumber(allRecords, id).length;
                  return (
                    <SelectItem key={id} value={id} className="font-mono">
                      <div className="flex items-center justify-between gap-4 w-full">
                        <span>{id}</span>
                        <Badge variant="secondary" className="text-xs ml-2">
                          {count} records
                        </Badge>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Records */}
      {selectedIDNumber ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">
              Transactions for ID: <span className="font-mono text-primary">{selectedIDNumber}</span>
            </h3>
            <Badge variant="outline" className="font-semibold">
              {filteredRecords.length} transaction{filteredRecords.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          {/* V2 Column - Ready for V3 side-by-side */}
          <div className="grid grid-cols-1 gap-4">
            {/* KYC V2 Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary/10 text-primary border-primary/30 font-bold">
                  KYC V2
                </Badge>
                <span className="text-xs text-muted-foreground">Current matching algorithm</span>
              </div>

              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {filteredRecords.map((record, index) => (
                    <AddressComparisonCard key={record.KYCIndividualMatchLog_Version2_id} record={record} index={index} />
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Placeholder for KYC V3 - Side by side ready */}
            {/* 
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 font-bold">
                  KYC V3
                </Badge>
                <span className="text-xs text-muted-foreground">New matching algorithm</span>
              </div>
              <ScrollArea className="h-[600px] pr-4">
                V3 content will go here
              </ScrollArea>
            </div>
            */}
          </div>
        </div>
      ) : (
        <Card className="border-2 border-dashed border-border/50 bg-muted/20">
          <CardContent className="py-16">
            <div className="text-center">
              <FileSearch className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Select an ID Number</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Choose an ID Number from the dropdown above to view all associated transactions and address matching details.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
