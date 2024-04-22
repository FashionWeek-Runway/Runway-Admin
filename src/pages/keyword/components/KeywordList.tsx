import React, {useState} from 'react'
import {ContainerStyle} from './style'
import KeywordElement from './KeywordElement'

const KeywordList = ({keywords, setOnEditFlag, onEditFlag}: any) => {
  return (
    <React.Fragment>
      <ContainerStyle>
        <ul>
          {keywords.map((e: any) => (
            <KeywordElement key={e.keyword} keyword={e} onEditFlag={onEditFlag} setOnEditFlag={setOnEditFlag} />
          ))}
        </ul>
      </ContainerStyle>
    </React.Fragment>
  )
}

export default KeywordList
