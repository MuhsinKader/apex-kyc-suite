import { V3FlattenedRecord, V3TokenComparison, V3RulesCheck } from "@/types/kycV3";

// Hardcoded V3 data from the Excel file for ID 4911065113080
// This will be expanded as more data is provided
const V3_DATA_RAW: Array<{
  v2_id: string;
  idNumber: string;
  inputAddr: string;
  bureauAddr: string;
  tokenComparison: string;
  ruleCheck: string;
}> = [
  {
    v2_id: "3043395933",
    idNumber: "4911065113080",
    inputAddr: "4 FISCHER STREET BLOEFONTEIN BLOEFONTEIN 9301",
    bureauAddr: "4 FISCHER STREET BLOEFONTEIN 9301",
    tokenComparison: '{"ComplexNumber": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "ComplexName": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "StreetNumber": {"Input": "4", "Bureau": "4", "Match_Type": "Exist"}, "StreetName": {"Input": "Fischer", "Bureau": "Fischer", "Match_Type": "Exist"}, "StreetType": {"Input": "Street", "Bureau": "Street", "Match_Type": "Exist"}, "Suburb": {"Input": "Bloefontein", "Bureau": "Bloefontein", "Match_Type": "Exist"}, "Town": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "City": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "PostalCode": {"Input": "9301", "Bureau": "9301", "Match_Type": "Exist"}, "Remainder_Tokens": {"Input": "BLOEFONTEIN", "Bureau": "", "Match_Type": "Remainder"}}',
    ruleCheck: '{"Option 1": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexNumber", "ComplexName"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexNumber", "ComplexName"]}, "Option 2": {"Input_Matched": true, "Input_Missing_Fields": [], "Bureau_Matched": true, "Bureau_Missing_Fields": []}, "Option 3": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexNumber", "ComplexName", "Town"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexNumber", "ComplexName", "Town"]}, "Option 4": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexName", "Town"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexName", "Town"]}, "Option 5": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexName"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexName"]}}'
  },
  {
    v2_id: "3043395943",
    idNumber: "4911065113080",
    inputAddr: "4 FISCHER STREET BLOEFONTEIN BLOEFONTEIN 9301",
    bureauAddr: "4 FISCHER STREET BLOEMFONTEIN 9301",
    tokenComparison: '{"ComplexNumber": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "ComplexName": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "StreetNumber": {"Input": "4", "Bureau": "4", "Match_Type": "Exist"}, "StreetName": {"Input": "Fischer", "Bureau": "Fischer", "Match_Type": "Exist"}, "StreetType": {"Input": "Street", "Bureau": "Street", "Match_Type": "Exist"}, "Suburb": {"Input": "Bloefontein", "Bureau": "", "Match_Type": "Does not Exist - 0.0"}, "Town": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "City": {"Input": "", "Bureau": "Bloemfontein", "Match_Type": "Does not Exist - 0.0"}, "PostalCode": {"Input": "9301", "Bureau": "9301", "Match_Type": "Exist"}, "Remainder_Tokens": {"Input": "BLOEFONTEIN", "Bureau": "", "Match_Type": "Remainder"}}',
    ruleCheck: '{"Option 1": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexNumber", "ComplexName"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexNumber", "ComplexName"]}, "Option 2": {"Input_Matched": true, "Input_Missing_Fields": [], "Bureau_Matched": false, "Bureau_Missing_Fields": ["Suburb"]}, "Option 3": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexNumber", "ComplexName", "Town"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexNumber", "ComplexName", "Suburb", "Town"]}, "Option 4": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexName", "Town"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexName", "Suburb", "Town"]}, "Option 5": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexName"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexName", "Suburb"]}}'
  },
  {
    v2_id: "3043395953",
    idNumber: "4911065113080",
    inputAddr: "4 FISCHER STREET BLOEFONTEIN BLOEFONTEIN 9301",
    bureauAddr: "4 FISCHER STREET BLOEMFONTEIN BLOEMFONTEIN 9301",
    tokenComparison: '{"ComplexNumber": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "ComplexName": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "StreetNumber": {"Input": "4", "Bureau": "4", "Match_Type": "Exist"}, "StreetName": {"Input": "Fischer", "Bureau": "Fischer", "Match_Type": "Exist"}, "StreetType": {"Input": "Street", "Bureau": "Street", "Match_Type": "Exist"}, "Suburb": {"Input": "Bloefontein", "Bureau": "", "Match_Type": "Does not Exist - 0.0"}, "Town": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "City": {"Input": "", "Bureau": "Bloemfontein", "Match_Type": "Does not Exist - 0.0"}, "PostalCode": {"Input": "9301", "Bureau": "9301", "Match_Type": "Exist"}, "Remainder_Tokens": {"Input": "BLOEFONTEIN", "Bureau": "BLOEMFONTEIN", "Match_Type": "Remainder"}}',
    ruleCheck: '{"Option 1": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexNumber", "ComplexName"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexNumber", "ComplexName"]}, "Option 2": {"Input_Matched": true, "Input_Missing_Fields": [], "Bureau_Matched": false, "Bureau_Missing_Fields": ["Suburb"]}, "Option 3": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexNumber", "ComplexName", "Town"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexNumber", "ComplexName", "Suburb", "Town"]}, "Option 4": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexName", "Town"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexName", "Suburb", "Town"]}, "Option 5": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexName"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexName", "Suburb"]}}'
  },
  {
    v2_id: "3043395963",
    idNumber: "4911065113080",
    inputAddr: "4 FISCHER STREET BLOEFONTEIN BLOEFONTEIN 9301",
    bureauAddr: "4 FISCHER STREET BLOEMFONTEIN BLOEMFONTEIN",
    tokenComparison: '{"ComplexNumber": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "ComplexName": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "StreetNumber": {"Input": "4", "Bureau": "4", "Match_Type": "Exist"}, "StreetName": {"Input": "Fischer", "Bureau": "Fischer", "Match_Type": "Exist"}, "StreetType": {"Input": "Street", "Bureau": "Street", "Match_Type": "Exist"}, "Suburb": {"Input": "Bloefontein", "Bureau": "", "Match_Type": "Does not Exist - 0.0"}, "Town": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "City": {"Input": "", "Bureau": "Bloemfontein", "Match_Type": "Does not Exist - 0.0"}, "PostalCode": {"Input": "9301", "Bureau": "", "Match_Type": "Does not Exist - 0.0"}, "Remainder_Tokens": {"Input": "BLOEFONTEIN", "Bureau": "BLOEMFONTEIN", "Match_Type": "Remainder"}}',
    ruleCheck: '{"Option 1": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexNumber", "ComplexName"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexNumber", "ComplexName"]}, "Option 2": {"Input_Matched": true, "Input_Missing_Fields": [], "Bureau_Matched": false, "Bureau_Missing_Fields": ["Suburb"]}, "Option 3": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexNumber", "ComplexName", "Town"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexNumber", "ComplexName", "Suburb", "Town", "PostalCode"]}, "Option 4": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexName", "Town"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexName", "PostalCode", "Suburb", "Town"]}, "Option 5": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexName"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexName", "Suburb"]}}'
  },
  {
    v2_id: "3043395973",
    idNumber: "4911065113080",
    inputAddr: "4 FISCHER STREET BLOEFONTEIN BLOEFONTEIN 9301",
    bureauAddr: "4 FISCHER STREET WAVERLEY BLOEMFONTEIN 9301",
    tokenComparison: '{"ComplexNumber": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "ComplexName": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "StreetNumber": {"Input": "4", "Bureau": "4", "Match_Type": "Exist"}, "StreetName": {"Input": "Fischer", "Bureau": "Fischer", "Match_Type": "Exist"}, "StreetType": {"Input": "Street", "Bureau": "Street", "Match_Type": "Exist"}, "Suburb": {"Input": "Bloefontein", "Bureau": "Waverley", "Match_Type": "Does not Exist - 21.052631578947366"}, "Town": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "City": {"Input": "", "Bureau": "Bloemfontein", "Match_Type": "Does not Exist - 0.0"}, "PostalCode": {"Input": "9301", "Bureau": "9301", "Match_Type": "Exist"}, "Remainder_Tokens": {"Input": "BLOEFONTEIN", "Bureau": "", "Match_Type": "Remainder"}}',
    ruleCheck: '{"Option 1": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexNumber", "ComplexName"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexNumber", "ComplexName"]}, "Option 2": {"Input_Matched": true, "Input_Missing_Fields": [], "Bureau_Matched": true, "Bureau_Missing_Fields": []}, "Option 3": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexNumber", "ComplexName", "Town"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexNumber", "ComplexName", "Town"]}, "Option 4": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexName", "Town"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexName", "Town"]}, "Option 5": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexName"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexName"]}}'
  },
  {
    v2_id: "3043395983",
    idNumber: "4911065113080",
    inputAddr: "4 FISCHER STREET BLOEFONTEIN BLOEFONTEIN 9301",
    bureauAddr: "4 FISCHER STREET WAVERLEY 9301",
    tokenComparison: '{"ComplexNumber": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "ComplexName": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "StreetNumber": {"Input": "4", "Bureau": "4", "Match_Type": "Exist"}, "StreetName": {"Input": "Fischer", "Bureau": "Fischer", "Match_Type": "Exist"}, "StreetType": {"Input": "Street", "Bureau": "Street", "Match_Type": "Exist"}, "Suburb": {"Input": "Bloefontein", "Bureau": "Waverley", "Match_Type": "Does not Exist - 21.052631578947366"}, "Town": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "City": {"Input": "", "Bureau": "", "Match_Type": "Skipped"}, "PostalCode": {"Input": "9301", "Bureau": "9301", "Match_Type": "Exist"}, "Remainder_Tokens": {"Input": "BLOEFONTEIN", "Bureau": "", "Match_Type": "Remainder"}}',
    ruleCheck: '{"Option 1": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexNumber", "ComplexName"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexNumber", "ComplexName"]}, "Option 2": {"Input_Matched": true, "Input_Missing_Fields": [], "Bureau_Matched": true, "Bureau_Missing_Fields": []}, "Option 3": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexNumber", "ComplexName", "Town"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexNumber", "ComplexName", "Town"]}, "Option 4": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexName", "Town"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexName", "Town"]}, "Option 5": {"Input_Matched": false, "Input_Missing_Fields": ["ComplexName"], "Bureau_Matched": false, "Bureau_Missing_Fields": ["ComplexName"]}}'
  }
];

