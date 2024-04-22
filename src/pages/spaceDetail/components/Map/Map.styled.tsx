import styled from 'styled-components'

export const Wrap = styled.div`
  width: 100%;

  input {
    border-radius: 10px;
    border: 1px solid #af5dde;
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
`

export const ContentWrap = styled.div`
  padding: 50px;
`
