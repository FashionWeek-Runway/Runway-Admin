import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CButton,
  CCol,
  CContainer,
  CFormSelect,
  CRow,
  CModalBody,
} from '@coreui/react'
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams, useSearchParams} from 'react-router-dom'
import {InfoBox, InfoBoxContent, InfoBoxTitle, Title} from './project.styled'
import {
  DeleteStatus,
  DonationList,
  DonationPageResponse,
  ProjectDetailInfo,
  ProjectImgList,
  ProjectList,
  ProjectPageResponse,
} from '../../models/ProjectList'
import {activeProject, deleteProject, getDonationList, getProjectDetail, getProjectList} from '../../apis/project'
import ProjectImages from './component/ProjectImages'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import {CSmartPagination} from '../../components/custom/pagination/CSmartPagination' // 이미지 컴포넌트를 import

const INFOBOXTITLE = {
  projectId: '번호',
  projectName: '프로젝트 이름',
  detail: '상세 설명',
  usages: '사용처',
  startDate: '기부 시작 날짜',
  endDate: '기부 마감 날짜',
  projectStatus: '프로젝트 상태',
  regularStatus: '프로젝트 종류',
  status: '상태',
  searchKeyword: '검색 키워드',
  totalDonationCnt: '총 기부 수',
  totalAmount: '총 기부 금액',
  regularDonationCnt: '정기 후원 갯수',
  projectImgLists: '이미지 리스트',
}

export interface IParams {
  size: number
  page: number
}
export const ITEMS_PER_PAGE = 10

