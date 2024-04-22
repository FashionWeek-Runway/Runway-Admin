import styled from 'styled-components'
import {CButton} from '@coreui/react'
import {ReservationListContainerStyle, ReservationSearchContainerStyle} from './ListStyle'

export const ListContainerStyle = styled(ReservationListContainerStyle)`
  flex-direction: row;
  justify-content: center;
  /* width: 100%;
  background-color: transparent; */

  /* ul {
    width: 50%;
    display: grid;
    border: 1px solid black;
    border-radius: 7px;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
  } */
`

export const CreateContainer = styled(ReservationSearchContainerStyle)`
  height: 100px;
`
