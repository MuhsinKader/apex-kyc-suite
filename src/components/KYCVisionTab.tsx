import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  parseKYCData, 
  getDistinctIDNumbers, 
  getDistinctGUIDs,
  getGUIDsForIDNumber,
  getRecordsByGUID,
  getOutcomeType
} from "@/utils/kycDataParser";
import { KYCCompactHeader } from "./kyc-vision/KYCCompactHeader";
import { InputAddressHeroCard } from "./kyc-vision/InputAddressHeroCard";
import { KYCMasterDetailView } from "./kyc-vision/KYCMasterDetailView";
import { FileSearch, Database, Users, GitCompare } from "lucide-react";

export const KYCVisionTab = () => {
  const [selectedIDNumber, setSelectedIDNumber] = useState<string>("");
  const [selectedGUID, setSelectedGUID] = useState<string | null>(null);
  
  const allRecords = useMemo(() => parseKYCData(), []);
  const distinctIDNumbers = useMemo(() => getDistinctIDNumbers(allRecords), [allRecords]);
  const totalTransactions = useMemo(() => getDistinctGUIDs(allRecords).length, [allRecords]);
  
  // Get GUIDs for selected ID
  const guidsForSelectedID = useMemo(() => {
    if (!selectedIDNumber) return [];
    return getGUIDsForIDNumber(allRecords, selectedIDNumber);
  }, [allRecords, selectedIDNumber]);

  // Get records for selected transaction
  const selectedTransactionRecords = useMemo(() => {
    if (!selectedGUID || !selectedIDNumber) return [];
    return getRecordsByGUID(allRecords, selectedGUID).filter(r => r.IDNumber === selectedIDNumber);
  }, [allRecords, selectedGUID, selectedIDNumber]);

  // Get input address from first record (all records in a GUID share the same input address)
  const inputAddress = selectedTransactionRecords[0]?.Input_Original_Full_Address || "";

  // Calculate stats
  const matchedCount = selectedTransactionRecords.filter(r => getOutcomeType(r.RecordMatchResult) === "pass").length;
  const bestScore = selectedTransactionRecords.length > 0 
    ? Math.max(...selectedTransactionRecords.map(r => r.Overall_Match_Score))
    : 0;

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

  // Get GUID count for an ID
  const getGUIDCount = (id: string) => getGUIDsForIDNumber(allRecords, id).length;

  return (
    <div className="space-y-4">
      {/* Overview Stats Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{distinctIDNumbers.length}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Distinct IDs</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border">
          <div className="p-2 rounded-lg bg-accent/10">
            <GitCompare className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{totalTransactions}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Transactions</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border">
          <div className="p-2 rounded-lg bg-secondary">
            <Database className="w-4 h-4 text-secondary-foreground" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{allRecords.length.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Bureau Records</p>
          </div>
        </div>
      </div>

      {/* Control Ribbon (slim) */}
      <KYCCompactHeader
        distinctIDNumbers={distinctIDNumbers}
        selectedIDNumber={selectedIDNumber}
        onIDChange={handleIDChange}
        guidsForSelectedID={guidsForSelectedID}
        selectedGUID={selectedGUID}
        onGUIDChange={setSelectedGUID}
        getGUIDCount={getGUIDCount}
      />

      {/* Input Address Hero Card (separate, prominent) */}
      {selectedGUID && inputAddress && (
        <InputAddressHeroCard
          inputAddress={inputAddress}
          totalBureauRecords={selectedTransactionRecords.length}
          matchedCount={matchedCount}
          bestScore={bestScore}
        />
      )}

      {/* Main Content: Bureau Address Table with Expandable Rows */}
      {selectedGUID && selectedTransactionRecords.length > 0 ? (
        <KYCMasterDetailView records={selectedTransactionRecords} />
      ) : (
        <Card className="border-2 border-dashed border-border/50 bg-muted/10">
          <CardContent className="py-16">
            <div className="text-center">
              <FileSearch className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <h3 className="text-lg font-bold text-foreground mb-1">
                {!selectedIDNumber ? "Select an ID Number" : "Select a Transaction"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {!selectedIDNumber 
                  ? "Choose an ID Number from the dropdown above to view all associated transactions."
                  : "Choose a transaction (GUID) to view all bureau address comparisons."
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
