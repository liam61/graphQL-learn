import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Gender } from '~/components/gender'
import { getUserList } from '~/graphql/user'
import { QueryResult, QueryUserListArgs } from 'common/types'
import { ResultProps, COLOR } from 'client/types'
import { isEmpty } from 'client/utils'
import { Notification } from '~/components/notification'

const userInfo = ['Name', 'Age', 'Gender']

const title = (
  <tr>
    <th>User</th>
    {userInfo.map(info => (
      <th key={info}>{info}</th>
    ))}
  </tr>
)

const noUser = (
  <tr>
    <th>no user</th>
    {userInfo.map((_, i) => (
      <th key={i}>-</th>
    ))}
  </tr>
)

interface ResQueryProps extends ResultProps {}

export function ResQuery(props: ResQueryProps) {
  const { formData, onBack } = props
  const { loading, error, data } = useQuery<{ userList: QueryResult }, QueryUserListArgs>(
    getUserList,
    {
      variables: {
        payload: formData,
      },
      // fetchPolicy: 'network-only',
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

  return (
    <>
      <table className="_g-table table">
        <thead>{title}</thead>
        <tfoot>{title}</tfoot>
        <tbody>
          {data && data.userList.data.length
            ? data.userList.data.map((user, i) => {
                const { name, age, gender } = user
                return (
                  <tr key={name}>
                    <th>{i + 1}</th>
                    <td>{name}</td>
                    <td>{!isEmpty(age) ? age : 'unknown'}</td>
                    <td>{gender ? <Gender defaultValue={gender} disabled /> : 'unknown'}</td>
                  </tr>
                )
              })
            : noUser}
        </tbody>
      </table>
      <div className="_g-footer field is-grouped is-grouped-centered">
        <button className="button is-info" onClick={onBack}>
          Back
        </button>
      </div>
    </>
  )
}
