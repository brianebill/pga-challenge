import styled from 'styled-components'
import Head from 'next/head'
import Header from './Header'

const App = styled.div`
  clear: both;
`;

export default (props) => (
  <App>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <Header />
    <style jsx global>{`
      body {
        background: rgba(240,240,240,1);
        color: #fff;
        padding: 0;
        margin: 0;
        font-family: 'Lucida Grande','Lucida Sans Unicode',sans-serif;
      }
    `}</style>
  </App>
)
