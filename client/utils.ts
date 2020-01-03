import { FormDataType, FieldType, SerializedValue } from './types'
import { useLocalStore } from 'mobx-react'

export function isEmpty(value: any) {
  return ['', null, undefined].includes(value)
}

export function useMobx(initialValue: FormDataType) {
  return useLocalStore(() => ({
    data: initialValue,
    change(payload: Partial<FieldType>, key: string) {
      Object.assign(this.data[key], payload)
    },
  }))
}

export function generateTabRefHandler(
  data: FormDataType,
  change: (payload: Partial<FieldType>, key: string) => void,
) {
  const entries = Object.entries(data)
  return {
    onClear: () => {
      entries.forEach(([_k, field]) => {
        const { name, required } = field
        change(Object.assign({ value: '' }, required && { help: true }), name)
      })
    },
    onSerialize: () => {
      const values: SerializedValue = {}
      const validate = !entries.some(([k, filed]) => {
        const { value, required } = filed
        // value 可能为 number 0
        if (required && isEmpty(value)) {
          change({ help: true }, k)
          return true
        }
        !isEmpty(value) && (values[k] = value)
        return false
      })

      return validate ? values : false
    },
  }
}
