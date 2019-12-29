import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { FieldRef, TabRef, emptyTabRef } from 'client/types'
import { Input, InputType } from '~/components/input'

export const TabLogin = forwardRef<TabRef>(function _TabLogin(_, ref) {
  const nameRef = useRef<FieldRef>()
  const passwordRef = useRef<FieldRef>()

  useImperativeHandle(
    ref,
    () => {
      console.log('login', nameRef.current)
      // if (!nameRef.current) return emptyTabRef
      const [n, p] = [nameRef.current, passwordRef.current]

      return {
        onClear: () => {
          n.onClear()
          p.onClear()
        },
        values: {
          name: n.value,
          password: p.value,
        },
        validate: n.validate && p.validate,
      }
    },
    // [nameRef.current, passwordRef.current],
  )

  return (
    <div className="container">
      <Input
        ref={nameRef}
        name="name"
        label="Name"
        required
        maxLength={15}
        placeholder="please input name, max length is 15"
      />
      <Input
        ref={passwordRef}
        name="password"
        label="Password"
        type={InputType.PASSWORD}
        required
        maxLength={15}
        placeholder="please input password, max length is 15"
      />
    </div>
  )
})
