import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { FieldRef, TabRef, emptyTabRef } from 'client/types'
import { Input, InputType } from '~/components/input'
import { Gender } from '~/components/gender'

export const TabQuery = forwardRef<TabRef>(function _TabQuery(_, ref) {
  const nameRef = useRef<FieldRef>()
  const ageRef = useRef<FieldRef>()
  const genderRef = useRef<FieldRef>()
  console.log('aaa')

  useImperativeHandle(ref, () => {
    if (!nameRef.current) return emptyTabRef
    const [n, a, g] = [nameRef.current, ageRef.current, genderRef.current]
    return {
      onClear: () => {
        n.onClear()
        a.onClear()
        g.onClear()
      },
      values: {
        name: n.value,
        age: a.value,
        gender: g.value,
      },
      validate: n.validate && a.validate && g.validate,
    }
  })

  return (
    <div className="container">
      <Input
        ref={nameRef}
        name="name"
        label="Name"
        maxLength={15}
        placeholder="please input name, max length is 15"
      />
      <Input
        ref={ageRef}
        name="age"
        label="Age"
        type={InputType.NUMBER}
        max={1000}
        placeholder="please input age, max is 1000"
      />
      <Gender name="gender" ref={genderRef} label="Gender" />
    </div>
  )
})
