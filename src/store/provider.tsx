'use client'

import { store } from '@/store/store'
import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore } from 'redux-persist'

export function ReduxProviders({ children }: { children: React.ReactNode }) {
  //let persistor = persistStore(store)
  return (
    <Provider store={store}>
      {children}
      {/* <PersistGate persistor={persistor}>{children}</PersistGate> */}
    </Provider>
  )
}
