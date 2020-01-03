import React, {
  useState,
  InputHTMLAttributes,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import classnames from 'classnames'
import { FieldRef, FieldType, ColorType } from 'client/types'
import { isEmpty } from 'client/utils'

export type InputType = 'text' | 'number' | 'password'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string | number // for controlled
  onChange?: (payload: Partial<FieldType>, name: string | undefined) => void
  defaultValue?: string | number // for uncontrolled
  label?: string
  color?: ColorType
  requireInfo?: string
  type?: InputType
  help?: boolean // custom show help info, for controlled
}

export const Input = forwardRef<FieldRef, InputProps>(function _Input(props, ref) {
  const {
    value,
    onChange,
    defaultValue = '',
    name,
    label,
    required,
    requireInfo = 'this field is required',
    help,
    color,
    type = 'text',
    max,
    ...restProps
  } = props
  const hasValueProp = props.hasOwnProperty('value')
  const isNumberType = type === 'number'
  const [_value, setValue] = useState<string | number>(hasValueProp ? '' : defaultValue)
  const [touched, setTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>()

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    !touched && setTouched(true)
    let v = ev.target.value as any
    if (isNumberType) {
      // 清空则不转为 number
      v.length && (v = +v)
      if (isNaN(v) || (max && v > max)) return
    }
    !hasValueProp && setValue(v)
    onChange && onChange({ value: v }, name)
  }

  // for uncontrolled
  useImperativeHandle(ref, () => ({
    onClear: () => setValue(''),
    onValidate: () => {
      const validate = !required || !!_value
      if (!validate) {
        inputRef.current && inputRef.current.focus()
        return false
      }
      return !isNumberType ? _value : +_value
    },
  }))

  const finalValue = hasValueProp ? value : _value
  const showInfo = help || (required && touched && isEmpty(finalValue))

  return (
    <div className="field">
      {label && <label className={classnames('_g-input', 'label', { required })}>{label}</label>}
      <div className="control">
        <input
          {...restProps}
          type={!isNumberType ? type : 'text'}
          name={name}
          className={classnames('input', showInfo ? 'is-danger' : color)}
          value={finalValue}
          onChange={handleChange}
          required={required}
        />
      </div>
      {showInfo && <p className="help is-danger">{requireInfo}</p>}
    </div>
  )
})
