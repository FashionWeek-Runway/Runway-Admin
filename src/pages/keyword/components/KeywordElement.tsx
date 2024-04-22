import React, {useState} from 'react'
import {CButton} from '@coreui/react'
import axios from 'axios'
import {patchKeyword} from '../../../apis/keyword'

const KeywordElement = ({keyword, setOnEditFlag, onEditFlag}: any) => {
  const [editFlag, setEditFlag] = useState(false)
  const [editValue, setEditValue] = useState(keyword.keyword)
  const changeEditFlag = () => {
    setEditFlag(!editFlag)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  const handleEdit = async () => {
    console.log(editValue, keyword)
    await patchKeyword(keyword.keywordId, editValue)

    setOnEditFlag(!onEditFlag)
  }

  return (
    <li key={keyword.keyword}>
      {editFlag === false ? (
        <React.Fragment>
          <div>{keyword.priority}</div>
          <div>{keyword.keyword}</div>
          <div>
            <CButton className='btn btn-primary btn-sm' onClick={changeEditFlag} style={{marginRight: '8px'}}>
              수정
            </CButton>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <input value={editValue} onChange={onChange} />
          <div>
            <CButton className='btn btn-primary btn-sm' onClick={handleEdit} style={{marginRight: '8px'}}>
              저장
            </CButton>
          </div>
        </React.Fragment>
      )}
    </li>
  )
}

export default KeywordElement
