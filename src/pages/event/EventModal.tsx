import React, {useEffect, useState} from 'react'
import {CModal, CModalBody, CModalFooter, CModalHeader, CButton, CImage, CFormSelect} from '@coreui/react'
import {IBannerItem} from '../../models/Banner'
import * as S from './Event.styled'
import {createBanner, updateBanner} from '../../apis/banner'
import {ContentsType, IEventContent, IEventItem} from '../../models/Event'
import ImagePresent from './components/ImagePresent'
import {uploadImage} from '../../apis/common'
import {createEvent} from '../../apis/event'

interface BannerModalProps {
  showModal: boolean
  title: string
  eventId: number
  onClose: () => void
  isEditMode: boolean
  item: IEventItem
  // Add other necessary props
}
const EventModal: React.FC<BannerModalProps> = ({showModal, onClose, title, eventId, isEditMode, item}) => {
  const [imageFile, setImageFile] = useState<File | string | null>(null)
  const [thumbnail, setThumbnail] = useState<File | string | null>(null)
  const [eventInfo, setEventInfo] = useState<IEventItem>({
    title: '',
    eventId: 0,
    name: '',
    eventType: '',
    smallTitle: '',
    startDate: '',
    endDate: '',
    thumbnail: '',
  })
  const [isEditImage, setIsEditImage] = useState(false)
  const [contentsList, setContentsList] = useState<IEventContent[]>([])
  const handleInputChange = (e: any) => {
    const {name, value} = e.target
    console.log(`Updating state for ${name}: ${value}`)
    setEventInfo(prevInfo => ({...prevInfo, [name]: value}))
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
              ...eventInfo,
              editImage: edit,
              startDate: eventInfo.startDate,
              endDate: eventInfo.endDate,
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
              ...eventInfo,
              contentsList: contentsList,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      )
      formData.append('thumbnail', thumbnail as File)

      console.log(formData.get('eventUploadReq'))
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
      updatedContentsList[index].contents = imgResponse
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
      <CModalHeader closeButton> {isEditMode ? '이벤트 수정' : '이벤트 추가'} </CModalHeader>
      <S.ModalWrap>
        <div>
          <S.InputItemWrap>
            <label>이벤트명</label>
            <textarea
              name='title'
              value={eventInfo.title}
              onChange={handleInputChange}
              placeholder='이벤트 이름을 입력해주세요.'
              style={{width: '100%', minHeight: '20px'}}
            />
          </S.InputItemWrap>
          <S.InputItemWrap>
            <label>이벤트 타입</label>
            <CFormSelect name='eventType' value={eventInfo.eventType} onChange={handleInputChange}>
              <option value='NOT'>선택</option>
              <option value='MATCH_EVENT'>매치 이벤트</option>
              <option value='MATCHING'>매칭 기부</option>
            </CFormSelect>
          </S.InputItemWrap>
          <S.InputItemWrap>
            <label>이벤트 소제목</label>
            <textarea
              name='smallTitle'
              value={eventInfo.smallTitle}
              onChange={handleInputChange}
              placeholder='이벤트 소제목을 입력해주세요.'
              style={{width: '100%', minHeight: '20px'}}
            />
          </S.InputItemWrap>
          <S.InputItemWrap>
            <label>노출 기간</label>
            <S.InputDateWrap>
              <input
                type='date'
                name='startDate'
                value={eventInfo.startDate}
                onChange={handleInputChange}
                placeholder='이벤트 시작일을 입력해주세요.'
              />
            </S.InputDateWrap>
            <span style={{margin: '0 5px', textAlign: 'center'}}>~</span>
            <S.InputEndDateWrap>
              <input
                type='date'
                name='endDate'
                value={eventInfo.endDate}
                onChange={handleInputChange}
                placeholder='이벤트 종료일을 입력해주세요.'
              />
            </S.InputEndDateWrap>
          </S.InputItemWrap>
          <S.InputItemWrap>
            <label>이벤트 이미지</label>
            <ImagePresent
              presentFile={isEditMode ? thumbnail || eventInfo.thumbnail : thumbnail}
              setPresentFile={setThumbnail}
              title={'이벤트 이미지'}
              isEditMode={isEditMode}
            />
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
            eventInfo.eventType === 'NOT' ||
            thumbnail == null ||
            contentsList.length === 0 ||
            eventInfo.startDate === '' ||
            eventInfo.endDate === '' ||
            eventInfo.title === '' ||
            eventInfo.smallTitle === ''
          }
        >
          {isEditMode ? '수정 저장' : '배너 추가'}
        </CButton>{' '}
        <CButton color='secondary' onClick={onClose}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EventModal
