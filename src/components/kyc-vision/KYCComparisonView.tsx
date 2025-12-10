import { KYCAddressRecord } from "@/types/kyc";
import { KYCV3Record } from "@/types/kycV3";
import { KYCV2Panel } from "./KYCV2Panel";
import { KYCV3Panel } from "./KYCV3Panel";
import { KYCDeltaSpine } from "./KYCDeltaSpine";

interface KYCComparisonViewProps {
  v2Records: KYCAddressRecord[];
  v3Record?: KYCV3Record;
}

export const KYCComparisonView = ({ v2Records, v3Record }: KYCComparisonViewProps) => {
  // Find the best V2 record (highest score with "Matched on" status, or just highest score)
  const sortedRecords = [...v2Records].sort((a, b) => {
    const aMatched = a.RecordMatchResult.toLowerCase().includes("matched on");
    const bMatched = b.RecordMatchResult.toLowerCase().includes("matched on");
    
    if (aMatched && !bMatched) return -1;
    if (!aMatched && bMatched) return 1;
    return b.Overall_Match_Score - a.Overall_Match_Score;
  });

  const bestRecord = sortedRecords[0];

  if (!bestRecord) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No records found for this transaction.
      </div>
    );
  }

  // Calculate validity (simplified for V2 - based on having key components)
  const v2Valid = !!(
    bestRecord.Input_Street_Name && 
    bestRecord.Input_Street_Number && 
    bestRecord.Input_Suburb
  );

  const v3Valid = v3Record?.Input_Validity?.Address_Valid ?? v2Valid;

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-2">
      {/* V2 Panel */}
      <KYCV2Panel records={v2Records} bestRecord={bestRecord} />

      {/* Delta Spine */}
      <div className="flex items-stretch">
        <div className="border-l border-r border-dashed border-border/50 bg-muted/20">
          <KYCDeltaSpine
            v2Score={bestRecord.Overall_Match_Score}
            v3Score={v3Record?.Overall_Match_Score}
            v2Outcome={bestRecord.RecordMatchResult}
            v3Outcome={v3Record?.RecordMatchResult}
            v2Valid={v2Valid}
            v3Valid={v3Valid}
          />
        </div>
      </div>

      {/* V3 Panel */}
      <KYCV3Panel v2BestRecord={bestRecord} v3Record={v3Record} />
    </div>
  );
};
