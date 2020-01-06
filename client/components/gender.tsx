import React, {
  useState,
  InputHTMLAttributes,
  ChangeEvent,
  FocusEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import { FieldRef, FieldType } from 'client/types'
import { Gender as GENDER } from 'common/types'
import { isEmpty } from 'client/utils'

export type GenderType = 'MALE' | 'FEMALE'

export interface GenderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string
  requireInfo?: string
  value?: GenderType | undefined
  onChange?: (payload: Partial<FieldType>, name: string | undefined) => void
  defaultValue?: GenderType | undefined
  help?: boolean
}

export const Gender = forwardRef<FieldRef, GenderProps>(function _Gender(props, ref) {
  const {
    value,
    onChange,
    defaultValue,
    name,
    label,
    required,
    requireInfo = 'this field is required',
    help,
    onFocus,
    disabled = false,
    ...restProps
  } = props
  const hasValueProp = props.hasOwnProperty('value')
  const [gender, setGender] = useState(hasValueProp ? '' : defaultValue)
  const [touched, setTouched] = useState(false)
  const maleRef = useRef<HTMLInputElement>()
  const femaleRef = useRef<HTMLInputElement>()

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { id } = ev.target.dataset
    !hasValueProp && !disabled && setGender(id as GENDER)
    onChange && onChange({ value: id }, name)
  }

  const handleFocus = (ev: FocusEvent<HTMLInputElement>) => {
    onFocus && onFocus(ev)
    !touched && setTouched(true)
  }

  // for uncontrolled
  useImperativeHandle(ref, () => ({
    onClear: () => setGender(''),
    onValidate: () => {
      const validate = !required || !!gender
      if (!validate) {
        maleRef.current && maleRef.current.focus()
        return false
      }
      return gender
    },
  }))

  const finalValue = hasValueProp ? value : gender
  const showInfo = help || (required && !disabled && touched && isEmpty(finalValue))

  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className="control">
        <label className="_g-radio radio" {...{ disabled }}>
          <input
            {...restProps}
            ref={maleRef}
            data-id={GENDER.Male}
            type="radio"
            checked={finalValue === GENDER.Male}
            onChange={handleChange}
            onFocus={handleFocus}
            disabled={disabled}
          />
          <span>Male</span>
        </label>
        <label className="_g-radio radio" {...{ disabled }}>
          <input
            {...restProps}
            ref={femaleRef}
            data-id={GENDER.Female}
            type="radio"
            checked={finalValue === GENDER.Female}
            onChange={handleChange}
            disabled={disabled}
          />
          <span>Female</span>
        </label>
      </div>
      {showInfo && <p className="help is-danger">{requireInfo}</p>}
    </div>
  )
})
