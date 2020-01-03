import React from 'react'
import classnames from 'classnames'

enum FooterPosition {
  LEFT = '',
  CENTER = 'is-grouped-centered',
  RIGHT = 'is-grouped-right',
}

export interface FooterProps {
  okText?: string
  cancelText?: string
  onOk?: () => void
  onCancel?: () => void
  position?: FooterPosition
}

export function Footer(props: FooterProps) {
  const {
    okText = 'Ok',
    cancelText = 'Cancel',
    onOk,
    onCancel,
    position = FooterPosition.CENTER,
  } = props
  return (
    <div className={classnames('_g-footer', 'field', 'is-grouped', position)}>
      <div className="control">
        <button className="button is-primary" onClick={onOk}>
          {okText}
        </button>
      </div>
      <div className="control">
        <button className="button is-light" onClick={onCancel}>
          {cancelText}
        </button>
      </div>
    </div>
  )
}
