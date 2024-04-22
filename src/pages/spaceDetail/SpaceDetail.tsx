import React, {useState, Dispatch, SetStateAction, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {createSpaceItem, deleteSpace, getSpaceImage, getSpaceItem, updateSpaceItem} from '../../apis/space'
import {ISpaceItem} from '../../models/Space'
import {
  IInputItem,
  INPUTS,
  LEFT_SECTION_INPUTS,
  RIGHT_SECTION_INPUTS,
  SPACE_OPTION_INPUTS,
} from './spaceDetail.constant'
import {dataURLtoFile, generateDataUrl, getFileName} from '../../utils/file'
import OperationHour from './components/OperationHour/OperationHour'
import Keyword from './components/Keyword/Keyword'
import ImageCarousel from './components/Image/ImageCarousel'
import Map from './components/Map/Map'
import Floor, {generateFloorNum} from './components/Floor'
import DetailPageHeader from '../../components/shared/DetailPageHeader/DetailPageHeader'
import DeleteModal from '../../components/shared/DeleteModal/DeleteModal'
import * as S from './SpaceDetail.styled'

export const initialNewSpace: ISpaceItem = {
  placeIdx: 0,
  placeName: '',
  placeExplain: '',
  placeInfo: '',
  placeCost: -1,
  placeAddress: '',
  placeUrl: '',
  placeMinReserveDate: -1,
  placeLocation: '',
  placeConcept: '',
  placeCategory: '',
  placeOperationWeekDayStartDateTime: '',
  placeOperationWeekDayEndDateTime: '',
  placeOperationWeekEndStartDateTime: '',
  placeOperationWeekEndEndDateTime: '',
  placeFootTraffic: '',
  placeNearbyInfo: '',
  placeCaution: '',
  placeRefundPolicy: '',
  a3CanvasCount: -1,
  placeFloor: 0,
  isElevatorExistence: false,
  isParkingLotExistence: false,
  placeImageList: [],
  placeKeywordList: [],
  pcanvasCount: -1,
  display: true,
  bookable: true,
}

const renderInput = (
  isEditMode: boolean,
  inputItem: IInputItem,
  formData: ISpaceItem,
  setFormData: Dispatch<SetStateAction<ISpaceItem>>,
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
) => {
  switch (inputItem.type) {
    case 'timePicker':
      return <OperationHour formData={formData} setFormData={setFormData} isEditMode={isEditMode} />
    case 'map':
      return <Map formData={formData} setFormData={setFormData} isEditMode={isEditMode} />
    case 'toggle':
      return (
        <S.CustomSwtich
          size='xl'
          onLabel='있음'
          offLabel='없음'
          onChange={handleChange}
          id={inputItem.name}
          checked={formData[inputItem.name] as boolean}
          disabled={!isEditMode}
        />
      )
    case 'checkbox':
      return (
        <S.CustomSwtich
          size='xl'
          onLabel='노출'
          offLabel='숨기기'
          onChange={handleChange}
          id={inputItem.name}
          checked={formData[inputItem.name] as boolean}
          disabled={!isEditMode}
        />
      )
    case 'keyword':
      return <Keyword formData={formData} setFormData={setFormData} isEditMode={isEditMode} />
    case 'floor':
      return (
        <Floor
          formData={formData}
          setFormData={setFormData}
          isEditMode={isEditMode}
          placeholder={inputItem.placeholder}
        />
      )
    case 'textarea':
      return (
        <textarea
          rows={inputItem.size === 'l' ? 20 : 5}
          id={inputItem.name}
          value={formData[inputItem.name] as string}
          onChange={handleChange}
          disabled={!isEditMode}
          required
        />
      )
    default:
      return (
        <input
          value={formData[inputItem.name] as string | number}
          onChange={handleChange}
          type={inputItem.type}
          id={inputItem.name}
          aria-describedby={inputItem.name}
          min={inputItem.type === 'number' ? -1 : undefined}
          maxLength={inputItem.type === 'text' ? inputItem.maxLength : undefined}
          placeholder={inputItem.placeholder}
          disabled={!isEditMode}
          required
        />
      )
  }
}

interface SpaceDetailProps {
  isNew?: boolean
}

function SpaceDetail({isNew}: SpaceDetailProps) {
  const navigate = useNavigate()
  const {id} = useParams<{id?: string}>()

  const [spaceData, setSpaceData] = useState(initialNewSpace)
  const [imageFiles, setImageFiles] = useState<File[]>([])

  const [isEditMode, setIsEditMode] = useState(!isNew && id ? false : true)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const generateImageFile = async (imageUrl: string) => {
    const res = await getSpaceImage(imageUrl)
    const fileName = getFileName(res.headers)
    const string = generateDataUrl(imageUrl, res)
    const file = dataURLtoFile(string, fileName as string)
    return file
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      const data = await getSpaceItem(parseInt(id))
      setSpaceData(data)

      const imageFilePromises = data.placeImageList.map(async image => {
        const imageFile = await generateImageFile(image)
        return imageFile
      })
      const imageFiles = await Promise.all(imageFilePromises)
      setImageFiles(imageFiles)
    }

    if (!isNew && id) {
      fetchData()
    }
  }, [isNew, id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isNew) {
      const formData = new FormData()
      const {placeIdx, placeImageList, placeKeywordList, placeFloor, ...res} = spaceData
      formData.append(
        'postAllPlaceReq',
        new Blob(
          [
            JSON.stringify({
              ...res,
              placeImageUrlList: placeImageList,
              keywordList: placeKeywordList,
              placeFloor: generateFloorNum(placeFloor as string),
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      )

      imageFiles &&
        imageFiles.forEach(file => {
          formData.append('photoUrl', file)
        })

      const {placeIdx: placeNumber} = await createSpaceItem(formData)
      navigate(`/space/${placeNumber}`)
    } else {
      if (!id) return
      const formData = new FormData()
      const {placeIdx, placeImageList, placeKeywordList, placeFloor, ...res} = spaceData
      formData.append(
        'postAllPlaceReq',
        new Blob(
          [
            JSON.stringify({
              ...res,
              placeImageUrlList: [],
              keywordList: placeKeywordList,
              placeFloor: generateFloorNum(placeFloor as string),
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      )

      imageFiles &&
        imageFiles.forEach(file => {
          formData.append('photoUrl', file)
        })

      await updateSpaceItem(parseInt(id), formData)
      navigate(0)
    }
  }

  const generateValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, type} = event.target

    switch (type) {
      case 'checkbox':
        return (event.currentTarget as HTMLInputElement).checked
      case 'number':
        return parseInt(value)
      default:
        return value
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const id = e.target.id
    const finalValue = generateValue(e)
    setSpaceData(prev => {
      return {
        ...prev,
        [id]: finalValue,
      }
    })
  }

  const handleDelete = async () => {
    if (!id) return
    await deleteSpace(parseInt(id))
    navigate(`/space`)
  }

  const checkIsDisabled = () => {
    for (const key in spaceData) {
      if (typeof spaceData[key] === 'string' && !(spaceData[key] as string).trim()) {
        return true
      }
      if (typeof spaceData[key] === 'number' && (spaceData[key] as number) < 0 && key !== 'placeFloor') {
        return true
      }
      if (typeof spaceData[key] === 'object') {
        if (key === 'placeKeywordList' && spaceData[key].length < 3) {
          return true
        }
        if (key === 'placeImageList' && !imageFiles.length) {
          return true
        }
      }
    }
    return false
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      <DetailPageHeader
        navigate={navigate}
        isNew={isNew}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        checkIsDisabled={checkIsDisabled}
      />
      <S.ContentWrap>
        <S.ContentBox>
          <section>
            {LEFT_SECTION_INPUTS.map(inputName => (
              <S.InputItemWrap key={INPUTS[inputName].name}>
                <label htmlFor={INPUTS[inputName].name}>{INPUTS[inputName].label}</label>
                {renderInput(isEditMode, INPUTS[inputName], spaceData, setSpaceData, handleChange)}
              </S.InputItemWrap>
            ))}
          </section>
          <section>
            <ImageCarousel isEditMode={isEditMode} imageFiles={imageFiles} setImageFiles={setImageFiles} />
            <S.OptionWrap>
              <p>공간 옵션</p>
              <div>
                {[SPACE_OPTION_INPUTS.slice(0, 3), SPACE_OPTION_INPUTS.slice(3, 6)].map((inputs, idx) => (
                  <div key={idx}>
                    {inputs.map(inputName => {
                      const {name, label} = INPUTS[inputName]
                      return (
                        <S.OptionInputItemWrap key={name}>
                          <label htmlFor={name}>{label}</label>
                          {renderInput(isEditMode, INPUTS[inputName], spaceData, setSpaceData, handleChange)}
                        </S.OptionInputItemWrap>
                      )
                    })}
                  </div>
                ))}
              </div>
            </S.OptionWrap>
            {RIGHT_SECTION_INPUTS.map(inputName => (
              <S.InputItemWrap key={INPUTS[inputName].name}>
                <label htmlFor={INPUTS[inputName].name}>{INPUTS[inputName].label}</label>
                {renderInput(isEditMode, INPUTS[inputName], spaceData, setSpaceData, handleChange)}
              </S.InputItemWrap>
            ))}
          </section>
        </S.ContentBox>
      </S.ContentWrap>

      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDelete}
      />
    </S.Form>
  )
}

export default SpaceDetail
