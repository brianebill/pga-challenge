import styled from 'styled-components'
import Nav from '../components/Nav'

const Wrapper = styled.section`
  width: 100%;
  height: 115px;
  margin: auto;
  background: rgb(100, 80, 35);
`;

const Header = styled.div`
  width: 997px;
  margin: auto;
  position: relative;
`;

export default (props) => (
  <Wrapper>
    <Header>
      <img src='https://i2.cdn.turner.com/dr/pga/sites/default/themes/sitetheme/logo.png' />
    </Header>
    <Nav />
  </Wrapper>
)
