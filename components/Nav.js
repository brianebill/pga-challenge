import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 40px 0 0 0;
`;

const NavWrapper = styled.div`
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

const NavLink = styled.span`
  margin-right: 15px;
  font-size: .75em;
`;

export default (props) => {

  const [active, setActive] = useState('')
  useEffect(() => {
    if (Router.asPath.slice(1)) {
      setActive(Router.asPath.slice(1))
    } else {
      setActive('leader')
    }

  })

  return (
    <Wrapper>
      <NavWrapper>
        <List>
          <NavLink>
            <Link href='/'>
              <a className={active === 'leader' ? 'active' : ''}>
                LEADERBOARD
              </a>
            </Link>
          </NavLink>
          <NavLink>
            <Link href='/add'>
              <a className={active === 'add' ? 'active' : ''}>
                ADD PLAYER
              </a>
            </Link>
          </NavLink>
        </List>
      </NavWrapper>
    </Wrapper>
  )
}
