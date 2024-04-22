import {useEffect, useState} from 'react'

export const useStateWithCallback = (initialState: any, callback: any) => {
  const [state, setState] = useState(initialState)
  useEffect(() => callback(state), [state, callback])
  return [state, setState]
}
