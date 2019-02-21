import App from '../components/App'
import Body from '../components/Body'
import Lambda from '../components/Lambda'
import styled from 'styled-components'

export default (props) => (
  <div>
    <App>
      {props.children}
    </App>
    <Body>
      <Lambda/>
    </Body>
  </div>
)
