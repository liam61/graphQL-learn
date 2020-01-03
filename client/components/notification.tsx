import React, { ReactElement } from 'react'
import classnames from 'classnames'
import { ColorType } from 'client/types'

interface NotificationProps {
  info?: string | ReactElement
  onBack?: () => void
  color?: ColorType
  loading?: boolean
}

export function Notification(props: NotificationProps) {
  const { info, onBack, color, loading } = props

  if (loading) return <div>Loading...</div>

  return (
    <div className={classnames('notification', color)}>
      <button className="delete" onClick={onBack} />
      {info && (typeof info === 'string' ? <div>{info}</div> : info)}
    </div>
  )
}
