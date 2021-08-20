import React, { useState, useEffect, useCallback, useRef } from 'react'

import { API as AwsApi, graphqlOperation } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

import { listNotes } from './graphql/queries'
import { createNote, deleteNote, updateNote } from './graphql/mutations'

import { Formik, ErrorMessage } from 'formik'
import { Divider, Input, Table, Button, Row, Col, Spin, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

function App () {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedNote, setSelectedNote] = useState()
  const inputRef = useRef()

  const getNotesList = useCallback(async () => {
    const result = await AwsApi.graphql(graphqlOperation(listNotes))
    const notesList = result.data.listNotes.items
    setNotes([...notesList])
  }, [listNotes])

  useEffect(() => getNotesList(), [getNotesList])

  const addNoteHandler = async note => {
    setLoading(true)
    const input = { note }
    const result = await AwsApi.graphql(graphqlOperation(createNote, { input }))

    const newNote = result.data.createNote
    const updatedNotes = [newNote, ...notes]
    setNotes(updatedNotes)
    setLoading(false)
  }

  const editNoteHandler = async note => {
    setLoading(true)
    const input = { id: selectedNote.id, note }
    const result = await AwsApi.graphql(graphqlOperation(updateNote, { input }))

    const updatedNote = result.data.updateNote
    const updatedNotes = notes.map(el => {
      if (el.id === selectedNote.id) {
        return updatedNote
      } else {
        return el
      }
    })
    setNotes(updatedNotes)
    setLoading(false)
    setSelectedNote(null)
  }

  const deleteNoteHandler = async noteId => {
    setLoading(true)
    const input = { id: noteId }
    const result = await AwsApi.graphql(graphqlOperation(deleteNote, { input }))

    const deletedNoteId = result.data.deleteNote.id
    const updatedNotes = notes.filter(el => el.id !== deletedNoteId)
    setNotes(updatedNotes)
    setLoading(false)
  }

  const columns = [
    // {
    //   key: 'id',
    //   dataIndex: 'id',
    //   title: 'ID'
    // },
    {
      key: 'note',
      dataIndex: 'note',
      title: 'Note'
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: 'Actions',
      render: (_, item) => {
        return (
          <Space size='middle'>
            <Button
              onClick={() => {
                setSelectedNote(item)
                inputRef.current.value = item.note
              }}
              type='primary'
            >
              <EditOutlined />
            </Button>
            <Button onClick={() => deleteNoteHandler(item.id)} type='danger'>
              <DeleteOutlined />
            </Button>
          </Space>
        )
      }
    }
  ]

  console.log({
    notes,
    loading,
    selectedNote,
    note: selectedNote ? selectedNote.note : ''
  })

  return (
    <Spin spinning={loading}>
      <Row gutter={['16', '16']}>
        <Col xs={2} />
        <Col xs={20}>
          <Divider>Amplify Notetaker</Divider>
          <Formik
            initialValues={{ note: selectedNote ? selectedNote.note : '' }}
            validate={values => {
              const errors = {}
              if (!values.note) {
                errors.note = 'Note is required.'
              }
              return errors
            }}
            onSubmit={(values, { resetForm }) => {
              if (!selectedNote) {
                addNoteHandler(values.note, resetForm)
              } else {
                editNoteHandler(values.note, resetForm)
              }
            }}
          >
            {({
              values,
              errors,
              isSubmiting,
              handleSubmit,
              handleChange,
              handleBlur,
              isValid,
              touched,
              initialValues
            }) => {
              if (selectedNote) {
                handleChange('note', selectedNote.note, true)
                handleBlur('note', true, true)
              }
              return (
                <form onSubmit={handleSubmit}>
                  <Input
                    type='text'
                    name='note'
                    placeholder='Enter Note Text...'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.note}
                    ref={inputRef}
                    className={errors.note ? 'invalid' : ''}
                  />
                  <ErrorMessage name='note' />
                  <br />
                  <button
                    type='submit'
                    disabled={
                      isSubmiting ||
                      !isValid ||
                      !touched.note ||
                      (selectedNote && selectedNote.note === values.note)
                    }
                  >
                    {selectedNote ? 'Update' : 'Add'}
                  </button>
                </form>
              )
            }}
          </Formik>
          <Divider />
          <Table dataSource={notes} columns={columns} rowKey='id' />
        </Col>
        <Col xs={2} />
      </Row>
    </Spin>
  )
}

export default withAuthenticator(App, {
  includeGreetings: true
})
