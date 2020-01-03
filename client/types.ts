export interface FieldRef {
  onClear: () => void
  onValidate: () => string | number | undefined | false
}

export interface TabRef {
  onClear: () => void
  onSerialize: () => SerializedValue | false
}

export type FormDataType = Record<string, FieldType>

export interface FieldType {
  name?: string
  value: any
  required?: boolean
  help?: boolean
}

export type SerializedValue = Record<string, string | number | undefined>

export interface ResultProps {
  formData: SerializedValue
  onBack?: () => void
}

export type ColorType = '' | 'is-primary' | 'is-danger' | 'is-info'

export enum COLOR {
  DEFAULT = '',
  PRIMARY = 'is-primary',
  DANGER = 'is-danger',
  INFO = 'is-info',
}
