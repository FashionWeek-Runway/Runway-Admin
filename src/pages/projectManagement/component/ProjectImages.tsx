import React from 'react'
import {CCol, CRow} from '@coreui/react'
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {CContainer} from '@coreui/react'

interface Image {
  imgUrl: string
  imgId: number
  sequence: number
}

interface ProjectImagesProps {
  images: Image[]
}

const ProjectImages: React.FC<ProjectImagesProps> = ({images}) => {
  return (
    <CContainer>
      <CRow className='justify-content-center'>
        <CCol xs='12' md='6' className='text-center'>
          <Carousel showArrows={true} infiniteLoop={true}>
            {images.map((img, index) => (
              <div key={`image-${index}`}>
                <img
                  src={img.imgUrl}
                  alt={`Project Image ${index}`}
                  className='small-image'
                  style={{maxWidth: '100%', maxHeight: '100%'}}
                />
              </div>
            ))}
          </Carousel>
        </CCol>
        {/*<CCol xs='12' md='6'>
          {images.map((img, index) => (
            <div key={`image-${index}`} className='image-text'>
              <p className='legend'>Image {index + 1}</p>
            </div>
          ))}
        </CCol>*/}
      </CRow>
    </CContainer>
  )
}

export default ProjectImages
