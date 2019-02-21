import styled from 'styled-components'
import App from './App'
import Nav from './Nav'

export default (props) => {
  return (
    <div>
      <App>
        {props.children}
      </App>
      <Nav>
        {props.children}
      </Nav>
      {props.children}
    </div>
  )
}
