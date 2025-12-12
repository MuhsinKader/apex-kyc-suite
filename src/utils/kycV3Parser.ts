import { V3TokenComparison, V3RulesCheck } from "@/types/kycV3";

// V3 Address Lines type
export interface V3AddressLines {
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  line5: string;
  postCode: string;
}

interface V3RawData {
  v2_id: string;
  idNumber: string;
  inputAddr: string;
  bureauAddr: string;
  tokenComparison: V3TokenComparison;
  ruleCheck: V3RulesCheck;
  inputLines: V3AddressLines;
  bureauLines: V3AddressLines;
}

// V3 data extracted from the Excel files
const V3_DATA_RAW: V3RawData[] = [
  // ===== ID: 6211040060086 =====
  {
    v2_id: "3043497963",
    idNumber: "6211040060086",
    inputAddr: "21 FAIRVIEW MEMORIAL LANE CRAIGAVON JOHANNESBURG 2191",
    bureauAddr: "21 FAIRVIEW MEMORIAL LANE CRAIGAVON 2191",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "21", Bureau: "21", Match_Type: "Exist" },
      StreetName: { Input: "Fairview Memorial", Bureau: "Fairview Memorial", Match_Type: "Exist" },
      StreetType: { Input: "Lane", Bureau: "Lane", Match_Type: "Exist" },
      Suburb: { Input: "Craigavon", Bureau: "Craigavon", Match_Type: "Exist" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "Johannesburg", Bureau: "", Match_Type: "Does not Exist - 0.0" },
      PostalCode: { Input: "2191", Bureau: "2191", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "21 FAIRVIEW", line2: "MEMORIAL LANE", line3: "CRAIGAVON", line4: "JOHANNESBURG", line5: "", postCode: "2191" },
    bureauLines: { line1: "21 FAIRVIEW", line2: "MEMORIAL LANE", line3: "", line4: "CRAIGAVON", line5: "", postCode: "2191" }
  },
  {
    v2_id: "3043497973",
    idNumber: "6211040060086",
    inputAddr: "21 FAIRVIEW MEMORIAL LANE CRAIGAVON JOHANNESBURG 2191",
    bureauAddr: "21 FAIRVIEW MEMORIAL LANE CRAIGAVON JOHANNESBURG 2191",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "21", Bureau: "21", Match_Type: "Exist" },
      StreetName: { Input: "Fairview Memorial", Bureau: "Fairview Memorial", Match_Type: "Exist" },
      StreetType: { Input: "Lane", Bureau: "Lane", Match_Type: "Exist" },
      Suburb: { Input: "Craigavon", Bureau: "Craigavon", Match_Type: "Exist" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "Johannesburg", Bureau: "Johannesburg", Match_Type: "Exist" },
      PostalCode: { Input: "2191", Bureau: "2191", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "21 FAIRVIEW", line2: "MEMORIAL LANE", line3: "CRAIGAVON", line4: "JOHANNESBURG", line5: "", postCode: "2191" },
    bureauLines: { line1: "21 FAIRVIEW", line2: "MEMORIAL LANE", line3: "CRAIGAVON", line4: "JOHANNESBURG", line5: "", postCode: "2191" }
  },
  {
    v2_id: "3043497983",
    idNumber: "6211040060086",
    inputAddr: "21 FAIRVIEW MEMORIAL LANE CRAIGAVON JOHANNESBURG 2191",
    bureauAddr: "21 FAIRVIEW MEMORIAL LANE CRAIGAVON 2191",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "21", Bureau: "21", Match_Type: "Exist" },
      StreetName: { Input: "Fairview Memorial", Bureau: "Fairview Memorial", Match_Type: "Exist" },
      StreetType: { Input: "Lane", Bureau: "Lane", Match_Type: "Exist" },
      Suburb: { Input: "Craigavon", Bureau: "Craigavon", Match_Type: "Exist" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "Johannesburg", Bureau: "", Match_Type: "Does not Exist - 0.0" },
      PostalCode: { Input: "2191", Bureau: "2191", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "21 FAIRVIEW", line2: "MEMORIAL LANE", line3: "CRAIGAVON", line4: "JOHANNESBURG", line5: "", postCode: "2191" },
    bureauLines: { line1: "21 FAIRVIEW", line2: "MEMORIAL LANE", line3: "CRAIGAVON", line4: "", line5: "", postCode: "2191" }
  },
  {
    v2_id: "3043497993",
    idNumber: "6211040060086",
    inputAddr: "21 FAIRVIEW MEMORIAL LANE CRAIGAVON JOHANNESBURG 2191",
    bureauAddr: "21 FAIRVIEW MEMORIAL LANE FOUR WAYS JOHANNESBURG 002191",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "21", Bureau: "21", Match_Type: "Exist" },
      StreetName: { Input: "Fairview Memorial", Bureau: "Fairview Memorial", Match_Type: "Exist" },
      StreetType: { Input: "Lane", Bureau: "Lane", Match_Type: "Exist" },
      Suburb: { Input: "Craigavon", Bureau: "Four Ways", Match_Type: "Does not Exist - 30.0" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "Johannesburg", Bureau: "Johannesburg", Match_Type: "Exist" },
      PostalCode: { Input: "2191", Bureau: "002191", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "21 FAIRVIEW", line2: "MEMORIAL LANE", line3: "CRAIGAVON", line4: "JOHANNESBURG", line5: "", postCode: "2191" },
    bureauLines: { line1: "21 FAIRVIEW", line2: "MEMORIAL LANE", line3: "FOUR WAYS", line4: "JOHANNESBURG", line5: "", postCode: "002191" }
  },

  // ===== ID: 6403090248089 =====
  {
    v2_id: "3044671103",
    idNumber: "6403090248089",
    inputAddr: "6955 MABOE STREET RATANDA RATANDA 1441",
    bureauAddr: "6955 MABOE STREET RATANDA SOUTH AFRICA 1441",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "6955", Bureau: "6955", Match_Type: "Exist" },
      StreetName: { Input: "Maboe", Bureau: "Maboe", Match_Type: "Exist" },
      StreetType: { Input: "Street", Bureau: "Street", Match_Type: "Exist" },
      Suburb: { Input: "Ratanda", Bureau: "Ratanda South Africa", Match_Type: "Does not Exist - 51.85" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "", Bureau: "", Match_Type: "Skipped" },
      PostalCode: { Input: "1441", Bureau: "1441", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "RATANDA", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "6955 MABOE STREET", line2: "RATANDA", line3: "RATANDA", line4: "", line5: "", postCode: "1441" },
    bureauLines: { line1: "6955 MABOE STREET", line2: "RATANDA SOUTH AFRICA", line3: "", line4: "", line5: "", postCode: "1441" }
  },
  {
    v2_id: "3044671113",
    idNumber: "6403090248089",
    inputAddr: "6955 MABOE STREET RATANDA RATANDA 1441",
    bureauAddr: "6955 MABOE STREET RATANDA HEIDELBERG 1441",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "6955", Bureau: "6955", Match_Type: "Exist" },
      StreetName: { Input: "Maboe", Bureau: "Maboe", Match_Type: "Exist" },
      StreetType: { Input: "Street", Bureau: "Street", Match_Type: "Exist" },
      Suburb: { Input: "Ratanda", Bureau: "Ratanda Heidelberg", Match_Type: "Does not Exist - 56.0" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "", Bureau: "", Match_Type: "Skipped" },
      PostalCode: { Input: "1441", Bureau: "1441", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "RATANDA", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "6955 MABOE STREET", line2: "RATANDA", line3: "RATANDA", line4: "", line5: "", postCode: "1441" },
    bureauLines: { line1: "6955 MABOE STREET", line2: "RATANDA", line3: "HEIDELBERG", line4: "", line5: "", postCode: "1441" }
  },
  {
    v2_id: "3044671123",
    idNumber: "6403090248089",
    inputAddr: "6955 MABOE STREET RATANDA RATANDA 1441",
    bureauAddr: "6955 MABOE STREET RATANDA RATANDA 1441",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "6955", Bureau: "6955", Match_Type: "Exist" },
      StreetName: { Input: "Maboe", Bureau: "Maboe", Match_Type: "Exist" },
      StreetType: { Input: "Street", Bureau: "Street", Match_Type: "Exist" },
      Suburb: { Input: "Ratanda", Bureau: "Ratanda", Match_Type: "Exist" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "", Bureau: "", Match_Type: "Skipped" },
      PostalCode: { Input: "1441", Bureau: "1441", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "RATANDA", Bureau: "RATANDA", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "6955 MABOE STREET", line2: "RATANDA", line3: "RATANDA", line4: "", line5: "", postCode: "1441" },
    bureauLines: { line1: "6955 MABOE STREET", line2: "RATANDA", line3: "RATANDA", line4: "", line5: "", postCode: "1441" }
  },

  // ===== ID: 6407295082086 =====
  {
    v2_id: "3044705663",
    idNumber: "6407295082086",
    inputAddr: "24 WILKINSON AVENUE GLENVISTA JOHANNESBURG 2091",
    bureauAddr: "24 WILKINSON AVENUE GLENVISTA 2091",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "24", Bureau: "24", Match_Type: "Exist" },
      StreetName: { Input: "Wilkinson", Bureau: "Wilkinson", Match_Type: "Exist" },
      StreetType: { Input: "Avenue", Bureau: "Avenue", Match_Type: "Exist" },
      Suburb: { Input: "Glenvista", Bureau: "Glenvista", Match_Type: "Exist" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "Johannesburg", Bureau: "", Match_Type: "Does not Exist - 0.0" },
      PostalCode: { Input: "2091", Bureau: "2091", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "24 WILKINSON AVENUE", line2: "GLENVISTA", line3: "JOHANNESBURG", line4: "", line5: "", postCode: "2091" },
    bureauLines: { line1: "24 WILKINSON AVENUE", line2: "GLENVISTA", line3: "", line4: "", line5: "", postCode: "2091" }
  },
  {
    v2_id: "3044705673",
    idNumber: "6407295082086",
    inputAddr: "24 WILKINSON AVENUE GLENVISTA JOHANNESBURG 2091",
    bureauAddr: "24 WILKINSON AVENUE GLENVISTA 2091",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "24", Bureau: "24", Match_Type: "Exist" },
      StreetName: { Input: "Wilkinson", Bureau: "Wilkinson", Match_Type: "Exist" },
      StreetType: { Input: "Avenue", Bureau: "Avenue", Match_Type: "Exist" },
      Suburb: { Input: "Glenvista", Bureau: "Glenvista", Match_Type: "Exist" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "Johannesburg", Bureau: "", Match_Type: "Does not Exist - 0.0" },
      PostalCode: { Input: "2091", Bureau: "2091", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "24 WILKINSON AVENUE", line2: "GLENVISTA", line3: "JOHANNESBURG", line4: "", line5: "", postCode: "2091" },
    bureauLines: { line1: "24 WILKINSON AVENUE", line2: "GLENVISTA", line3: "", line4: "", line5: "", postCode: "2091" }
  },
  {
    v2_id: "3044705693",
    idNumber: "6407295082086",
    inputAddr: "24 WILKINSON AVENUE GLENVISTA JOHANNESBURG 2091",
    bureauAddr: "24 WILKINSON AVENUE GLENVISTA JOHANNESBURG 2091",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "24", Bureau: "24", Match_Type: "Exist" },
      StreetName: { Input: "Wilkinson", Bureau: "Wilkinson", Match_Type: "Exist" },
      StreetType: { Input: "Avenue", Bureau: "Avenue", Match_Type: "Exist" },
      Suburb: { Input: "Glenvista", Bureau: "Glenvista", Match_Type: "Exist" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "Johannesburg", Bureau: "Johannesburg", Match_Type: "Exist" },
      PostalCode: { Input: "2091", Bureau: "2091", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "24 WILKINSON AVENUE", line2: "GLENVISTA", line3: "JOHANNESBURG", line4: "", line5: "", postCode: "2091" },
    bureauLines: { line1: "24 WILKINSON AVENUE", line2: "GLENVISTA", line3: "JOHANNESBURG", line4: "", line5: "", postCode: "2091" }
  },

  // ===== ID: 6508305199081 =====
  {
    v2_id: "3044059873",
    idNumber: "6508305199081",
    inputAddr: "34 WIGER STREET CAPETOWN CAPETOWN 7100",
    bureauAddr: "34 VICKERS STREET THE HAGUE DELFT BLUE DOWNS 7100",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "34", Bureau: "34", Match_Type: "Exist" },
      StreetName: { Input: "Wiger", Bureau: "Vickers", Match_Type: "Does not Exist - 50.0" },
      StreetType: { Input: "Street", Bureau: "Street", Match_Type: "Exist" },
      Suburb: { Input: "Capetown", Bureau: "The Hague Delft Blue Downs", Match_Type: "Does not Exist - 35.29" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "", Bureau: "", Match_Type: "Skipped" },
      PostalCode: { Input: "7100", Bureau: "7100", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "CAPETOWN", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "34 WIGER STREET", line2: "CAPETOWN", line3: "CAPETOWN", line4: "", line5: "", postCode: "7100" },
    bureauLines: { line1: "34 VICKERS STREET", line2: "THE HAGUE DELFT BLUE DOWNS", line3: "", line4: "", line5: "", postCode: "7100" }
  },
  {
    v2_id: "3044059883",
    idNumber: "6508305199081",
    inputAddr: "34 WIGER STREET CAPETOWN CAPETOWN 7100",
    bureauAddr: "34 VICKERS STREET THE HAGUE DELFT BLUE DOWNS 7100",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "34", Bureau: "34", Match_Type: "Exist" },
      StreetName: { Input: "Wiger", Bureau: "Vickers", Match_Type: "Does not Exist - 50.0" },
      StreetType: { Input: "Street", Bureau: "Street", Match_Type: "Exist" },
      Suburb: { Input: "Capetown", Bureau: "The Hague Delft Blue Downs", Match_Type: "Does not Exist - 35.29" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "", Bureau: "", Match_Type: "Skipped" },
      PostalCode: { Input: "7100", Bureau: "7100", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "CAPETOWN", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "34 WIGER STREET", line2: "CAPETOWN", line3: "CAPETOWN", line4: "", line5: "", postCode: "7100" },
    bureauLines: { line1: "34 VICKERS STREET", line2: "THE HAGUE DELFT BLUE DOWNS", line3: "", line4: "", line5: "", postCode: "7100" }
  },

  // ===== ID: 7305125733085 =====
  {
    v2_id: "3044063003",
    idNumber: "7305125733085",
    inputAddr: "3818 MODISENYANE STREET ROOCKLANDS BLOEMFONTEIN 9323",
    bureauAddr: "3818 MODISENYANE STREET BLOEMFONTEIN 9323",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "3818", Bureau: "3818", Match_Type: "Exist" },
      StreetName: { Input: "Modisenyane", Bureau: "Modisenyane", Match_Type: "Exist" },
      StreetType: { Input: "Street", Bureau: "Street", Match_Type: "Exist" },
      Suburb: { Input: "Roocklands", Bureau: "", Match_Type: "Does not Exist - 0.0" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "Bloemfontein", Bureau: "Bloemfontein", Match_Type: "Exist" },
      PostalCode: { Input: "9323", Bureau: "9323", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: false, Bureau_Missing_Fields: ["Suburb"] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Suburb", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Suburb", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Suburb"] }
    },
    inputLines: { line1: "3818 MODISENYANE STREET", line2: "ROOCKLANDS", line3: "BLOEMFONTEIN", line4: "", line5: "", postCode: "9323" },
    bureauLines: { line1: "3818 MODISENYANE STREET", line2: "", line3: "BLOEMFONTEIN", line4: "", line5: "", postCode: "9323" }
  },
  {
    v2_id: "3044063023",
    idNumber: "7305125733085",
    inputAddr: "3818 MODISENYANE STREET ROOCKLANDS BLOEMFONTEIN 9323",
    bureauAddr: "3818 MODISENYANE STREET ROCKLANDS BLOEMFONTEIN 9301",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "3818", Bureau: "3818", Match_Type: "Exist" },
      StreetName: { Input: "Modisenyane", Bureau: "Modisenyane", Match_Type: "Exist" },
      StreetType: { Input: "Street", Bureau: "Street", Match_Type: "Exist" },
      Suburb: { Input: "Roocklands", Bureau: "Rocklands", Match_Type: "Exist (Mispelt/High) - 94.74" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "Bloemfontein", Bureau: "Bloemfontein", Match_Type: "Exist" },
      PostalCode: { Input: "9323", Bureau: "9301", Match_Type: "Does not Exist - 50.0" },
      Remainder_Tokens: { Input: "", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "3818 MODISENYANE STREET", line2: "ROOCKLANDS", line3: "BLOEMFONTEIN", line4: "", line5: "", postCode: "9323" },
    bureauLines: { line1: "3818 MODISENYANE STREET", line2: "ROCKLANDS", line3: "BLOEMFONTEIN", line4: "", line5: "", postCode: "9301" }
  },

  // ===== ID: 7503075126082 =====
  {
    v2_id: "3043451473",
    idNumber: "7503075126082",
    inputAddr: "4 EMPRESS STREET KENSINGTON JOHANNESBURG 2094",
    bureauAddr: "4 EMPRESS STREET KENSINGTON JOHANNESBURG 2094",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "4", Bureau: "4", Match_Type: "Exist" },
      StreetName: { Input: "Empress", Bureau: "Empress", Match_Type: "Exist" },
      StreetType: { Input: "Street", Bureau: "Street", Match_Type: "Exist" },
      Suburb: { Input: "Kensington", Bureau: "Kensington", Match_Type: "Exist" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "Johannesburg", Bureau: "Johannesburg", Match_Type: "Exist" },
      PostalCode: { Input: "2094", Bureau: "2094", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "4 EMPRESS STREET", line2: "KENSINGTON", line3: "JOHANNESBURG", line4: "", line5: "", postCode: "2094" },
    bureauLines: { line1: "4 EMPRESS STREET", line2: "KENSINGTON", line3: "JOHANNESBURG", line4: "", line5: "", postCode: "2094" }
  },
  {
    v2_id: "3043451483",
    idNumber: "7503075126082",
    inputAddr: "4 EMPRESS STREET KENSINGTON JOHANNESBURG 2094",
    bureauAddr: "4 EMPRESS STREET KENSINGTON JOHANNESBURG 2094",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "4", Bureau: "4", Match_Type: "Exist" },
      StreetName: { Input: "Empress", Bureau: "Empress", Match_Type: "Exist" },
      StreetType: { Input: "Street", Bureau: "Street", Match_Type: "Exist" },
      Suburb: { Input: "Kensington", Bureau: "Kensington", Match_Type: "Exist" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "Johannesburg", Bureau: "Johannesburg", Match_Type: "Exist" },
      PostalCode: { Input: "2094", Bureau: "2094", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "4 EMPRESS STREET", line2: "KENSINGTON", line3: "JOHANNESBURG", line4: "", line5: "", postCode: "2094" },
    bureauLines: { line1: "4 EMPRESS STREET", line2: "KENSINGTON", line3: "JOHANNESBURG", line4: "", line5: "", postCode: "2094" }
  },

  // ===== ID: 7602030305086 =====
  {
    v2_id: "3044397843",
    idNumber: "7602030305086",
    inputAddr: "1820 MULEKANE B MOLEKANE MOLEKANE 1892",
    bureauAddr: "1820 B LULEKANI 1392",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "1820", Bureau: "1820", Match_Type: "Exist" },
      StreetName: { Input: "Mulekane B Molekane", Bureau: "B Lulekani", Match_Type: "Does not Exist - 48.28" },
      StreetType: { Input: "", Bureau: "", Match_Type: "Skipped" },
      Suburb: { Input: "", Bureau: "", Match_Type: "Skipped" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "", Bureau: "", Match_Type: "Skipped" },
      PostalCode: { Input: "1892", Bureau: "1392", Match_Type: "Partial - 75.0" },
      Remainder_Tokens: { Input: "MOLEKANE", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: false, Input_Missing_Fields: ["Suburb"], Bureau_Matched: false, Bureau_Missing_Fields: ["Suburb"] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Suburb", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Suburb", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Suburb", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Suburb", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Suburb"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Suburb"] }
    },
    inputLines: { line1: "1820 MULEKANE B", line2: "MOLEKANE", line3: "MOLEKANE", line4: "", line5: "", postCode: "1892" },
    bureauLines: { line1: "1820 B LULEKANI", line2: "", line3: "", line4: "", line5: "", postCode: "1392" }
  },
  {
    v2_id: "3044397853",
    idNumber: "7602030305086",
    inputAddr: "1820 MULEKANE B MOLEKANE MOLEKANE 1892",
    bureauAddr: "1820 LULEKANI -B EXT LULEKANI 1392",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "1820", Bureau: "1820", Match_Type: "Exist" },
      StreetName: { Input: "Mulekane B Molekane", Bureau: "Lulekani B Ext Lulekani", Match_Type: "Does not Exist - 66.67" },
      StreetType: { Input: "", Bureau: "", Match_Type: "Skipped" },
      Suburb: { Input: "", Bureau: "", Match_Type: "Skipped" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "", Bureau: "", Match_Type: "Skipped" },
      PostalCode: { Input: "1892", Bureau: "1392", Match_Type: "Partial - 75.0" },
      Remainder_Tokens: { Input: "MOLEKANE", Bureau: "-B", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: false, Input_Missing_Fields: ["Suburb"], Bureau_Matched: false, Bureau_Missing_Fields: ["Suburb"] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Suburb", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Suburb", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Suburb", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Suburb", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Suburb"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Suburb"] }
    },
    inputLines: { line1: "1820 MULEKANE B", line2: "MOLEKANE", line3: "MOLEKANE", line4: "", line5: "", postCode: "1892" },
    bureauLines: { line1: "1820 LULEKANI -B EXT", line2: "LULEKANI", line3: "", line4: "", line5: "", postCode: "1392" }
  },

  // ===== ID: 7612105075084 =====
  {
    v2_id: "3044582483",
    idNumber: "7612105075084",
    inputAddr: "MCIVORSTREET 40 DE AAR DE AAR 7000",
    bureauAddr: "MC YVOR STREET 40 DE AAR 7000",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "40", Bureau: "", Match_Type: "Does not Exist - 0.0" },
      StreetName: { Input: "De Aar De Aar", Bureau: "Mc Yvor", Match_Type: "Does not Exist - 20.0" },
      StreetType: { Input: "", Bureau: "Street", Match_Type: "Does not Exist - 0.0" },
      Suburb: { Input: "", Bureau: "", Match_Type: "Skipped" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "", Bureau: "De Aar", Match_Type: "Does not Exist - 0.0" },
      PostalCode: { Input: "7000", Bureau: "7000", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "MCIVORSTREET", Bureau: "40", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: false, Input_Missing_Fields: ["Suburb"], Bureau_Matched: false, Bureau_Missing_Fields: ["StreetNumber", "Suburb"] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Suburb", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Suburb", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Suburb", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Suburb", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Suburb"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Suburb"] }
    },
    inputLines: { line1: "MCIVORSTREET 40", line2: "DE AAR", line3: "DE AAR", line4: "", line5: "", postCode: "7000" },
    bureauLines: { line1: "MC YVOR STREET 40", line2: "DE AAR", line3: "", line4: "", line5: "", postCode: "7000" }
  },
  {
    v2_id: "3044582493",
    idNumber: "7612105075084",
    inputAddr: "MCIVORSTREET 40 DE AAR DE AAR 7000",
    bureauAddr: "MC IVOR STREET 40 DE AAR 7000",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "40", Bureau: "", Match_Type: "Does not Exist - 0.0" },
      StreetName: { Input: "De Aar De Aar", Bureau: "Mc Ivor", Match_Type: "Does not Exist - 20.0" },
      StreetType: { Input: "", Bureau: "Street", Match_Type: "Does not Exist - 0.0" },
      Suburb: { Input: "", Bureau: "", Match_Type: "Skipped" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "", Bureau: "De Aar", Match_Type: "Does not Exist - 0.0" },
      PostalCode: { Input: "7000", Bureau: "7000", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "MCIVORSTREET", Bureau: "40", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: false, Input_Missing_Fields: ["Suburb"], Bureau_Matched: false, Bureau_Missing_Fields: ["StreetNumber", "Suburb"] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Suburb", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Suburb", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Suburb", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Suburb", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Suburb"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Suburb"] }
    },
    inputLines: { line1: "MCIVORSTREET 40", line2: "DE AAR", line3: "DE AAR", line4: "", line5: "", postCode: "7000" },
    bureauLines: { line1: "MC IVOR STREET 40", line2: "DE AAR", line3: "", line4: "", line5: "", postCode: "7000" }
  },

  // ===== ID: 7701115352086 =====
  {
    v2_id: "3044526983",
    idNumber: "7701115352086",
    inputAddr: "852 TOBOIE STREET HERTSHOFVILLIAGE HERTSHOFVILLIAGE 9482",
    bureauAddr: "852 LEPHOI STREET 9482",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "852", Bureau: "852", Match_Type: "Exist" },
      StreetName: { Input: "Toboie", Bureau: "Lephoi", Match_Type: "Does not Exist - 33.33" },
      StreetType: { Input: "Street", Bureau: "Street", Match_Type: "Exist" },
      Suburb: { Input: "Hertshofvilliage", Bureau: "", Match_Type: "Does not Exist - 0.0" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "", Bureau: "", Match_Type: "Skipped" },
      PostalCode: { Input: "9482", Bureau: "9482", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "HERTSHOFVILLIAGE", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: false, Bureau_Missing_Fields: ["Suburb"] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Suburb", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Suburb", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Suburb"] }
    },
    inputLines: { line1: "852 TOBOIE STREET", line2: "HERTSHOFVILLIAGE", line3: "HERTSHOFVILLIAGE", line4: "", line5: "", postCode: "9482" },
    bureauLines: { line1: "852 LEPHOI STREET", line2: "", line3: "", line4: "", line5: "", postCode: "9482" }
  },
  {
    v2_id: "3044527023",
    idNumber: "7701115352086",
    inputAddr: "852 TOBOIE STREET HERTSHOFVILLIAGE HERTSHOFVILLIAGE 9482",
    bureauAddr: "852 LEPHOI STREET MALEBOGO HERTZOGVILLE 9482",
    tokenComparison: {
      ComplexNumber: { Input: "", Bureau: "", Match_Type: "Skipped" },
      ComplexName: { Input: "", Bureau: "", Match_Type: "Skipped" },
      StreetNumber: { Input: "852", Bureau: "852", Match_Type: "Exist" },
      StreetName: { Input: "Toboie", Bureau: "Lephoi", Match_Type: "Does not Exist - 33.33" },
      StreetType: { Input: "Street", Bureau: "Street", Match_Type: "Exist" },
      Suburb: { Input: "Hertshofvilliage", Bureau: "Malebogo Hertzogville", Match_Type: "Does not Exist - 54.05" },
      Town: { Input: "", Bureau: "", Match_Type: "Skipped" },
      City: { Input: "", Bureau: "", Match_Type: "Skipped" },
      PostalCode: { Input: "9482", Bureau: "9482", Match_Type: "Exist" },
      Remainder_Tokens: { Input: "HERTSHOFVILLIAGE", Bureau: "", Match_Type: "Remainder" }
    },
    ruleCheck: {
      "Option 1": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName"] },
      "Option 2": { Input_Matched: true, Input_Missing_Fields: [], Bureau_Matched: true, Bureau_Missing_Fields: [] },
      "Option 3": { Input_Matched: false, Input_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexNumber", "ComplexName", "Town"] },
      "Option 4": { Input_Matched: false, Input_Missing_Fields: ["ComplexName", "Town"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName", "Town"] },
      "Option 5": { Input_Matched: false, Input_Missing_Fields: ["ComplexName"], Bureau_Matched: false, Bureau_Missing_Fields: ["ComplexName"] }
    },
    inputLines: { line1: "852 TOBOIE STREET", line2: "HERTSHOFVILLIAGE", line3: "HERTSHOFVILLIAGE", line4: "", line5: "", postCode: "9482" },
    bureauLines: { line1: "852 LEPHOI STREET", line2: "MALEBOGO", line3: "HERTZOGVILLE", line4: "", line5: "", postCode: "9482" }
  }
];

// Parse the raw data into structured V3 records
export const parseV3Data = (): Map<string, { 
  tokenComparison: V3TokenComparison; 
  ruleCheck: V3RulesCheck; 
  inputAddr: string; 
  bureauAddr: string;
  inputLines: V3AddressLines;
  bureauLines: V3AddressLines;
}> => {
  const v3Map = new Map<string, { 
    tokenComparison: V3TokenComparison; 
    ruleCheck: V3RulesCheck; 
    inputAddr: string; 
    bureauAddr: string;
    inputLines: V3AddressLines;
    bureauLines: V3AddressLines;
  }>();
  
  for (const raw of V3_DATA_RAW) {
    // Create composite key: v2_id + IDNumber
    const key = `${raw.v2_id}_${raw.idNumber}`;
    
    v3Map.set(key, {
      tokenComparison: raw.tokenComparison,
      ruleCheck: raw.ruleCheck,
      inputAddr: raw.inputAddr,
      bureauAddr: raw.bureauAddr,
      inputLines: raw.inputLines,
      bureauLines: raw.bureauLines
    });
  }
  
  return v3Map;
};

// Get V3 data for a specific V2 record
export const getV3DataForRecord = (
  v2Id: string, 
  idNumber: string
): { 
  tokenComparison: V3TokenComparison; 
  ruleCheck: V3RulesCheck; 
  inputAddr: string; 
  bureauAddr: string;
  inputLines: V3AddressLines;
  bureauLines: V3AddressLines;
} | null => {
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
