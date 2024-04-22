import styled from 'styled-components'

export const CarouselWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  aspect-ratio: 1/1;
  background-color: #f7f2fa;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-bottom: 30px;
  overflow: hidden;

  .carousel,
  .carousel div {
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #202020;
  }

  ul {
    list-style: circle;
    padding-left: 28px;
    li::marker {
      content: '▷ ';
      font-size: 1.2em;
      color: #5e0094;
    }
  }
`

export const ButtonWrap = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;

  button {
    background-color: #af5dde;
    border: none;
  }
`
