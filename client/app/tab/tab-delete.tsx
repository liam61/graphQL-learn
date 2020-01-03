import React, { forwardRef, useImperativeHandle } from 'react'
import { TabRef, FieldType } from 'client/types'
import { Input } from '~/components/input'
import { useMobx, generateTabRefHandler, isEmpty } from 'client/utils'
import { useObserver } from 'mobx-react'

export const TabDelete = forwardRef<TabRef>(function _TabDelete(_, ref) {
  const store = useMobx({
    name: { name: 'name', value: '', required: true },
  })

  useImperativeHandle(
    ref,
    () => {
      const { data, change } = store
      return generateTabRefHandler(data, change)
    },
    [store.data],
  )

  return useObserver(() => {
    const { data, change } = store
    const handleChange = (payload: Partial<FieldType>, name: string) => {
      const { required } = data[name]
      change(Object.assign(payload, { help: required && isEmpty(payload.value) }), name)
    }

    return (
      <div className="container">
        <Input
          label="Name"
          required
          maxLength={15}
          placeholder="please input name, max length is 15"
          onChange={handleChange}
          {...data.name}
        />
      </div>
    )
  })
})
