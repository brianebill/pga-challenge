import styled from 'styled-components'

const Nav = styled.div`
  margin: auto;
  width: 997px;
  height: 35px;
  background: #604F29;
  list-style: none;
  position: relative;
  padding-top: 10px;
`;

const List = styled.div`
  position: absolute;
  left: 20px;
  top: 12px;
`;

const Link = styled.a`
  margin-right: 10px;
  font-size: .75em;
  font-weight: 100;
`;

export default (props) => (
  <Nav>
    <List>
      <Link href='/'>LEADERBOARD</Link>
      <Link href='/admin'>ADMIN</Link>
      <Link href='/lambda'>LAMBDA</Link>
    </List>
  </Nav>
)
