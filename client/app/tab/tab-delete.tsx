import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { FieldRef, TabRef, emptyTabRef } from 'client/types'
import { Input } from '~/components/input'

export const TabDelete = forwardRef<TabRef>(function _TabDelete(_, ref) {
  const nameRef = useRef<FieldRef>()

  useImperativeHandle(
    ref,
    () => {
      if (!nameRef.current) return emptyTabRef
      const n = nameRef.current
      return {
        onClear: () => {
          n.onClear()
        },
        values: {
          name: n.value,
        },
        validate: n.validate,
      }
    },
    [nameRef.current],
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
    </div>
  )
})
