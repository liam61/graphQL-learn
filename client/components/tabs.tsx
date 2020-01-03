import React from 'react'
import classnames from 'classnames'

export enum TAB {
  QUERY,
  LOGIN,
  ADD,
  UPDATE,
  DELETE,
}

export interface TabData {
  id: TAB
  label: string
  icon?: string
}

interface TabProps {
  data: TabData[]
  currentTab: TAB
  onClick?: (tab: TAB) => void
}

export function Tabs(props: TabProps) {
  const { data = [], currentTab, onClick } = props

  const handleClick = (ev: any) => {
    const { nodeName, dataset } = ev.target
    if (nodeName.toLowerCase() !== 'a') return
    onClick && onClick(+dataset.id)
  }

  return (
    <div className="tabs is-centered is-boxed">
      <ul onClick={handleClick}>
        {data.map(tab => (
          <li
            key={tab.id}
            className={classnames('_g-tab-item', { 'is-active': currentTab === tab.id })}
          >
            <a data-id={tab.id}>
              <span className="icon is-small">
                <i className={classnames('fa', tab.icon)} aria-hidden="true"></i>
              </span>
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
