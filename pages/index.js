import App from '../components/App'
import Body from '../components/Body'
import Leaderboard from '../components/Leaderboard'
import styled from 'styled-components'

export default (props) => (
  <div>
    <App>
      {props.children}
    </App>
    <Body>
      <Leaderboard />
    </Body>
  </div>
)
