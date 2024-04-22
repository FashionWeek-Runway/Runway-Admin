import {CContainer} from '@coreui/react'
import React, {LazyExoticComponent, Suspense} from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'

// routes config
import routes from '../../routes'

const loading = <div className='pt-3 text-center'></div>

const Content = () => {
  const location = useLocation()
  // const [isExistsFilteredRoute] = useState(routes.filter(route => route.path === location.pathname).length > 0)

  return (
    <CContainer fluid>
      <Suspense fallback={loading}>
        <Routes>
          {routes.map((route, idx) => {
            const LazyComponent = route.component as LazyExoticComponent<React.ComponentType<any>>
            return (
              route.component && (
                <Route key={idx} path={route.path} element={route ? <LazyComponent {...route} /> : <LazyComponent />} />
              )
            )
          })}
          <Route path='/' element={<Navigate to='/dashboard' replace />} />
          <Route path='/*' element={<Navigate to='/404' />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(Content)
