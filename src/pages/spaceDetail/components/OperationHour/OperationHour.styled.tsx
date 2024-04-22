import styled from 'styled-components'

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

export const HourItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 10px;

  input {
    min-width: 120px;

    &:disabled {
      color: #202020;
      opacity: 1;
    }
  }

  button {
    &:disabled {
      color: #202020;
      background-color: transparent;
      border: none;
    }
  }
`

export const Name = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #202020;
`
