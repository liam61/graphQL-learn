import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { FieldRef, TabRef, emptyTabRef } from 'client/types'
import { Input, InputType } from '~/components/input'
import { Gender } from '~/components/gender'

export const TabAdd = forwardRef<TabRef>(function _TabAdd(_, ref) {
  const nameRef = useRef<FieldRef>()
  const passwordRef = useRef<FieldRef>()
  const ageRef = useRef<FieldRef>()
  const genderRef = useRef<FieldRef>()

  useImperativeHandle(
    ref,
    () => {
      if (!nameRef.current) return emptyTabRef
      const [n, p, a, g] = [nameRef.current, passwordRef.current, ageRef.current, genderRef.current]
      return {
        onClear: () => {
          n.onClear()
          p.onClear()
          a.onClear()
          g.onClear()
        },
        values: {
          name: n.value,
          password: p.value,
          age: a.value,
          gender: g.value,
        },
        validate: n.validate && p.validate && a.validate && g.validate,
      }
    },
    [nameRef.current, passwordRef.current, ageRef.current, genderRef.current],
  )

  return (
    <div className="container">
      <Input
        ref={nameRef}
        label="Name"
        required
        maxLength={15}
        placeholder="please input name, max length is 15"
      />
      <Input
        ref={passwordRef}
        label="Password"
        type={InputType.PASSWORD}
        required
        maxLength={15}
        placeholder="please input password, max length is 15"
      />
      <Input
        ref={ageRef}
        label="Age"
        type={InputType.NUMBER}
        max={1000}
        placeholder="please input age, max is 1000"
      />
      <Gender ref={genderRef} label="Gender" />
    </div>
  )
})
