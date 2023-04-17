import { StructureField, StructureFieldType } from './models/structure-field.model';
import { StructureSchema } from './models/structure-schema.model';

class Structure {
  private data: ArrayBuffer;
  private view: DataView;
  private fieldsMap: Map<string, StructureField>;

  constructor(schema: StructureSchema) {
    const byteLength = this.calculateByteLength(schema);

    this.data = new ArrayBuffer(byteLength);
    this.view = new DataView(this.data);
    this.fieldsMap = this.createFieldsMap(schema);
  }

  set(fieldName: string, value: string | number): void {
    const field = this.fieldsMap.get(fieldName)!;

    if (field.type === StructureFieldType.utf16 && typeof value === 'string') {
      this.setUtf16(field, value);
    } else if (field.type === StructureFieldType.u16 && typeof value === 'number') {
      this.setU16(field, value);
    } else {
      throw new Error(`Invalid value type for field ${fieldName}`);
    }
  }

  get(fieldName: string): string | number {
    const field = this.fieldsMap.get(fieldName);

    if (!field) {
      throw new Error(`The ${fieldName} does not exist`);
    }

    if (field.type === StructureFieldType.utf16) {
      return this.getUtf16(field.offset);
    }

    return this.getU16(field.offset);
  }

  private createFieldsMap(schema: StructureSchema): Map<string, StructureField> {
    let offset = 0;

    const tofieldsMap = (
      map: Map<string, StructureField>,
      [key, type, maxLength]: [string, StructureFieldType, number?]
    ) => {
      map.set(key, { offset, type, ...(maxLength && { maxLength }) });

      offset += maxLength ? 2 * maxLength : 2;

      return map;
    };

    return schema.reduce(tofieldsMap, new Map());
  }

  private calculateByteLength(schema: StructureSchema): number {
    let byteLength = 0;

    for (const [_, type, maxLength] of schema) {
      if (![StructureFieldType.u16, StructureFieldType.utf16].includes(type)) {
        throw new Error(`Invalid type: ${type}`);
      }

      byteLength += maxLength ? 2 * maxLength : 2;
    }

    return byteLength;
  }

  private setU16({ offset }: StructureField, value: number): void {
    this.view.setUint16(offset, value);
  }

  private setUtf16({ offset, maxLength }: StructureField, value: string): void {
    if (maxLength !== undefined && value.length > maxLength) {
      throw new Error(`Value exceeds max length`);
    }

    for (let i = 0; i < value.length; i++) {
      this.view.setUint16(offset + i * 2, value.charCodeAt(i));
    }
  }

  private getU16(offset: number): number {
    return this.view.getUint16(offset);
  }

  private getUtf16(offset: number): string {
    let utf16Value = '';

    for (let i = offset; i < this.data.byteLength; i += 2) {
      const charCode = this.view.getUint16(i);

      if (charCode === 0) break;

      utf16Value += String.fromCharCode(charCode);
    }

    return utf16Value;
  }
}

const jackBlack = new Structure([
  ['name', StructureFieldType.utf16, 10], // Число - это максимальное количество символов
  ['lastName', StructureFieldType.utf16, 10],
  ['age', StructureFieldType.u16],
  ['fullName', StructureFieldType.utf16, 20],
]);

jackBlack.set('name', 'Jack');
jackBlack.set('lastName', 'Black');
jackBlack.set('age', 53);
jackBlack.set('fullName', 'Jack Black');

console.log(jackBlack.get('name')); // 'Jack'
console.log(jackBlack.get('fullName')); // 'Jack Black'
