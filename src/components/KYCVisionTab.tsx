import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  parseKYCData, 
  getDistinctIDNumbers, 
  getRecordsByIDNumber, 
  getDistinctGUIDs,
  getGUIDsForIDNumber,
  getRecordsByGUID 
} from "@/utils/kycDataParser";
import { KYCVisionOverview } from "./kyc-vision/KYCVisionOverview";
import { KYCTransactionList } from "./kyc-vision/KYCTransactionList";
import { KYCComparisonView } from "./kyc-vision/KYCComparisonView";
import { TransactionComparison } from "@/types/kycV3";
import { Eye, FileSearch } from "lucide-react";

export const KYCVisionTab = () => {
  const [selectedIDNumber, setSelectedIDNumber] = useState<string>("");
  const [selectedGUID, setSelectedGUID] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"guid" | "v2Score" | "v3Score" | "delta">("v2Score");
  
  const allRecords = useMemo(() => parseKYCData(), []);
  const distinctIDNumbers = useMemo(() => getDistinctIDNumbers(allRecords), [allRecords]);
  const totalTransactions = useMemo(() => getDistinctGUIDs(allRecords).length, [allRecords]);
  
  // Get GUIDs for selected ID
  const guidsForSelectedID = useMemo(() => {
    if (!selectedIDNumber) return [];
    return getGUIDsForIDNumber(allRecords, selectedIDNumber);
  }, [allRecords, selectedIDNumber]);

  // Build transaction comparisons for the transaction list
  const transactionComparisons = useMemo((): TransactionComparison[] => {
    if (!selectedIDNumber) return [];
    
    return guidsForSelectedID.map(guid => {
      const records = getRecordsByGUID(allRecords, guid).filter(r => r.IDNumber === selectedIDNumber);
      
      // Find best V2 record
      const sortedRecords = [...records].sort((a, b) => {
        const aMatched = a.RecordMatchResult.toLowerCase().includes("matched on");
        const bMatched = b.RecordMatchResult.toLowerCase().includes("matched on");
        if (aMatched && !bMatched) return -1;
        if (!aMatched && bMatched) return 1;
        return b.Overall_Match_Score - a.Overall_Match_Score;
      });
      
      const bestRecord = sortedRecords[0];
      
      return {
        idNumber: selectedIDNumber,
        guid,
        v2BestScore: bestRecord?.Overall_Match_Score ?? 0,
        v2BestOutcome: bestRecord?.RecordMatchResult ?? "Unknown",
        v2RecordCount: records.length,
        // V3 placeholders - will be populated when V3 data is available
        v3Score: undefined,
        v3Outcome: undefined,
        scoreDelta: undefined,
        outcomeChanged: undefined,
      };
    });
  }, [allRecords, selectedIDNumber, guidsForSelectedID]);

  // Get records for selected transaction
  const selectedTransactionRecords = useMemo(() => {
    if (!selectedGUID || !selectedIDNumber) return [];
    return getRecordsByGUID(allRecords, selectedGUID).filter(r => r.IDNumber === selectedIDNumber);
  }, [allRecords, selectedGUID, selectedIDNumber]);

  // Auto-select first GUID when ID changes
  const handleIDChange = (id: string) => {
    setSelectedIDNumber(id);
    const guids = getGUIDsForIDNumber(allRecords, id);
    if (guids.length > 0) {
      setSelectedGUID(guids[0]);
    } else {
      setSelectedGUID(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-background to-accent/5 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-white">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-foreground">KYC Vision — V2 vs V3 Analysis</CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Side-by-side address matching comparison
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {/* Stats Row */}
          <KYCVisionOverview
            distinctIDCount={distinctIDNumbers.length}
            totalTransactions={totalTransactions}
            totalRecords={allRecords.length}
            selectedTransactionCount={guidsForSelectedID.length}
          />

          <Separator />

          {/* ID Number Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Select ID Number</label>
            <Select value={selectedIDNumber} onValueChange={handleIDChange}>
              <SelectTrigger className="w-full md:w-[400px] h-10 font-mono text-sm bg-background border-2 border-border/50 hover:border-primary/50 transition-colors">
                <SelectValue placeholder="Choose an ID Number to view transactions..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg z-50">
                {distinctIDNumbers.map((id) => {
                  const guidCount = getGUIDsForIDNumber(allRecords, id).length;
                  return (
                    <SelectItem key={id} value={id} className="font-mono">
                      <div className="flex items-center justify-between gap-4 w-full">
                        <span>{id}</span>
                        <Badge variant="secondary" className="text-[10px] ml-2">
                          {guidCount} txn{guidCount !== 1 ? "s" : ""}
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

      {/* Main Content */}
      {selectedIDNumber ? (
        <div className="grid grid-cols-[280px_1fr] gap-4">
          {/* Transaction List Panel */}
          <Card className="border border-border/50">
            <CardHeader className="pb-2 pt-3 px-3">
              <CardTitle className="text-sm font-bold">
                Transactions
              </CardTitle>
              <CardDescription className="text-xs">
                ID: <span className="font-mono text-primary">{selectedIDNumber}</span>
              </CardDescription>
              <Badge variant="outline" className="text-[10px] w-fit mt-1">
                {guidsForSelectedID.length} transaction{guidsForSelectedID.length !== 1 ? "s" : ""}
              </Badge>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <KYCTransactionList
                transactions={transactionComparisons}
                selectedGUID={selectedGUID}
                onSelectGUID={setSelectedGUID}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </CardContent>
          </Card>

          {/* Comparison View */}
          <div>
            {selectedGUID ? (
              <KYCComparisonView
                v2Records={selectedTransactionRecords}
                v3Record={undefined} // Will be populated when V3 data is available
              />
            ) : (
              <Card className="border-2 border-dashed border-border/50 bg-muted/20 h-full">
                <CardContent className="py-16">
                  <div className="text-center">
                    <FileSearch className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
                    <h3 className="text-lg font-bold text-foreground mb-1">Select a Transaction</h3>
                    <p className="text-sm text-muted-foreground">
                      Click a transaction from the list to view V2 vs V3 comparison.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <Card className="border-2 border-dashed border-border/50 bg-muted/20">
          <CardContent className="py-12">
            <div className="text-center">
              <FileSearch className="w-14 h-14 mx-auto text-muted-foreground/40 mb-3" />
              <h3 className="text-xl font-bold text-foreground mb-1">Select an ID Number</h3>
              <p className="text-muted-foreground max-w-md mx-auto text-sm">
                Choose an ID Number from the dropdown above to view all associated transactions and compare V2 vs V3 matching.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
