export interface Option<ValueType, ElementPropTypes = undefined> {
  label: string;
  value: ValueType;
  props?: ElementPropTypes;
}
