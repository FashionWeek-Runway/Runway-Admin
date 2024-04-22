import styled from 'styled-components'

export const CarouselWrap = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  aspect-ratio: 1/1; /* This ensures a square aspect ratio */
  background-color: #f7f2fa;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center; /* Center content vertically */

  .carousel,
  .carousel div {
    width: 100%;
  }

  img {
    width: 100%;
    object-fit: cover;
  }

  .carousel-item-start {
    transform: translateX(0); /* 혹은 다른 값을 시도해보세요. */
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
