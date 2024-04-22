import React, {useEffect, useRef, useState} from 'react'
import {cilListFilter, cilSearch} from '@coreui/icons'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {CButton, CCol, CContainer, CFormInput, CFormSelect, CRow} from '@coreui/react'
import {getProjectList} from '../../apis/project'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import {CSmartPagination} from '../../components/custom/pagination/CSmartPagination'
import CIcon from '@coreui/icons-react'
import {ProjectList, ProjectPageResponse} from '../../models/ProjectList'

export const ITEMS_PER_PAGE = 10

export const project_columns = [
  {
    label: '번호',
    key: 'projectId',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '프로젝트 이름',
    key: 'projectName',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '사용처',
    key: 'usages',
    _style: {width: '20%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '총 기부 수',
    key: 'totalDonationCnt',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '총 기부 금액',
    key: 'totalAmount',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '프로젝트 상태',
    key: 'projectStatus',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '프로젝트 기부 종류',
    key: 'regularStatus',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '상태',
    key: 'status',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
]

const optionList = [{id: 1, label: '프로젝트 이름', value: 'name'}]

export interface IParams {
  size: number
  page: number
}
const Project = (): JSX.Element => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<IParams>({page: 1, size: ITEMS_PER_PAGE})
  const [projectList, setProjectList] = useState<ProjectList[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const status = searchParams.get('status')
    const size = Number(searchParams.get('size'))
    const currentFilter = {
      page: Number(searchParams.get('page')) < 1 ? 1 : Number(searchParams.get('page')),
      size: calibratedPageSize(size),
    }

    console.log(size)
    setFilter(currentFilter)
    getProjectListApi(currentFilter)
  }, [searchParams])

  const calibratedPageSize = (size: number) => {
    if (size < 10) return 10
    else if (size > 1000) return 1000
    return size
  }
  const getProjectListApi = async ({page, size}: IParams) => {
    try {
      const response = await getProjectList<ProjectPageResponse>(size, page - 1)
      const resProjectList = response.contents
      setProjectList([...resProjectList])
      setPageNum(Math.ceil(response?.totalCnt / ITEMS_PER_PAGE))
    } catch (error) {
      alert(error.response.data.message)
      navigate('/login')
    }
  }

  return (
    <div>
      <CContainer className='my-3'>
        <CButton
          color='primary'
          onClick={() => {
            navigate(`/project-management/registration`)
          }}
          style={{marginRight: '10px'}} // 오른쪽으로 10px 간격 추가
        >
          프로젝트 등록
        </CButton>
        <CRow>
          <CCol md={6}>
            <div className='d-flex justify-content-end my-3'></div>
          </CCol>
        </CRow>
      </CContainer>
      <CContainer>
        <CSmartTable
          columns={project_columns}
          itemsPerPage={ITEMS_PER_PAGE}
          items={projectList}
          clickableRows={true}
          onRowClick={item => navigate(`/project-management/${item.projectId}`)}
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
export default Project
