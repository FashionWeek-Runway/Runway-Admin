import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Content from '../components/Content'
import Footer from '../components/Footer'

const DefaultLayout = () => {
  /*const navigate = useNavigate()

  useEffect(() => {
    if (isEmpty(window.localStorage.getItem('jwt'))) {
      window.localStorage.clear()
      navigate(`/login`)
      return false
    }

    const fetchData = async () => {
      try {
        const {data: response} = await ApiConfig.request({
          method: HttpMethod.GET,
          url: EndPoint.GET_V1_TEST_AUTO_LOGIN,
          path: {isManual: false},
        })

        if (!response.isSuccess) {
          alert(response.message)
          window.localStorage.clear()
          navigate(`/login`)
        }
      } catch (error) {
        alert(`네트워크 통신 실패. 잠시후 다시 시도해주세요.\n${error.message}`)
        return false
      }
    }
    fetchData().then()
  }, [])*/

  return (
    <>
      <Sidebar />
      <div className='wrapper d-flex flex-column min-vh-100 bg-light dark:bg-transparent'>
        <Header />
        <Content />
        <Footer />
      </div>
    </>
  )
}

export default DefaultLayout
