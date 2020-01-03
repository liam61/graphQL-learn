import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { addUser, updateUser, deleteUser } from '~/graphql/user'
import { TAB } from '~/components/tabs'
import { Notification } from '~/components/notification'
import { AddResult, Payload, UpdateResult, UpdateType, DeleteResult } from 'common/types'
import { ResultProps, SerializedValue, COLOR } from 'client/types'

interface ResMutationProps extends ResultProps {
  type: TAB
}

export function ResMutation(props: ResMutationProps) {
  const { formData, type, onBack } = props
  const [isSuccess, setSuccess] = useState<boolean>(undefined)
  const [add] = useMutation<{ addUser: AddResult }, Payload<SerializedValue>>(addUser)
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
          setSuccess(data.addUser.result)
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
          setSuccess(data.updateUser.result)
        })
        break
      case TAB.DELETE:
        const { name } = formData
        _delete({
          variables: {
            name: name + '',
          },
        }).then(({ data }) => {
          setSuccess(data.deleteUser.result)
        })
        break
    }
  }, [type])

  const notiProps = {
    loading: isSuccess == undefined,
    info: isSuccess ? 'Operate success!' : 'Error!',
    color: isSuccess ? COLOR.INFO : COLOR.DANGER,
  }

  return <Notification onBack={onBack} {...notiProps} />
}
