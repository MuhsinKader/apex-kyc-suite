// V3 Parser - Uses the V3 data file for lookups
import { V3TokenComparison, V3RulesCheck } from "@/types/kycV3";
import { 
  V3AddressLines, 
  V3DataRecord, 
  getV3DataByV2Id, 
  hasV3DataForV2Id,
  getV3IDNumbers,
  hasV3DataForIDNumber
} from "@/data/kyc-v3-data";

// Re-export types
export type { V3AddressLines };

// Get V3 data for a specific V2 record
export const getV3DataForRecord = (v2Id: string, idNumber: string): {
  tokenComparison: V3TokenComparison;
  ruleCheck: V3RulesCheck; 
  inputAddr: string; 
  bureauAddr: string;
  inputLines: V3AddressLines;
  bureauLines: V3AddressLines;
} | null => {
  const record = getV3DataByV2Id(v2Id);
  if (record && record.idNumber === idNumber) {
    return {
      tokenComparison: record.tokenComparison,
      ruleCheck: record.ruleCheck,
      inputAddr: record.inputAddr,
      bureauAddr: record.bureauAddr,
      inputLines: record.inputLines,
      bureauLines: record.bureauLines
    };
  }
  return null;
};

// Check if an ID number has any V3 data
export const hasV3DataForID = (idNumber: string): boolean => {
  return hasV3DataForIDNumber(idNumber);
};

// Get all ID numbers that have V3 data (for sorting IDs with V3 first)
export const getIDsWithV3Data = (): Set<string> => {
  return getV3IDNumbers();
};

// Sort ID numbers: those with V3 data come first
export const sortIDsByV3Availability = (ids: string[]): string[] => {
  const idsWithV3 = getIDsWithV3Data();
  return [...ids].sort((a, b) => {
    const aHasV3 = idsWithV3.has(a);
    const bHasV3 = idsWithV3.has(b);
    if (aHasV3 && !bHasV3) return -1;
    if (!aHasV3 && bHasV3) return 1;
    return a.localeCompare(b);
  });
};