export const project_columns = [
  {
    label: '번호',
    key: 'donationId',
    _style: {width: '2%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '유저 번호',
    key: 'userId',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '이름',
    key: 'name',
    _style: {width: '20%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '이메일',
    key: 'email',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '기부 금액',
    key: 'amount',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '고유 번호',
    key: 'inherenceNumber',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '고유 이름',
    key: 'inherenceName',
    _style: {width: '20%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '기부 지불 방법',
    key: 'payMethod',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '기부 상태',
    key: 'donationStatus',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '기부 상태',
    key: 'donationStatusValue',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '정기, 일회성',
    key: 'regularStatus',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '기부 날짜',
    key: 'donationDate',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
]

const Status = {
  BEFORE_START: '기부 시작 전',
  PROCEEDING: '기부 진행중',
  DEADLINE: '마감 됨',
  REGULAR: '정기 후원',
  ONE_TIME: '일회성 후원',
  ACTIVE: '활성화',
  INACTIVE: '비활성화',
}

const ProjectDetail = (): JSX.Element => {
  const [deleteStatus, setProjectStatus] = useState<DeleteStatus | string>('ACTIVE')
  const [mode, setMode] = useState('detail')
  const [projectDetailInfo, setUserDetailInfo] = useState<ProjectDetailInfo | undefined>()
  const [projectImgList, setImgList] = useState<ProjectImgList[] | undefined>()
  const params = useParams()
  const projectId = params.id
  const navigate = useNavigate()
  const [filter, setFilter] = useState<IParams>({page: 1, size: ITEMS_PER_PAGE})
  const [donationList, setDonationList] = useState<DonationList[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [projectIdToDelete, setProjectIdToDelete] = useState(null)
  useEffect(() => {
    const projectDetailApi = async () => {
      try {
        if (typeof projectId === 'undefined') {
          alert('없는 프로젝트입니다..')
          navigate(-1)
        } else {
          const response = await getProjectDetail<ProjectDetailInfo>(projectId)
          const imgResponse = response.projectImgLists
          setUserDetailInfo(response)
          setImgList(imgResponse)
          setProjectStatus(response.status)
        }
      } catch (error) {
        alert(error.response.data.message)
      }
    }
    projectDetailApi()
  }, [projectId])

  useEffect(() => {
    const size = Number(searchParams.get('size'))
    const currentFilter = {
      page: Number(searchParams.get('page')) < 1 ? 1 : Number(searchParams.get('page')),
      size: calibratedPageSize(size),
    }

    console.log(size)
    setFilter(currentFilter)
    getDonationListApi(currentFilter)
  }, [searchParams])

  const calibratedPageSize = (size: number) => {
    if (size < 10) return 10
    else if (size > 1000) return 1000
    console.log(size)
    return size
  }
  const getDonationListApi = async ({page, size}: IParams) => {
    try {
      const response = await getDonationList<DonationPageResponse>(projectId, size, page - 1)
      const resProjectList = response.contents
      setDonationList([...resProjectList])
      setPageNum(Math.ceil(response?.totalCnt / ITEMS_PER_PAGE))
    } catch (error) {
      alert(`${error.message}`)
      navigate('/login')
    }
  }
  const handleDeleteProject = async () => {
    // Display the confirmation dialog when the delete button is clicked
    setShowConfirmation(true)
  }

  const handleConfirmDelete = async () => {
    // Execute the deleteProject API here
    try {
      const projectId = params.id
      await deleteProject(projectId)
      window.location.reload()
      setShowConfirmation(false)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const handleActiveProject = async () => {
    // Execute the deleteProject API here
    try {
      const projectId = params.id
      await activeProject(projectId)
      window.location.reload()
    } catch (error) {
      alert(`${error.message}`)
    }
  }
  const handleCancelDelete = () => {
    // If the user clicks "No" or cancels the confirmation
    // Simply hide the confirmation dialog
    setShowConfirmation(false)
  }

  return (
    <div>
      <CContainer>
        <CRow className='my-3'>
          <CCol className='d-flex justify-content-between'>
            <Title>프로젝트 상세 정보</Title>
          </CCol>
        </CRow>
        {typeof projectImgList !== 'undefined' && (
          <CRow>
            <div>
              <ProjectImages images={projectImgList} />
            </div>
          </CRow>
        )}
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          {deleteStatus === 'ACTIVE' ? (
            // Render the "Delete project" button if projectStatus is "ACTIVE"
            <CButton
              color='primary'
              onClick={() => {
                handleDeleteProject()
              }}
              style={{marginRight: '10px'}}
            >
              프로젝트 삭제
            </CButton>
          ) : deleteStatus === 'INACTIVE' ? (
            // Render the "Project Delete Recovery" button if projectStatus is "INACTIVE"
            <CButton
              color='primary'
              onClick={() => {
                handleActiveProject()
              }}
              style={{marginRight: '10px'}}
            >
              프로젝트 삭제 복구
            </CButton>
          ) : null}
          <CModal visible={showConfirmation} onClose={() => setShowConfirmation(false)}>
            <CModalHeader closeButton>
              <CModalTitle>Confirmation</CModalTitle>
            </CModalHeader>
            <CModalBody>정말 프로젝트를 삭제하시겠습니까??</CModalBody>
            <CModalFooter>
              <CButton color='secondary' onClick={() => setShowConfirmation(false)}>
                아니오
              </CButton>
              <CButton color='primary' onClick={handleConfirmDelete}>
                예
              </CButton>
            </CModalFooter>
          </CModal>
          <div style={{marginLeft: '20px'}}>
            <CButton
              color='primary'
              onClick={() => {
                const projectId = params.id
              }}
              style={{marginRight: '10px'}} // 오른쪽으로 10px 간격 추가
            >
              프로젝트 수정
            </CButton>
          </div>
        </div>
        {typeof projectDetailInfo !== 'undefined' ? (
          Object.entries(projectDetailInfo).map(([key, value]) => {
            if (key === 'projectImgLists') {
              return null // 또는 빈 JSX 요소 반환
            }
            return mode === 'edit' && key === 'status' ? (
              <InfoBox key={`infoBox-${key}-${mode}`} className='my-1' style={{marginRight: '100px'}}>
                <InfoBoxTitle>{INFOBOXTITLE[key as keyof typeof INFOBOXTITLE]}</InfoBoxTitle>
              </InfoBox>
            ) : (
              <InfoBox key={`infoBox-${key}-${mode}`} className='my-1' style={{marginRight: '20px'}}>
                <InfoBoxTitle>{INFOBOXTITLE[key as keyof typeof INFOBOXTITLE]}</InfoBoxTitle>
                <InfoBoxContent>
                  {key === 'status' || key === 'regularStatus' || key === 'projectStatus'
                    ? Status[value as keyof typeof Status]
                    : value}
                </InfoBoxContent>
              </InfoBox>
            )
          })
        ) : (
          <></>
        )}
      </CContainer>
      <CContainer>
        <CSmartTable
          columns={project_columns}
          itemsPerPage={ITEMS_PER_PAGE}
          items={donationList}
          onRowClick={item => navigate(`/project-management/donation/${item.donationId}`)}
          clickableRows={true}
          tableHeadProps={{color: 'dark'}}
          tableProps={{
            hover: true,
            responsive: true,
            bgcolor: 'white',
          }}
        />
        <CSmartPagination
          align='center'
          size='sm'
          limit={11}
          pages={pageNum}
          onActivePageChange={page => {
            searchParams.set('page', String(page))
            setSearchParams(searchParams)
          }}
          activePage={filter.page}
        ></CSmartPagination>
      </CContainer>
    </div>
  )
}
export default ProjectDetail
