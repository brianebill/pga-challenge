import App from '../components/App'
import Body from '../components/Body'
import Admin from '../components/Admin'
import styled from 'styled-components'

export default (props) => (
  <div>
    <App>
      {props.children}
    </App>
    <Body>
      <Admin/>
    </Body>
  </div>
)
