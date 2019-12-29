import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { userLogin } from '~/graphql/user'
import { ResultProps, FormDataType } from 'client/types'
import { Payload, LoginResult } from 'common/types'

interface ResLoginProps extends ResultProps {}

export function ResLogin(props: ResLoginProps) {
  const { formData, onBack } = props
  const { loading, data, error } = useQuery<{ login: LoginResult }, Payload<FormDataType>>(
    userLogin,
    {
      variables: {
        payload: formData,
      },
    },
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>

  return (
    <div className="notification is-info">
      <button className="delete" onClick={onBack} />
      <strong>login success!</strong>
      {data && <div>{`hi, ${data.login.data.name}`}</div>}
    </div>
  )
}
