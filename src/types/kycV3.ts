// V3 Address Validity based on Address_Helpers.py
export interface KYCAddressValidity {
  Address_Valid: boolean;
  Valid_Based_On: string; // Rule name e.g., "Rule 2: Street Name + Street Number + Suburb"
  Missing_Components: string[];
}

// Canonical address lines from V3 parsing
export interface KYCCanonicalLines {
  Line1: string; // Complex Number + Complex Name
  Line2: string; // Street Number + Street Name + Street Type
  Line3: string; // Suburb
  Line4: string; // Town
  Line5: string; // City
  PostalCode: string;
}

// V3 Address components extracted
export interface KYCV3Components {
  ComplexNumber?: string;
  ComplexName?: string;
  StreetNumber?: string;
  StreetName?: string;
  StreetType?: string;
  Suburb?: string;
  Town?: string;
  City?: string;
  PostalCode?: string;
}

// Full V3 record extending V2 with additional V3 fields
export interface KYCV3Record {
  // Same identifiers
  GUID: string;
  IDNumber: string;
  
  // V3 specific fields
  Input_Validity: KYCAddressValidity;
  Bureau_Validity: KYCAddressValidity;
  Input_Canonical: KYCCanonicalLines;
  Bureau_Canonical: KYCCanonicalLines;
  Input_Components: KYCV3Components;
  Bureau_Components: KYCV3Components;
  
  // V3 scoring
  Overall_Match_Score: number;
  RecordMatchResult: string;
  ErrorList: string;
}

// Transaction comparison data structure
export interface TransactionComparison {
  idNumber: string;
  guid: string;
  v2BestScore: number;
  v2BestOutcome: string;
  v2RecordCount: number;
  v3Score?: number;
  v3Outcome?: string;
  scoreDelta?: number;
  outcomeChanged?: boolean;
}

// Component match status
export type MatchStatus = "exact" | "normalized" | "partial" | "mismatch" | "missing";

export interface ComponentMatchRow {
  componentLabel: string;
  v2InputValue?: string;
  v2BureauValue?: string;
  v2MatchStatus?: MatchStatus;
  v3InputValue?: string;
  v3BureauValue?: string;
  v3MatchStatus?: MatchStatus;
  changeType?: "improved" | "same" | "regressed";
}
