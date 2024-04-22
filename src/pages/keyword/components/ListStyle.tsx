import styled from 'styled-components'
// 검색창 레이아웃
export const ReservationSearchContainerStyle = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  background-color: white;
  border-radius: 15px;
  padding: 20px 30px;
  margin-bottom: 25px;
  flex-direction: column;
`

// 예약 목록 레이아웃
export const ReservationListContainerStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  padding: 25px 35px;
`

export const ReservationListElementContainerStyle = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const ReservationListElementStyle = styled.li`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:not(:nth-child(2)) {
    cursor: pointer;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`

export const ReservationListElementNumberStyle = styled.div`
  width: 18%;
  justify-content: start;
`

export const ReservationListElementContactStyle = styled.div`
  width: 25%;
  justify-content: start;
`

export const ReservationListElementEmailStyle = styled.div`
  width: 30%;
  justify-content: start;
`
export const ReservationPaginationWrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  margin-top: 20px;
`
export const ReservationSearchFormContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const ReservationSearchButtonStyle = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 5px;
  background-color: #321fdb;
  color: white;
  outline: none;
  border: none;
  padding: 6px 12px;
  font-size: 15px;
  margin-left: 30px;
`
