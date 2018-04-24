import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import Radium from 'radium'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'


import {
  Home,
  ManageAccounts,
  Profile
} from '../../routes'
import { UserActions } from '../../actions'
const { getUserInfo } = UserActions

class Wallet extends Component {

  componentDidMount() {
    if (this.props.user.userData.length === 0) {
      this.props.getUserInfo()
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
            <div>
                <Navbar fixedTop fluid collapseOnSelect style={STYLES.nav}>
                  <Navbar.Header>
                    <Navbar.Toggle />
                  </Navbar.Header>
                  <Navbar.Collapse style={STYLES.nav}>
                    <Nav>
                      <LinkContainer
                          to="/wallet"
                          active={location.pathname === '/wallet'}>
                          <NavItem>
                            Home
                          </NavItem>
                      </LinkContainer>
                      <LinkContainer
                          to="/wallet/manage-accounts"
                          active={location.pathname === '/wallet/manage-accounts'}>
                          <NavItem>
                            Manage Accounts
                          </NavItem>
                      </LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        <LinkContainer
                            to="/profile"
                            active={location.pathname === '/profile'}>
                          <NavItem>
                            <span className="glyphicon glyphicon-cog">Profile</span>
                          </NavItem>
                      </LinkContainer>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>

                <Route exact path="/wallet/manage-accounts" component={ManageAccounts} />
                <Route exact path="/wallet/profile" component={Profile} />
                <Route exact path="/wallet" component={Home} />
            </div>
        </BrowserRouter>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const STYLES = {
  nav: {
    backgroundColor: 'transparent',
    width: '100%',
    border: 'none',
    textDecoration: 'none',
    position: 'relative'
  }
}

export default connect(mapStateToProps, {
  getUserInfo
})(Wallet)
