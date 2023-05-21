import type { AppState, appContextDispatchProps } from '@/types'

export const appReducer = (state: AppState, action: appContextDispatchProps) => {
  switch (action.type) {
    case 'SET_BLURRED':
      typeof window !== 'undefined'
        ? localStorage.setItem('IS_BLURRED', String(action.payload))
        : null
      return { ...state, blurredBg: action.payload }

    default:
      return state
  }
}
