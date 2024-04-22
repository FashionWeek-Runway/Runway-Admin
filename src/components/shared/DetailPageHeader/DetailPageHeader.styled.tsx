import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  button {
    border: none;
    background-color: #5e0094;
    color: white;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`

export const Buttons = styled.div`
  display: flex;
  column-gap: 10px;

  button:disabled {
    background-color: darkgray;
  }
`
