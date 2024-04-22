import React, {Suspense, useState} from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {CContainer} from '@coreui/react'

// routes config
import routes from '../routes'

const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse' />
  </div>
)

const AppContent = () => {
  const location = useLocation()
  const [isExistsFilteredRoute] = useState(routes.filter(route => route.path === location.pathname).length > 0)

  return (
    <CContainer lg>
      <Suspense fallback={loading}>
        {!isExistsFilteredRoute ? (
          <Navigate to='/404' />
        ) : (
          <Routes>
            {routes.map((route, idx) => {
              return route.component && <Route key={idx} path={route.path} element={<route.component />} />
            })}
            <Route path='/' element={<Navigate to='/dashboard' replace />} />
          </Routes>
        )}
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
