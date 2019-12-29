export interface FieldRef {
  onFocus: () => void
  onClear: () => void
  validate: boolean
  value: string | number
}

export interface TabRef {
  onClear: () => void
  validate: boolean
  values: FormDataType
}

export type FormDataType = Record<string, string | number>

export interface ResultProps {
  formData: FormDataType
  onBack?: () => void
}

export enum Color {
  DEFAULT = '',
  PRIMARY = 'is-primary',
  DANGER = 'is-danger',
}

export const emptyTabRef = {
  onClear: () => {},
  values: {},
  validate: false,
}
