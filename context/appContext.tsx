import { createContext, useReducer, useContext } from 'react'
import { appReducer } from './appReducer'
import type { Dispatch, ReactNode } from 'react'
import type { AppState, appContextDispatchProps } from '@/types'

const initialState: AppState = {
  blurredBg: false
}

const AppContext = createContext(initialState)

const appActions = (dispatch: Dispatch<appContextDispatchProps>) => {
  return {
    setBlurred: (value: boolean) => dispatch({ type: 'SET_BLURRED', payload: value })
  }
}

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<
    (state: AppState, action: appContextDispatchProps) => AppState
  >(appReducer, initialState)
  const actions = appActions(dispatch)

  return (
    <AppContext.Provider value={{ ...state, ...actions }}>{children}</AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, AppContext, useAppContext }
