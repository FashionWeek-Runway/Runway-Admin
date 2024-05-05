import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Content from '../components/Content'
import Footer from '../components/Footer'

const DefaultLayout = () => {
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
