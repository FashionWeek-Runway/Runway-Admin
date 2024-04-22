import styled from 'styled-components'

export const ContainerStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  ul {
    background: white;
    width: 50%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0;
    justify-content: center;
    align-items: center;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    padding: 15px;
    border: 1px solid var(--cui-input-border-color, #b1b7c1);
    border-radius: 7px;
    margin: 10px;
  }

  input {
    width: 65%;
    outline: none;
    border: none;
    border-bottom: 1px solid black;
  }
`
