import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { addUser, updateUser, deleteUser } from '~/graphql/user'
import { TAB } from '~/components/tabs'
import {
  AddResult,
  Payload,
  UpdateResult,
  UpdateType,
  AddPayload,
  DeleteResult,
  UserType,
} from 'common/types'
import { ResultProps, FormDataType } from 'client/types'

interface ResMutationProps extends ResultProps {
  type: TAB
}

export function ResMutation(props: ResMutationProps) {
  const { formData, type, onBack } = props
  const [user, setUser] = useState<UserType>(null)

  const [add] = useMutation<{ addUser: AddResult }, Payload<FormDataType>>(addUser)
  const [update] = useMutation<{ updateUser: UpdateResult }, UpdateType>(updateUser)
  const [_delete] = useMutation<{ deleteUser: DeleteResult }, { name: string }>(deleteUser)

  useEffect(() => {
    switch (type) {
      case TAB.ADD:
        add({
          variables: {
            payload: formData,
          },
        }).then(({ data }) => {
          console.log(data)
          setUser(data.addUser.data)
        })
        break
      case TAB.UPDATE:
        const { prevName, ...rest } = formData
        update({
          variables: {
            name: prevName + '',
            payload: rest,
          },
        }).then(({ data }) => {
          console.log(data)
          setUser(data.updateUser.data)
        })
        break
      case TAB.DELETE:
        const { name } = formData
        _delete({
          variables: {
            name: name + '',
          },
        }).then(({ data }) => {
          console.log(data)
        })
    }
  }, [type])

  if (!user) return <div>Error!</div>

  return (
    <div className="notification">
      <button className="delete" onClick={onBack} />
      <div>operate success!</div>
    </div>
  )
}
