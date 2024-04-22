import styled from 'styled-components'

export const Wrap = styled.div`
  margin: 50px;
`

export const Header = styled.header`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  margin-bottom: 40px;
`

export const SearchBox = styled.form`
  display: flex;
  align-items: center;
  height: 100%;

  select {
    width: 100px;
  }

  input {
    width: 200px;
  }
`
