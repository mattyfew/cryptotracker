import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import Radium from 'radium'
import { Link } from 'react-router'

// import { AuthActions } from '../../actions'
// const { getUserInfo } = AuthActions

const STYLES = {
  nav: {
    backgroundColor: 'transparent',
    width: '100%',
    border: 'none',
    textDecoration: 'none',
    position: 'relative'
  }
}

export default class Wallet extends Component {

    render() {
        return (
          <div>
            <Navbar fixedTop fluid collapseOnSelect style={STYLES.nav}>
              <Navbar.Header>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse style={STYLES.nav}>
                <Nav>
                  <NavItem
                    componentClass={Link}
                    href="/wallet"
                    to="/wallet"
                    active={location.pathname === '/wallet'}>
                    Home
                  </NavItem>
                  <NavItem
                    componentClass={Link}
                    href="/manage-accounts"
                    to="/manage-accounts"
                    active={location.pathname === '/manage-accounts'}>
                    Manage Accounts
                  </NavItem>
                </Nav>
                <Nav pullRight>
                  <NavItem
                    componentClass={Link}
                    href="/profile"
                    to="/profile"
                    active={location.pathname === '/profile'}>
                    <span className="glyphicon glyphicon-cog"></span>
                </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            {this.props.children}
          </div>
        )
    }
}

// export default connect(null, {
//     getUserInfo
// })(Wallet)
