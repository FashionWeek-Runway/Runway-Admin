import styled from 'styled-components'

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #bbb7b7;
  background-color: transparent;
  position: relative;
`

export const KeywordBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 5px;
  min-height: 80px;
  max-height: 200px;
  height: 100%;
  overflow-y: scroll;
`

export const KeywordItem = styled.div`
  padding: 5px 10px;
  background-color: #f7f2fa;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;

  &.isSelected {
    background-color: #af5dde;
  }
`

export const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    max-width: 120px;
    background-color: #af5dde;
    border: none;
  }
`

export const ModalContent = styled.div`
  padding: 30px;
`

export const KeywordList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 5px;
  row-gap: 5px;
`

export const SelectedKeywordList = styled(KeywordList)`
  background-color: #f7f2fa;
  border-radius: 10px;
  min-height: 60px;
  padding: 10px;
`

export const SelectedKeywordItem = styled(KeywordItem)`
  display: flex;
  align-items: center;
  column-gap: 5px;
  background-color: #5e0094;
  color: white;
  font-size: 14px;

  button {
    border: none;
    background-color: transparent;
    color: inherit;
    padding: 0;
  }
`

export const Searchbar = styled.form`
  border: 1px solid #5e0094;
  border-radius: 8px;
  height: 30px;
  width: 60%;
  margin: 30px 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;

  input {
    border: none;
    outline: none;
    padding: 0 10px;

    ::placeholder {
      font-size: 14px;
      color: gray;
    }
  }

  button {
    background-color: #5e0094;
    width: 50px;
    height: 100%;
    border: none;
    color: white;
    font-size: 12px;
    padding: 0 5px;
  }
`

export const ButtonList = styled.div`
  display: flex;
  margin-top: 50px;
  width: 100%;
  column-gap: 10px;
  justify-content: flex-end;

  button {
    min-width: 80px;
    height: 40px;
    border-radius: 10px;
    background-color: #f8f082;
    color: #202020;
    border: none;

    &:disabled {
      background-color: lightgray;
    }
  }
`
