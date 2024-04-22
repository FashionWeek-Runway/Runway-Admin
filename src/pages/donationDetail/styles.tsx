import styled from 'styled-components'
import '../../scss/style.scss'

export const Label = styled.div``

export const CustomButton = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: 1px solid gray;
  border-radius: 2rem;
  color: gray;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  width: fit-content;
  min-width: fit-content;

  /*크기*/
  font-size: 1rem;

  /*색상 */
  background: white;
  &:hover {
    color: black;
    border: 1px solid black;
  }

  &.selected {
    color: rgba(255, 255, 255, 0.87);
    background: #d15437;
    border: 1px solid #d15437;
    &:hover {
      background: #dc8286;
      border: 1px solid #dc8286;
    }
  }
`

export const Title = styled.div`
  font-size: 1.5rem;
`

export const InfoBox = styled.div`
  background: white;
  width: 100%;
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  text-align: center;
`

export const InfoBoxTitle = styled.div`
  text-align: left;
  line-height: 3rem;
  width: 100px;
  margin-left: 1rem;
  font-weight: bold;
`

export const InfoBoxContent = styled.div`
  line-height: 3rem;

  & select {
    width: 100px;
    border-radius: 10px;
  }
`
