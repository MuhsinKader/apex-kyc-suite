import { KYCAddressRecord, AddressComponent } from "@/types/kyc";
import kycDataRaw from "@/data/kyc-address-examples.txt?raw";

/**
 * Parses tab-delimited data from the TXT file.
 */
export const parseKYCData = (): KYCAddressRecord[] => {
  const records: KYCAddressRecord[] = [];
  
  // Split by lines (keep empty lines to detect record boundaries)
  const lines = kycDataRaw.split('\n');
  
  if (lines.length === 0) return records;
  
  // First line is headers (tab-delimited)
  const headers = lines[0].split('\t').map(h => h.trim());
  const expectedColumnCount = headers.length;
  
  let currentRecord: Record<string, string | number> | null = null;
  let errorLines: string[] = [];
  
  const finalizeRecord = () => {
    if (currentRecord && currentRecord.GUID && currentRecord.IDNumber) {
      // Merge collected error lines into ErrorList
      if (errorLines.length > 0) {
        currentRecord.ErrorList = errorLines.join('\n');
      }
      records.push(currentRecord as unknown as KYCAddressRecord);
    }
    currentRecord = null;
    errorLines = [];
  };
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Skip empty lines but finalize any pending record
    if (trimmedLine.length === 0) {
      continue;
    }
    
    const values = line.split('\t');
    
    // If this line has enough columns, it's a new data row
    if (values.length >= expectedColumnCount - 5) { // Allow some tolerance for missing trailing tabs
      // Finalize previous record first
      finalizeRecord();
      
      // Parse new record
      currentRecord = {};
      headers.forEach((header, index) => {
        const value = values[index]?.trim() || "";
        if (header === "Overall_Match_Score") {
          currentRecord![header] = parseInt(value, 10) || 0;
        } else {
          currentRecord![header] = value;
        }
      });
    } else {
      // This line is an ErrorList continuation (not enough columns to be a data row)
      if (currentRecord) {
        errorLines.push(trimmedLine);
      }
    }
  }
  
  // Finalize last record
  finalizeRecord();
  
  return records;
};

export const getDistinctIDNumbers = (records: KYCAddressRecord[]): string[] => {
  const idSet = new Set<string>();
  records.forEach(r => {
    if (r.IDNumber) idSet.add(r.IDNumber);
  });
  return Array.from(idSet).sort();
};

export const getRecordsByIDNumber = (records: KYCAddressRecord[], idNumber: string): KYCAddressRecord[] => {
  return records.filter(r => r.IDNumber === idNumber);
};

export const getDistinctGUIDs = (records: KYCAddressRecord[]): string[] => {
  const guidSet = new Set<string>();
  records.forEach(r => {
    if (r.GUID) guidSet.add(r.GUID);
  });
  return Array.from(guidSet);
};

export const getGUIDsForIDNumber = (records: KYCAddressRecord[], idNumber: string): string[] => {
  const guidSet = new Set<string>();
  records.filter(r => r.IDNumber === idNumber).forEach(r => {
    if (r.GUID) guidSet.add(r.GUID);
  });
  return Array.from(guidSet);
};

export const getRecordsByGUID = (records: KYCAddressRecord[], guid: string): KYCAddressRecord[] => {
  return records.filter(r => r.GUID === guid);
};

export const getAddressComponents = (record: KYCAddressRecord): AddressComponent[] => {
  // V2 has NO component-level matching data - only raw input/bureau values
  // isMatch is undefined/null for V2 - we don't fabricate this data
  const components: AddressComponent[] = [
    {
      label: "Line 1",
      inputValue: record.Input_Line_1,
      bureauValue: record.Bureau_Line_1,
    },
    {
      label: "Line 2",
      inputValue: record.Input_Line_2,
      bureauValue: record.Bureau_Line_2,
    },
    {
      label: "Line 3 (Suburb)",
      inputValue: record.Input_Line_3,
      bureauValue: record.Bureau_Line_3,
    },
    {
      label: "Line 4 (Town)",
      inputValue: record.Input_Line_4,
      bureauValue: record.Bureau_Line_4,
    },
    {
      label: "Post Code",
      inputValue: record.Input_Line_Post_Code,
      bureauValue: record.Bureau_Line_Post_Code,
    },
    {
      label: "Street Number",
      inputValue: record.Input_Street_Number,
      bureauValue: record.Bureau_Street_Number,
    },
    {
      label: "Street Name",
      inputValue: record.Input_Street_Name,
      bureauValue: record.Bureau_Street_Name,
    },
    {
      label: "Suburb",
      inputValue: record.Input_Suburb,
      bureauValue: record.Bureau_Suburb,
    },
    {
      label: "Town",
      inputValue: record.Input_Town,
      bureauValue: record.Bureau_Town,
    },
  ];
  
  return components;
};

const normalizeCompare = (a: string, b: string): boolean => {
  const normalize = (s: string) => s?.toLowerCase().trim().replace(/\s+/g, " ") || "";
  return normalize(a) === normalize(b);
};

export const getScoreColor = (score: number): string => {
  if (score >= 90) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (score >= 70) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-red-600 bg-red-50 border-red-200";
};

export const getScoreBgGradient = (score: number): string => {
  if (score >= 90) return "from-emerald-500 to-emerald-600";
  if (score >= 70) return "from-amber-500 to-amber-600";
  return "from-red-500 to-red-600";
};

export const parseErrorList = (errorList: string): string[] => {
  if (!errorList) return [];
  return errorList
    .split(/\n|<br\s*\/?>/gi)
    .map(e => e.trim())
    .filter(Boolean);
};

// Get the outcome type based on RecordMatchResult
export type OutcomeType = "pass" | "caution" | "fail";

export const getOutcomeType = (recordMatchResult: string): OutcomeType => {
  const result = recordMatchResult?.toLowerCase() || "";
  if (result.includes("matched on exact") || result.includes("matched on rules")) {
    return "pass";
  }
  if (result.includes("matched on fuzzy")) {
    return "caution";
  }
  return "fail";
};

export const getOutcomeColor = (outcome: OutcomeType): string => {
  switch (outcome) {
    case "pass":
      return "bg-emerald-600 hover:bg-emerald-700 text-white";
    case "caution":
      return "bg-amber-500 hover:bg-amber-600 text-white";
    case "fail":
      return "bg-red-600 hover:bg-red-700 text-white";
  }
};
