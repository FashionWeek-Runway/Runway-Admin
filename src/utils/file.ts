import {IImageResponse} from '../models/Exhibition'

export function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const b64Data = arr[1]
  const byteCharacters = atob(b64Data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new File([byteArray], filename, {type: mime})
}

export function generateDataUrl(imageUrl: string, res: IImageResponse) {
  const type = imageUrl.split('.')[imageUrl.split('.').length - 1]
  const res_body = res.body
  const str = `data:image/${type};base64,${res_body}`
  return str
}

export function getFileName(headers: Record<string, string[]>) {
  const contentDispositionHeader = headers['Content-Disposition'][0]
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
  const filenameMatch = contentDispositionHeader.match(filenameRegex)
  const filename = filenameMatch && filenameMatch[1].replace(/['"]/g, '')

  return filename
}
