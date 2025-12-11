// V3 Token Comparison types
export type V3MatchType = 
  | "Exist" 
  | "Skipped" 
  | "Remainder"
  | `Does not Exist - ${number}`
  | `Partial - ${number}`;

export interface V3TokenMatch {
  Input: string;
  Bureau: string;
  Match_Type: string; // Can be "Exist", "Skipped", "Remainder", "Does not Exist - X.X", "Partial - X.X"
}

export interface V3TokenComparison {
  ComplexNumber: V3TokenMatch;
  ComplexName: V3TokenMatch;
  StreetNumber: V3TokenMatch;
  StreetName: V3TokenMatch;
  StreetType: V3TokenMatch;
  Suburb: V3TokenMatch;
  Town: V3TokenMatch;
  City: V3TokenMatch;
  PostalCode: V3TokenMatch;
  Remainder_Tokens: V3TokenMatch;
}

// V3 Rules Check types
export interface V3RuleResult {
  Input_Matched: boolean;
  Input_Missing_Fields: string[];
  Bureau_Matched: boolean;
  Bureau_Missing_Fields: string[];
}

export interface V3RulesCheck {
  "Option 1": V3RuleResult;
  "Option 2": V3RuleResult;
  "Option 3": V3RuleResult;
  "Option 4": V3RuleResult;
  "Option 5": V3RuleResult;
}

// Rule descriptions for display
export const V3_RULE_DESCRIPTIONS: Record<string, string> = {
  "Option 1": "ComplexNumber, ComplexName, StreetName",
  "Option 2": "StreetName, StreetNumber, Suburb",
  "Option 3": "ComplexNumber, ComplexName, Suburb, Town, PostalCode",
  "Option 4": "ComplexName, StreetName, PostalCode, Suburb, Town",
  "Option 5": "ComplexName, StreetName, Suburb",
};

// V3 Record from Flattened_Report sheet
export interface V3FlattenedRecord {
  KYCIndividualMatchLog_Version2_id: string;
  IDNumber: string;
  Generated_At: string;
  Input_Original_Full_Address: string;
  Bureau_Original_Full_Address: string;
  
  // V2 components (for reference)
  Input_ComplexName_v2: string;
  Input_ComplexNumber_v2: string;
  Input_StreetNumber_v2: string;
  Input_StreetName_v2: string;
  Input_Suburb_v2: string;
  Input_Town_v2: string;
  Input_PostCode_v2: string;
  Input_Line1_Line_v2: string;
  Input_Line2_Line_v2: string;
  Input_Line3_Line_v2: string;
  Input_Line4_Line_v2: string;
  Input_Line5_Line_v2: string;
  
  // V3 components (new parsing)
  Input_ComplexName_v3: string;
  Input_ComplexNumber_v3: string;
  Input_StreetNumber_v3: string;
  Input_StreetName_v3: string;
  Input_Suburb_v3: string;
  Input_Town_v3: string;
  Input_PostCode_v3: string;
  Input_InputAddress_Input_Line1_Line_v3: string;
  Input_InputAddress_Input_Line2_Line_v3: string;
  Input_InputAddress_Input_Line3_Line_v3: string;
  Input_InputAddress_Input_Line4_Line_v3: string;
  Input_InputAddress_Input_Line5_Line_v3: string;
  Input_InputAddress_PostalCode_Line_v3: string;
  
  // Bureau matching
  Bureau1_Original_Full_Address: string;
  Bureau1_Token_found_in: string;
  Bureau1_Token_high_not_exact: string;
  Bureau1_Token_partial: string;
  Bureau1_Token_none: string;
  
  // JSON results
  Token_Comparison: V3TokenComparison;
  Rule_Check: V3RulesCheck;
}

// Parsed match type result
export interface ParsedMatchType {
  type: "exist" | "skipped" | "remainder" | "partial" | "not_exist";
  score: number | null; // null for exact matches, skipped, remainder
}

// Parse match type string into structured format
export const parseMatchType = (matchType: string): ParsedMatchType => {
  if (matchType === "Exist") {
    return { type: "exist", score: 100 };
  }
  if (matchType === "Skipped") {
    return { type: "skipped", score: null };
  }
  if (matchType === "Remainder") {
    return { type: "remainder", score: null };
  }
  if (matchType.startsWith("Partial - ")) {
    const score = parseFloat(matchType.replace("Partial - ", ""));
    return { type: "partial", score: Math.round(score) };
  }
  if (matchType.startsWith("Does not Exist - ")) {
    const score = parseFloat(matchType.replace("Does not Exist - ", ""));
    return { type: "not_exist", score: Math.round(score) };
  }
  return { type: "not_exist", score: 0 };
};

// Component colors for address highlighting
export const V3_COMPONENT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  StreetNumber: { bg: "bg-violet-100 dark:bg-violet-900/40", text: "text-violet-700 dark:text-violet-300", border: "border-violet-300 dark:border-violet-700" },
  StreetName: { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-700 dark:text-blue-300", border: "border-blue-300 dark:border-blue-700" },
  StreetType: { bg: "bg-cyan-100 dark:bg-cyan-900/40", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-300 dark:border-cyan-700" },
  Suburb: { bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-300 dark:border-emerald-700" },
  Town: { bg: "bg-teal-100 dark:bg-teal-900/40", text: "text-teal-700 dark:text-teal-300", border: "border-teal-300 dark:border-teal-700" },
  City: { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-300", border: "border-amber-300 dark:border-amber-700" },
  PostalCode: { bg: "bg-rose-100 dark:bg-rose-900/40", text: "text-rose-700 dark:text-rose-300", border: "border-rose-300 dark:border-rose-700" },
  ComplexNumber: { bg: "bg-indigo-100 dark:bg-indigo-900/40", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-300 dark:border-indigo-700" },
  ComplexName: { bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-700 dark:text-purple-300", border: "border-purple-300 dark:border-purple-700" },
};
