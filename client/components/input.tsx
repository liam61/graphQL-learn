import React, {
  useState,
  InputHTMLAttributes,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import classnames from 'classnames'
import { FieldRef, Color } from 'client/types'

export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string
  color?: Color
  requireInfo?: string
  type?: InputType
}

export const Input = forwardRef<FieldRef, InputProps>(function _Input(props, ref) {
  const {
    label,
    color = Color.DEFAULT,
    required,
    requireInfo = 'this field is required',
    type = InputType.TEXT,
    max,
    ...restProps
  } = props
  const [value, setValue] = useState<string>('')
  const [touched, setTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>()
  const isNumberType = type === InputType.NUMBER

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    !touched && setTouched(true)
    const { value: v } = ev.target
    if (type === InputType.NUMBER && (isNaN(+v) || (max && +v > max))) return
    setValue(v)
  }

  useImperativeHandle(ref, () => ({
    onFocus: () => inputRef.current && inputRef.current.focus(),
    onClear: () => setValue(''),
    value: !isNumberType ? value : +value,
    validate: !required || !!value,
  }))

  const showInfo = required && touched && !value

  return (
    <div className="field">
      {label && <label className={classnames('_g-input', 'label', { required })}>{label}</label>}
      <div className="control">
        <input
          {...restProps}
          type={!isNumberType ? type : InputType.TEXT}
          className={classnames('input', showInfo ? Color.DANGER : color)}
          value={value}
          onChange={handleChange}
          required={required}
        />
      </div>
      {showInfo && <p className="help is-danger">{requireInfo}</p>}
    </div>
  )
})
