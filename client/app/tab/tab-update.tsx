import React, { forwardRef, useImperativeHandle } from 'react'
import { TabRef, FieldType } from 'client/types'
import { Input } from '~/components/input'
import { Gender } from '~/components/gender'
import { useMobx, generateTabRefHandler, isEmpty } from 'client/utils'
import { useObserver } from 'mobx-react'

export const TabUpdate = forwardRef<TabRef>(function _TabUpdate(_, ref) {
  const store = useMobx({
    prevName: { name: 'prevName', value: '', required: true },
    name: { name: 'name', value: '' },
    age: { name: 'age', value: '' },
    gender: { name: 'gender', value: '' },
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
          maxLength={15}
          placeholder="please input name, max length is 15"
          onChange={handleChange}
          {...data.prevName}
        />
        <Input
          label="newName"
          maxLength={15}
          placeholder="please input new name, max length is 15"
          onChange={handleChange}
          {...data.name}
        />
        <Input
          label="Age"
          type="number"
          max={1000}
          placeholder="please input age, max is 1000"
          onChange={handleChange}
          {...data.age}
        />
        <Gender label="Gender" onChange={handleChange} {...data.gender} />
      </div>
    )
  })
})
