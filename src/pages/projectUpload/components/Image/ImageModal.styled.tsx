import {CModal} from '@coreui/react'
import styled from 'styled-components'

export const Modal = styled(CModal)`
  .modal-content {
    padding: 20px;
  }
`

export const ImageWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`

export const ImageItem = styled.div`
  position: relative;
  width: 150px;
  height: 150px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    border: none;
    background-color: transparent;
    position: absolute;
    top: 0;
    right: 0;
  }
`

export const Button = styled.button<{isLabel?: boolean}>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  background-color: ${({isLabel}) => (isLabel ? '#af5dde' : '#f8f082;')};
  color: ${({isLabel}) => (isLabel ? 'white' : 'black')};
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

export const Controllers = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  input[type='file'] {
    display: none;
  }
`

export const ButtonsWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  ${Button} {
    &:disabled {
      background-color: lightgray;
    }
  }
`
