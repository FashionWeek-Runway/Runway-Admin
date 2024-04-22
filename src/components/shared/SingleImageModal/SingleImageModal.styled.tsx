import styled from 'styled-components'

export const ContentWrap = styled.div`
  padding: 20px;
`

export const ImageWrap = styled.div`
  img {
    width: 100%;
    aspect-ratio: 1/1;
    height: 100%;
    object-fit: cover;
  }
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    column-gap: 10px;

    button {
      background-color: #f8f082;
      border: none;
      display: inline-block;
      padding: 6px 12px;
      cursor: pointer;
      border-radius: 8px;
      color: #202020;

      &:hover {
        opacity: 0.8;
      }

      &:disabled {
        background-color: lightgrey;
      }
    }
  }

  input[type='file'] {
    display: none;
  }

  label {
    background-color: #af5dde;
    border: none;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 8px;
    color: white;

    &:hover {
      opacity: 0.8;
    }
  }
`
