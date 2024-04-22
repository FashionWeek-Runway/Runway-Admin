import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import 'core-js'
import './scss/style.scss'
import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import packageJson from '../package.json'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

const loading = <div>화면을 불러오는 중 입니다.</div>

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./pages/login/Login'))
const Page404 = React.lazy(() => import('./pages/page404/Page404'))
const Page500 = React.lazy(() => import('./pages/page500/Page500'))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/404' element={<Page404 />} />
          <Route path='/500' element={<Page500 />} />
          <Route path='/*' element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
