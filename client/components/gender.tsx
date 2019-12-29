import React, {
  useState,
  InputHTMLAttributes,
  ChangeEvent,
  FocusEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import { FieldRef } from 'client/types'
import { GENDER } from 'common/types'

export interface GenderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string
  requireInfo?: string
  defaultValue?: GENDER
}

export const Gender = forwardRef<FieldRef, GenderProps>(function _Gender(props, ref) {
  const {
    label,
    required,
    requireInfo = 'this field is required',
    onFocus,
    defaultValue,
    disabled = false,
    ...restProps
  } = props
  const [gender, setGender] = useState<GENDER>(defaultValue)
  const [touched, setTouched] = useState(false)
  const maleRef = useRef<HTMLInputElement>()
  const femaleRef = useRef<HTMLInputElement>()

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { id } = ev.target.dataset
    !disabled && setGender(id as GENDER)
  }

  const handleFocus = (ev: FocusEvent<HTMLInputElement>) => {
    onFocus && onFocus(ev)
    !touched && setTouched(true)
  }

  useImperativeHandle(ref, () => ({
    onFocus: () => maleRef.current && maleRef.current.focus(),
    onClear: () => setGender(undefined),
    value: gender,
    validate: !required || !!gender,
  }))

  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className="control">
        <label className="_g-radio radio" {...{ disabled }}>
          <input
            {...restProps}
            ref={maleRef}
            data-id={GENDER.MALE}
            type="radio"
            checked={gender === GENDER.MALE}
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
            data-id={GENDER.FEMALE}
            type="radio"
            checked={gender === GENDER.FEMALE}
            onChange={handleChange}
            disabled={disabled}
          />
          <span>Female</span>
        </label>
      </div>
      {required && !disabled && touched && !gender && (
        <p className="help is-danger">{requireInfo}</p>
      )}
    </div>
  )
})
