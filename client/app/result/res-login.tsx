import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { userLogin } from '~/graphql/user'
import { ResultProps, COLOR } from 'client/types'
import { Notification } from '~/components/notification'
import { Payload, LoginResult, LoginPayload } from 'common/types'

interface ResLoginProps extends ResultProps {}

export function ResLogin(props: ResLoginProps) {
  const { formData, onBack } = props
  const { loading, data, error } = useQuery<{ login: LoginResult }, Payload<LoginPayload>>(
    userLogin,
    {
      variables: {
        payload: formData as any,
      },
      fetchPolicy: 'network-only',
    },
  )

  if (loading || error) {
    const notiProps = {
      loading,
      info: error && <div>Error! {error.message}</div>,
      color: error && COLOR.DANGER,
    }
    return <Notification onBack={onBack} {...notiProps} />
  }

  const { result, data: user } = data.login
  const notiFinalProps = {
    info: result ? (
      <>
        <strong>login success!</strong>
        <div>{`hi, ${user.name}`}</div>
      </>
    ) : (
      <strong>login failed!</strong>
    ),
    color: result ? COLOR.INFO : COLOR.DANGER,
  }

  return <Notification onBack={onBack} {...notiFinalProps} />
}
