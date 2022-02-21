import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { addUser, updateUser, deleteUser, getUserList } from '~/graphql/user'
import { TAB } from '~/components/tabs'
import { Notification } from '~/components/notification'
import {
  AddResult,
  UpdateResult,
  DeleteResult,
  MutationUpdateUserArgs,
  MutationAddUserArgs,
  QueryResult,
} from 'common/types'
import { ResultProps, COLOR } from 'client/types'

interface MutationRequest<T = any> extends Promise<T> {
  resultKey?: string
}

interface ResMutationProps extends ResultProps {
  type: TAB
}

export function ResMutation(props: ResMutationProps) {
  const { formData, type, onBack } = props
  const [isSuccess, setSuccess] = useState<boolean>(undefined)
  const [add] = useMutation<{ addUser: AddResult }, MutationAddUserArgs>(addUser, {
    // NOTE: 每个 mutation 都需要自己添加 update 函数
    update: (cache, { data: newUser }) => {
      if (!newUser.addUser.result) return
      const data = cache.readQuery<{ userList: QueryResult }>({
        query: getUserList,
        variables: { payload: {} },
      })
      data.userList.data.push(newUser.addUser.data)

      cache.writeQuery({
        query: getUserList,
        data,
      })
    },
  })
  const [update] = useMutation<{ updateUser: UpdateResult }, MutationUpdateUserArgs>(updateUser)
  const [_delete] = useMutation<{ deleteUser: DeleteResult }, { name: string }>(deleteUser)

  useEffect(() => {
    let request: MutationRequest = null
    switch (type) {
      case TAB.ADD:
        request = add({
          variables: {
            payload: formData as any,
          },
        })
        request.resultKey = 'addUser'
        break
      case TAB.UPDATE:
        const { prevName, ...rest } = formData
        request = update({
          variables: {
            name: prevName + '',
            payload: rest,
          },
        })
        request.resultKey = 'updateUser'
        break
      case TAB.DELETE:
        const { name } = formData
        request = _delete({
          variables: {
            name: name + '',
          },
        })
        request.resultKey = 'deleteUser'
        break
    }

    request
      .then(({ data }) => {
        setSuccess(data[request.resultKey].result)
      })
      .catch(err => {
        console.log(err)
        setSuccess(false)
      })
  }, [type])

  const notiProps = {
    loading: isSuccess == undefined,
    info: isSuccess ? 'Operate success!' : 'Error!',
    color: isSuccess ? COLOR.INFO : COLOR.DANGER,
  }

  return <Notification onBack={onBack} {...notiProps} />
}
