import { Container } from '@mui/material'
import { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return(
    <Container maxWidth={'sm'}>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
