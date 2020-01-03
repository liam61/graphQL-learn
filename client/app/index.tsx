import React, { useState, useRef, useCallback } from 'react'
import { Tabs, TAB } from '~/components/tabs'
import { Footer } from '~/components/footer'
import { TabRef, SerializedValue } from 'client/types'
import { TabQuery } from './tab/tab-query'
import { TabLogin } from './tab/tab-login'
import { TabAdd } from './tab/tab-add'
import { TabUpdate } from './tab/tab-update'
import { TabDelete } from './tab/tab-delete'
import { ResQuery } from './result/res-query'
import { ResLogin } from './result/res-login'
import { ResMutation } from './result/res-mutation'

const tabData = [
  { id: TAB.QUERY, label: 'query', icon: 'fa-search' },
  { id: TAB.LOGIN, label: 'login', icon: 'fa-key' },
  { id: TAB.ADD, label: 'add', icon: 'fa-plus' },
  { id: TAB.UPDATE, label: 'update', icon: 'fa-pencil' },
  { id: TAB.DELETE, label: 'delete', icon: 'fa-trash-o' },
]

export default function Home() {
  const [tab, setTab] = useState<TAB>(TAB.QUERY)
  const [isSubmit, setIsSubmit] = useState(false)
  const [formData, setFormData] = useState<SerializedValue>({})
  const tabRef = useRef<TabRef>()

  const handleChange = useCallback(
    (t: TAB) => {
      tabRef.current && tabRef.current.onClear()
      isSubmit && setIsSubmit(false)
      setTab(t)
    },
    [tabRef.current, isSubmit],
  )

  const handleSubmit = useCallback(() => {
    const valuesOrError = tabRef.current.onSerialize()
    if (valuesOrError === false) return
    setFormData(valuesOrError)
    setIsSubmit(true)
  }, [tabRef.current])

  const renderTab = () => {
    switch (tab) {
      case TAB.QUERY:
        return <TabQuery ref={tabRef} />
      case TAB.LOGIN:
        return <TabLogin ref={tabRef} />
      case TAB.ADD:
        return <TabAdd ref={tabRef} />
      case TAB.UPDATE:
        return <TabUpdate ref={tabRef} />
      case TAB.DELETE:
        return <TabDelete ref={tabRef} />
    }
  }

  const handleBack = useCallback(() => setIsSubmit(false), [])
  const resProps = {
    formData,
    onBack: handleBack,
  }

  const renderRes = () => {
    switch (tab) {
      case TAB.QUERY:
        return <ResQuery {...resProps} />
      case TAB.LOGIN:
        return <ResLogin {...resProps} />
      default:
        return <ResMutation type={tab} {...resProps} />
    }
  }

  return (
    <div className="_g-container">
      <section className="hero">
        <div className="hero-body">
          <Tabs data={tabData} currentTab={tab} onClick={handleChange} />
          {!isSubmit ? (
            <>
              {renderTab()}
              <Footer
                okText="Submit"
                cancelText="Clear"
                onOk={handleSubmit}
                onCancel={() => tabRef.current.onClear()}
              />
            </>
          ) : (
            renderRes()
          )}
        </div>
      </section>
    </div>
  )
}
