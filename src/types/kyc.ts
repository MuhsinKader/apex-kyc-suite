export interface KYCAddressRecord {
  KYCIndividualMatchLog_Version2_id: string;
  GUID: string;
  IDNumber: string;
  BHAccountNumber: string;
  Input_Original_Full_Address: string;
  Input_Line_1: string;
  Input_Line_2: string;
  Input_Line_3: string;
  Input_Line_4: string;
  Input_Line_Post_Code: string;
  Input_Complex_Number: string;
  Input_Complex_Name: string;
  Input_Street_Number: string;
  Input_Street_Name: string;
  Input_Suburb: string;
  Input_Town: string;
  Input_Post_Code: string;
  Bureau_Original_Full_Address: string;
  Bureau_Line_1: string;
  Bureau_Line_2: string;
  Bureau_Line_3: string;
  Bureau_Line_4: string;
  Bureau_Line_Post_Code: string;
  Bureau_Complex_Number: string;
  Bureau_Complex_Name: string;
  Bureau_Street_Number: string;
  Bureau_Street_Name: string;
  Bureau_Suburb: string;
  Bureau_Town: string;
  Bureau_Post_Code: string;
  Overall_Match_Score: number;
  RecordMatchResult: string;
  ErrorList: string;
}

export interface AddressComponent {
  label: string;
  inputValue: string;
  bureauValue: string;
  // V2 has no component-level matching - isMatch will be undefined
  // V3 will provide actual per-component match status
  isMatch?: boolean;
}
