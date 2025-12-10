import { KYCAddressRecord, AddressComponent } from "@/types/kyc";
import kycDataRaw from "@/data/kyc-address-examples.csv?raw";

/**
 * Parses CSV with proper handling of quoted fields containing newlines.
 * The CSV uses semicolon (;) as delimiter and double quotes for fields with special chars.
 */
export const parseKYCData = (): KYCAddressRecord[] => {
  const records: KYCAddressRecord[] = [];
  
  // Proper CSV parsing that handles quoted fields with embedded newlines
  const lines = parseCSVWithQuotedFields(kycDataRaw, ";");
  
  if (lines.length === 0) return records;
  
  const headers = lines[0].map(h => h.trim());
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i];
    const record: Record<string, string | number> = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim() || "";
      if (header === "Overall_Match_Score") {
        record[header] = parseInt(value, 10) || 0;
      } else {
        record[header] = value;
      }
    });
    
    // Only add if it has valid data
    if (record.GUID && record.IDNumber) {
      records.push(record as unknown as KYCAddressRecord);
    }
  }
  
  return records;
};

/**
 * Parses CSV content handling quoted fields that may contain the delimiter or newlines.
 */
function parseCSVWithQuotedFields(csvContent: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let insideQuotes = false;
  
  for (let i = 0; i < csvContent.length; i++) {
    const char = csvContent[i];
    const nextChar = csvContent[i + 1];
    
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote inside quoted field
        currentField += '"';
        i++; // Skip the next quote
      } else {
        // Toggle quote mode
        insideQuotes = !insideQuotes;
      }
    } else if (char === delimiter && !insideQuotes) {
      // End of field
      currentRow.push(currentField);
      currentField = "";
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      // End of row (outside quotes)
      if (char === '\r' && nextChar === '\n') {
        i++; // Skip \n in \r\n
      }
      if (currentField || currentRow.length > 0) {
        currentRow.push(currentField);
        if (currentRow.some(f => f.trim())) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = "";
      }
    } else {
      currentField += char;
    }
  }
  
  // Don't forget the last field/row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some(f => f.trim())) {
      rows.push(currentRow);
    }
  }
  
  return rows;
}

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
  const components: AddressComponent[] = [
    {
      label: "Line 1",
      inputValue: record.Input_Line_1,
      bureauValue: record.Bureau_Line_1,
      isMatch: normalizeCompare(record.Input_Line_1, record.Bureau_Line_1),
    },
    {
      label: "Line 2",
      inputValue: record.Input_Line_2,
      bureauValue: record.Bureau_Line_2,
      isMatch: normalizeCompare(record.Input_Line_2, record.Bureau_Line_2),
    },
    {
      label: "Line 3 (Suburb)",
      inputValue: record.Input_Line_3,
      bureauValue: record.Bureau_Line_3,
      isMatch: normalizeCompare(record.Input_Line_3, record.Bureau_Line_3),
    },
    {
      label: "Line 4 (Town)",
      inputValue: record.Input_Line_4,
      bureauValue: record.Bureau_Line_4,
      isMatch: normalizeCompare(record.Input_Line_4, record.Bureau_Line_4),
    },
    {
      label: "Post Code",
      inputValue: record.Input_Line_Post_Code,
      bureauValue: record.Bureau_Line_Post_Code,
      isMatch: normalizeCompare(record.Input_Line_Post_Code, record.Bureau_Line_Post_Code),
    },
    {
      label: "Street Number",
      inputValue: record.Input_Street_Number,
      bureauValue: record.Bureau_Street_Number,
      isMatch: normalizeCompare(record.Input_Street_Number, record.Bureau_Street_Number),
    },
    {
      label: "Street Name",
      inputValue: record.Input_Street_Name,
      bureauValue: record.Bureau_Street_Name,
      isMatch: normalizeCompare(record.Input_Street_Name, record.Bureau_Street_Name),
    },
    {
      label: "Suburb",
      inputValue: record.Input_Suburb,
      bureauValue: record.Bureau_Suburb,
      isMatch: normalizeCompare(record.Input_Suburb, record.Bureau_Suburb),
    },
    {
      label: "Town",
      inputValue: record.Input_Town,
      bureauValue: record.Bureau_Town,
      isMatch: normalizeCompare(record.Input_Town, record.Bureau_Town),
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
  // Handle newlines and <br/> separators from the CSV
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
