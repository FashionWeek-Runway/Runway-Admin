import React, {useEffect, useState} from 'react'
import {CModal, CModalBody, CModalFooter, CModalHeader, CButton, CImage, CFormSelect} from '@coreui/react'
import * as S from './Notice.styled'
import {createBanner, updateBanner} from '../../apis/banner'
import {ContentsType, IEventContent, IEventItem} from '../../models/Event'
import {uploadImage} from '../../apis/common'
import {createEvent} from '../../apis/event'
import {INoticeItem} from '../../models/Notice'

interface BannerModalProps {
  showModal: boolean
  title: string
  eventId: number
  onClose: () => void
  isEditMode: boolean
  item: INoticeItem
  // Add other necessary props
}
const NoticeModal: React.FC<BannerModalProps> = ({showModal, onClose, title, eventId, isEditMode, item}) => {
  const [imageFile, setImageFile] = useState<File | string | null>(null)
  const [thumbnail, setThumbnail] = useState<File | string | null>(null)
  const [noticeInfo, setNoticeInfo] = useState<INoticeItem>({
    noticeId: 0,
    title: '',
    noticeType: '',
    noticeDate: '',
  })
  const [isEditImage, setIsEditImage] = useState(false)
  const [contentsList, setContentsList] = useState<IEventContent[]>([])
  const handleInputChange = (e: any) => {
    const {name, value} = e.target
    console.log(`Updating state for ${name}: ${value}`)
    setNoticeInfo(prevInfo => ({...prevInfo, [name]: value}))
  }
  const [text, setText] = useState<string>('')

  const handleAddOrUpdateEvent = async () => {
    if (isEditMode) {
      const formData = new FormData()
      if (imageFile != null) {
        setIsEditImage(true)
        formData.append('bannerImage', imageFile as File)
      }
      const edit = isEditMode
      formData.append(
        'bannerPatchDto',
        new Blob(
          [
            JSON.stringify({
              ...noticeInfo,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      )
      await updateBanner(eventId, formData)
    } else {
      const formData = new FormData()
      formData.append(
        'eventUploadReq',
        new Blob(
          [
            JSON.stringify({
              ...noticeInfo,
              contentsList: contentsList,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      )
      console.log(contentsList)
      console.log('formData' + formData)

      await createEvent(formData)
    }
    window.location.reload()
    onClose()
  }

  const handleContentsTypeChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const newContentsType = event.target.value as ContentsType // 타입 변환
    const updatedContentsList = [...contentsList]
    updatedContentsList[index].contentsType = newContentsType
    setContentsList(updatedContentsList)
  }

  const handleAddImageContent = () => {
    setContentsList(prevContents => [
      ...prevContents,
      {contentsType: 'IMG', contents: '', imageFile: null}, // 이미지 추가 버튼을 클릭할 때마다 새로운 객체 추가
    ])
  }

  const handleAddTextContent = () => {
    setContentsList(prevContents => [...prevContents, {contentsType: 'TEXT', contents: ''}])
  }
  const handleContentsChange = (index: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target
    const updatedContentsList = [...contentsList]
    updatedContentsList[index].contents = value
    setContentsList(updatedContentsList)
  }

  const handleImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const updatedContentsList = [...contentsList]
      const formData = new FormData()
      formData.append('imgFile', file as File)
      formData.append('uploadFolder', 'EVENT')
      console.log(formData)
      const imgResponse: any = await uploadImage(formData)
      updatedContentsList[index].contents = imgResponse.result
      setContentsList(updatedContentsList)
      setImageFile(null)
    }
  }
  const handleRemoveContent = (index: number) => {
    const updatedContentsList = [...contentsList]
    updatedContentsList.splice(index, 1)
    setContentsList(updatedContentsList)
  }

  useEffect(() => {
    console.log(isEditMode)
    if (isEditMode) {
      //setBannerInfo(item)
      console.log('editMode')
    } else {
      console.log('addMode')
    }
  }, [isEditMode, eventId])

  return (
    <CModal visible={showModal} onClose={onClose} size='lg'>
      <CModalHeader closeButton> {isEditMode ? '공지사항 수정' : '공지사항 추가'} </CModalHeader>
      <S.ModalWrap>
        <div>
          <S.InputItemWrap>
            <label>공지사항 제목</label>
            <textarea
              name='title'
              value={noticeInfo.title}
              onChange={handleInputChange}
              placeholder='공지사항 제목을 입력해주세요.'
              style={{width: '100%', minHeight: '20px'}}
            />
          </S.InputItemWrap>
          <S.InputItemWrap>
            <label>공지사항 타입</label>
            <CFormSelect name='noticeType' value={noticeInfo.noticeType} onChange={handleInputChange}>
              <option value='NOT'>선택</option>
              <option value='EVENT'>이벤트 및 행사 공지</option>
              <option value='SCHEDULE'>일정 및 휴무 공지</option>
              <option value='SERVICE_UPDATE'>서비스 업데이트</option>
              <option value='JOB'>채용 및 구인 정보</option>
              <option value='SECURITY'>보안 공지</option>
              <option value='IMPORTANT'>중요 공지</option>
              <option value='EMERGENCY'>주요 이슈 및 재난 공지</option>
              <option value='ADMIN'>행정 및 관리 공지</option>
              <option value='EDUCATION'>학교 및 교육 공지</option>
              <option value='HEALTH'>건강 및 의료 공지</option>
              <option value='PROJECT'>주요 프로젝트 및 연구 공지</option>
              <option value='SOCIAL'>사회적 활동 공지</option>
            </CFormSelect>
          </S.InputItemWrap>
          <S.InputItemWrap>
            <label>이미지 추가</label>
            <CButton onClick={handleAddImageContent} color={'dark'}>
              이미지 추가
            </CButton>
          </S.InputItemWrap>
          <S.InputItemWrap>
            <label>텍스트 추가</label>
            <CButton onClick={handleAddTextContent} color={'dark'}>
              텍스트 추가
            </CButton>
          </S.InputItemWrap>
          {contentsList.map((content, index) => (
            <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
              <S.InputItemWrap style={{flex: 1}}>
                {content.contentsType === 'IMG' && (
                  <>
                    <label>{`이미지 ${index + 1}`}</label>
                    <input type='file' accept='image/*' onChange={e => handleImageChange(index, e)} />
                  </>
                )}
                {content.contentsType === 'TEXT' && (
                  <>
                    <label>{`텍스트 ${index + 1}`}</label>
                    <textarea
                      name='text'
                      value={content.contents}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleContentsChange(index, e)}
                    />
                  </>
                )}
                <CButton onClick={() => handleRemoveContent(index)} color={'dark'} style={{width: '70px'}}>
                  삭제
                </CButton>
              </S.InputItemWrap>
            </div>
          ))}
        </div>
      </S.ModalWrap>
      <CModalFooter>
        <CButton
          color='dark'
          onClick={handleAddOrUpdateEvent}
          disabled={
            thumbnail == null || contentsList.length === 0 || noticeInfo.title === '' || noticeInfo.noticeType === ''
          }
        >
          {isEditMode ? '수정 저장' : '공지사항 추가'}
        </CButton>{' '}
        <CButton color='secondary' onClick={onClose}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default NoticeModal