// Parse the raw data into structured V3 records
export const parseV3Data = (): Map<string, { tokenComparison: V3TokenComparison; ruleCheck: V3RulesCheck; inputAddr: string; bureauAddr: string }> => {
  const v3Map = new Map<string, { tokenComparison: V3TokenComparison; ruleCheck: V3RulesCheck; inputAddr: string; bureauAddr: string }>();
  
  for (const raw of V3_DATA_RAW) {
    try {
      // Create composite key: v2_id + IDNumber
      const key = `${raw.v2_id}_${raw.idNumber}`;
      
      const tokenComparison = JSON.parse(raw.tokenComparison) as V3TokenComparison;
      const ruleCheck = JSON.parse(raw.ruleCheck) as V3RulesCheck;
      
      v3Map.set(key, {
        tokenComparison,
        ruleCheck,
        inputAddr: raw.inputAddr,
        bureauAddr: raw.bureauAddr
      });
    } catch (e) {
      console.error("Failed to parse V3 data for:", raw.v2_id, e);
    }
  }
  
  return v3Map;
};

// Get V3 data for a specific V2 record
export const getV3DataForRecord = (
  v2Id: string, 
  idNumber: string
): { tokenComparison: V3TokenComparison; ruleCheck: V3RulesCheck; inputAddr: string; bureauAddr: string } | null => {
  const v3Map = parseV3Data();
  const key = `${v2Id}_${idNumber}`;
  return v3Map.get(key) || null;
};

// Check if an ID number has any V3 data
export const hasV3DataForID = (idNumber: string): boolean => {
  return V3_DATA_RAW.some(r => r.idNumber === idNumber);
};

// Get all ID numbers that have V3 data (for sorting IDs with V3 first)
export const getIDsWithV3Data = (): Set<string> => {
  return new Set(V3_DATA_RAW.map(r => r.idNumber));
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
