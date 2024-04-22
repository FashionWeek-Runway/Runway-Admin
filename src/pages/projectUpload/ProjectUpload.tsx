import React, {useState, Dispatch, SetStateAction, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {createSpaceItem, deleteSpace, getSpaceImage, getSpaceItem, updateSpaceItem} from '../../apis/space'
import {dataURLtoFile, generateDataUrl, getFileName} from '../../utils/file'
import ImageCarousel from './components/Image/ImageCarousel'
import * as S from './ProjectUpload.styled'
import ImagePresent from './components/Image/ImagePresent'
import {CButton, CCol, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText} from '@coreui/react'
import {ProjectUploadForm} from '../../models/ProjectList'
import {createProject} from '../../apis/project'
import {TextArea} from './ProjectUpload.styled'

export const initialNewProject: ProjectUploadForm = {
  projectName: '',
  detail: '',
  usages: '',
  startDate: '',
  endDate: '',
  regularStatus: '',
  projectKind: '',
  searchKeyword: '',
}

function ProjectUpload() {
  const navigate = useNavigate()
  const {id} = useParams<{id?: string}>()

  const [projectData, setProjectData] = useState(initialNewProject)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [presentFile, setPresentFile] = useState<File | null>(null)
  const [projectName, setProjectName] = useState('')
  const [usage, setUsage] = useState('')
  const [detail, setDetail] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [startDate, setDonationStartDate] = useState('')
  const [endDate, setDonationEndDate] = useState('')
  const [donationType, setDonationType] = useState('')
  const [sponsorshipField, setSponsorshipField] = useState('')

  const generateImageFile = async (imageUrl: string) => {
    const res = await getSpaceImage(imageUrl)
    const fileName = getFileName(res.headers)
    const string = generateDataUrl(imageUrl, res)
    const file = dataURLtoFile(string, fileName as string)
    return file
  }

  const handleSubmit = async () => {
    console.log(JSON.stringify(projectData))

    const formData = new FormData()

    formData.append(
      'project',
      new Blob([JSON.stringify(projectData)], {
        type: 'application/json',
      }),
    )

    if (presentFile) {
      formData.append('presentFile', presentFile)
    }

    imageFiles &&
      imageFiles.forEach(file => {
        formData.append('multipartFiles', file)
      })

    console.log(formData)

    await createProject(formData)
    navigate(`/project-management`)
  }

  const handleChange = (e: any) => {
    const {name, value} = e.target
    console.log(projectData)
    setProjectData({
      ...projectData,
      [name]: value,
    })
  }

  const generateValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, type} = event.target

    switch (type) {
      case 'checkbox':
        return (event.currentTarget as HTMLInputElement).checked
      case 'number':
        return parseInt(value)
      default:
        return value
    }
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.ContentWrap>
        <S.ContentBox>
          <section>
            <ImagePresent
              presentFile={presentFile || null} // Provide a default value of null if presentFile is undefined
              setPresentFile={setPresentFile}
              title={'썸네일 사진'}
            />
          </section>
          <section>
            <ImageCarousel imageFiles={imageFiles} setImageFiles={setImageFiles} />
          </section>
        </S.ContentBox>
        <div>
          <CInputGroup className='mb-3'>
            <CInputGroupText>프로젝트 이름</CInputGroupText>
            <CFormInput
              type='text'
              name='projectName'
              value={projectData.projectName}
              onChange={handleChange}
              placeholder='프로젝트 이름을 입력해주세요'
            />
          </CInputGroup>
          <CInputGroup className='mb-3'>
            <CInputGroupText>사용처</CInputGroupText>
            <CFormInput
              type='text'
              name='usages'
              value={projectData.usages}
              onChange={handleChange}
              placeholder='기부금 사용처를 입력해주세요'
            />
          </CInputGroup>
          <CInputGroup className='mb-3'>
            <CInputGroupText>프로젝트 설명</CInputGroupText>
            <CFormInput
              type='text'
              name='detail'
              value={projectData.detail}
              onChange={handleChange}
              placeholder='프로젝트에 대한 설명을 입력해주세요'
            />
          </CInputGroup>
          <CInputGroup className='mb-3'>
            <CInputGroupText>검색 키워드</CInputGroupText>
            <CFormInput
              type='text'
              name='searchKeyword'
              value={projectData.searchKeyword}
              onChange={handleChange}
              placeholder='사용자가 검색시 같이 검색될 키워드들입니다.'
            />
          </CInputGroup>

          <CInputGroup className='mb-3'>
            <CInputGroupText>시작 날짜</CInputGroupText>
            <CFormInput type='date' name='startDate' value={projectData.startDate} onChange={handleChange} />
            <CInputGroupText>마감 날짜</CInputGroupText>
            <CFormInput type='date' name='endDate' value={projectData.endDate} onChange={handleChange} />
          </CInputGroup>

          <CInputGroup className='mb-3'>
            <CInputGroupText>기부 종류</CInputGroupText>
            <CFormSelect name='regularStatus' value={projectData.regularStatus} onChange={handleChange}>
              <option value='NOT'>후원 종류를 선택해주세요</option>
              <option value='REGULAR'>정기 후원</option>
              <option value='ONE_TIME'>일회성 후원</option>
            </CFormSelect>
          </CInputGroup>

          <CInputGroup className='mb-3'>
            <CInputGroupText>후원 분야</CInputGroupText>
            <CFormSelect name='projectKind' value={projectData.projectKind} onChange={handleChange}>
              <option value='NOT'>후원분야를 선택해주세요</option>
              <option value='CHILDREN'>어린이</option>
              <option value='YOUTH'>청년</option>
              <option value='WOMEN'>여성</option>
              <option value='ELDER'>어르신</option>
              <option value='DISABLED'>장애인</option>
              <option value='SOCIAL'>우리 사회</option>
              <option value='EARTH'>지구촌</option>
              <option value='NEIGBOR'>이웃</option>
              <option value='ANIMAL'>동물</option>
              <option value='ENVIRONMENT'>환경</option>
            </CFormSelect>
          </CInputGroup>
        </div>
        <CButton
          onClick={handleSubmit}
          disabled={
            Object.values(projectData).some(value => !value) ||
            projectData.projectKind === 'NOT' ||
            projectData.regularStatus === 'NOT' ||
            imageFiles.length === 0 ||
            presentFile == null
          }
        >
          프로젝트 등록
        </CButton>
      </S.ContentWrap>
    </S.Form>
  )
}

export default ProjectUpload
