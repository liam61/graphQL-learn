import React, { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Gender } from '~/components/gender'
import { getUserList } from '~/graphql/user'
import { Filter, Payload, QueryResult } from 'common/types'
import { ResultProps } from 'client/types'

const userInfo = ['Name', 'Age', 'Gender']

interface ResQueryProps extends ResultProps {}

export function ResQuery(props: ResQueryProps) {
  const { formData, onBack } = props
  const { loading, error, data } = useQuery<{ userList: QueryResult }, Payload<Filter>>(
    getUserList,
    {
      variables: {
        payload: formData,
      },
    },
  )

  const title = useMemo(
    () => (
      <tr>
        <th>User</th>
        {userInfo.map(info => (
          <th key={info}>{info}</th>
        ))}
      </tr>
    ),
    [],
  )

  const noUser = useMemo(
    () => (
      <tr>
        <th>-</th>
        <td>no user</td>
        <td>-</td>
        <td>-</td>
      </tr>
    ),
    [],
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>

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
                    <td>{age ? age : 'unknown'}</td>
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
