import React, {useEffect, useState} from 'react'
import KeywordList from './components/KeywordList'
import axios from 'axios'
import {ListContainerStyle} from './components/RecommnedStyle'
import {getKeywordList} from '../../apis/keyword'

const Keyword = () => {
  const [keywords, setKeywords] = useState([])
  const [onEditFlag, setOnEditFlag] = useState(false)
  const getKeywordsApi = async () => {
    const response: any = await getKeywordList()
    setKeywords(response)
  }
  useEffect(() => {
    getKeywordsApi()
    console.log(keywords)
  }, [onEditFlag])
  return (
    <ListContainerStyle>
      <KeywordList keywords={keywords} setOnEditFlag={setOnEditFlag} onEditFlag={onEditFlag} />
    </ListContainerStyle>
  )
}

export default Keyword
