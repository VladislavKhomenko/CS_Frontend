export enum StructureFieldType {
  utf16,
  u16,
}

export interface StructureField {
  offset: number;
  type: StructureFieldType;
  maxLength?: number;
}
