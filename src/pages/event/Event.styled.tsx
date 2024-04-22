import styled from 'styled-components'
import {CButton, CForm} from '@coreui/react'
import {Switch} from '@mantine/core'

export const Wrap = styled.div`
  margin: 50px;
`

export const Header = styled.header`
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 40px;
  display: flex;
`
export const Form = styled(CForm)`
  margin: 50px;

  input {
    &:disabled {
      background-color: white;
    }
  }
`

export const ContentWrap = styled.div`
  padding: 50px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  display: flex;
  column-gap: 60px;
  row-gap: 10px;

  > div {
    width: 50%;
  }
`

export const ModalWrap = styled.div`
  padding: 50px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  display: flex;
  column-gap: 60px;
  row-gap: 10px;

  > div {
    width: 100%;
  }
`

export const InputItemWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  column-gap: 5px;
  margin-bottom: 10px;

  &.display {
    align-items: center;
  }

  label {
    text-align: left;
    color: #202020;
    font-size: 15px;
    font-weight: 600;
    min-width: 90px;
  }

  input {
    border-radius: 10px;
    border: 1px solid #bbb7b7;
    background-color: transparent;
    padding: 5px 12px;
    width: 100%;
    outline: none;
    color: #202020;
    font-size: 14px;

    &::placeholder {
      font-size: 12px;
      color: grey;
      vertical-align: center;
    }
  }
  textarea {
    border-radius: 10px;
    border: 1px solid #bbb7b7;
    background-color: transparent;
    padding: 5px 12px;
    width: 100%;
    outline: none;
    color: #202020;
    font-size: 14px;
    resize: none;

    &::placeholder {
      font-size: 12px;
      color: grey;
      vertical-align: center;
    }
  }
`
export const InputDateWrap = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column; /* Adjusted to column layout */
  align-items: center;
  justify-content: center; /* Center the items horizontally */
  margin-bottom: 10px;

  label {
    text-align: left;
    color: #202020;
    font-size: 15px;
    font-weight: 600;
    min-width: 70px;
  }

  input {
    border-radius: 10px;
    border: 1px solid #bbb7b7;
    background-color: transparent;
    padding: 5px 12px;
    width: 90%;
    outline: none;
    color: #202020;
    font-size: 14px;

    &::placeholder {
      font-size: 12px;
      color: grey;
      vertical-align: middle;
    }
  }
`

export const InputEndDateWrap = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column; /* Adjusted to column layout */
  align-items: center;
  justify-content: center; /* Center the items horizontally */
  column-gap: 5px;
  margin-bottom: 10px;

  label {
    text-align: left;
    color: #202020;
    font-size: 15px;
    font-weight: 600;
    min-width: 70px;
  }

  input {
    border-radius: 10px;
    border: 1px solid #bbb7b7;
    background-color: transparent;
    padding: 5px 12px;
    width: 90%;
    outline: none;
    color: #202020;
    font-size: 14px;

    &::placeholder {
      font-size: 12px;
      color: grey;
      vertical-align: middle;
    }
  }
`

export const ImageWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
`

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: #5e0094;
`

export const EditButton = styled(CButton)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #af5dde;
  border: none;
`

export const CustomSwtich = styled(Switch)`
  * {
    border: none;
    padding: 5px;
  }

  input:checked + * {
    background-color: #af5dde;
    color: white;
  }

  input:disabled + * {
    opacity: 0.6;
  }
`

export const EventPreviewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

export const EventPreviewImage = styled.img`
  max-width: 100px;
  height: auto;
  margin-right: 15px;
`

export const EventPreviewDetails = styled.div`
  display: flex;
  flex-direction: column;
`

export const EventPreviewTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  color: #333;
`

export const EventPreviewSmallTitle = styled.p`
  font-size: 14px;
  margin: 5px 0;
  color: #666;
`

export const EventPreviewDate = styled.p`
  font-size: 14px;
  margin: 0;
  color: #888;
`
