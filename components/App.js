import styled from 'styled-components'
import Head from 'next/head'
import Header from './Header'

const App = styled.div`
  clear: both;
`;

export default () => {
  return (
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
        a {
          color: rgba(220, 220, 220, 1);
          text-decoration: none;
        }
        a:hover {
          color: rgba(200, 200, 255, 1);
        }
        a.active {
          color: rgba(255, 255, 255, 1);
          padding-bottom: 10px;
          border-bottom: solid 4px white;
        }
      `}</style>
    </App>
  )
}
