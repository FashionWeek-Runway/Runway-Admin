import styled from 'styled-components'

export const ContentWrap = styled.div`
  padding: 40px;
  text-align: center;

  h2 {
    font-size: 28px;
  }
`

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  align-items: center;

  button {
    margin-top: 30px;
    width: 100%;
    border: none;
    border-radius: 10px;
    height: 50px;
    background-color: #5e0094;
    color: white;
    /* font-size: 14px; */
    cursor: pointer;

    &:first-child {
      background-color: grey;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`
