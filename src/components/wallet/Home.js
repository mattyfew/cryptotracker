import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class Home extends Component {
  render() {
    return (
      <div>
        <Nav bsStyle="tabs">
          <NavItem
            componentClass={Link}
            href="/wallet"
            to="/wallet"
            active={location.pathname === '/wallet'}>
            Dashboard
          </NavItem>
          <NavItem
            componentClass={Link}
            href="/wallet/balances"
            to="/wallet/balances"
            active={location.pathname === '/wallet/balances'}>
            Balances
          </NavItem>
          <NavItem
            componentClass={Link}
            href="/wallet/transactions"
            to="/wallet/transactions"
            active={location.pathname === '/wallet/transactions'}>
            Transactions
          </NavItem>
        </Nav>
        {this.props.children}
      </div>
    )
  }
}

export default Home
