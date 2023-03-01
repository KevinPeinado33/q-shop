import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@mui/material'

import { lightTheme } from '@/themes'
import { store } from '@/redux/store'
import ProviderApp from '@/redux/provider'

import '@/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig 
      value={{
        fetcher: ( resource, init ) => fetch( resource, init ).then( res => res.json() )
      }}
    >
      <Provider store={ store }>
        <ProviderApp>
          <ThemeProvider theme={ lightTheme } >
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ProviderApp>
      </Provider>
    </SWRConfig>
  )
}

export default App
