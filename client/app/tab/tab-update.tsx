import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { FieldRef, TabRef, emptyTabRef } from 'client/types'
import { Input, InputType } from '~/components/input'
import { Gender } from '~/components/gender'

export const TabUpdate = forwardRef<TabRef>(function _TabUpdate(_, ref) {
  const nameRef = useRef<FieldRef>()
  const newNameRef = useRef<FieldRef>()
  const ageRef = useRef<FieldRef>()
  const genderRef = useRef<FieldRef>()

  useImperativeHandle(
    ref,
    () => {
      if (!nameRef.current) return emptyTabRef
      const [n, nn, a, g] = [nameRef.current, newNameRef.current, ageRef.current, genderRef.current]

      return {
        onClear: () => {
          n.onClear()
          nn.onClear()
          a.onClear()
          g.onClear()
        },
        values: {
          prevName: n.value,
          name: nn.value,
          age: a.value,
          gender: g.value,
        },
        validate: n.validate && nn.validate && a.validate && g.validate,
      }
    },
    [nameRef.current, newNameRef.current, ageRef.current, genderRef.current],
  )

  return (
    <div className="container">
      <Input
        ref={nameRef}
        name="prevName"
        label="Name"
        required
        maxLength={15}
        placeholder="please input name, max length is 15"
      />
      <Input
        ref={newNameRef}
        name="name"
        label="newName"
        maxLength={15}
        placeholder="please input new name, max length is 15"
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
