import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


import {
  Dashboard,
  Balances,
  Transactions,
  AddWallet,
  AddExchange
} from '../../routes'

class Home extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Nav bsStyle="tabs">
                    <LinkContainer
                        to="/wallet"
                        active={location.pathname === '/wallet'}>
                        <NavItem>
                            Dashboard
                        </NavItem>
                    </LinkContainer>

                    <LinkContainer
                        to="/wallet/balances"
                        active={location.pathname === '/wallet/balances'}>
                        <NavItem>
                            Balances
                        </NavItem>
                    </LinkContainer>

                    <LinkContainer
                        to="/wallet/transactions"
                        active={location.pathname === '/wallet/transactions'}>
                        <NavItem>
                            Transactions
                        </NavItem>
                    </LinkContainer>
                </Nav>

                <Route exact path="/wallet" component={Dashboard} />
                <Route path="/wallet/balances" component={Balances} />
                <Route path="/wallet/transactions" component={Transactions} />
                <Route path="/wallet/add/wallet" component={AddWallet} />
                <Route path="/wallet/add/exchange" component={AddExchange} />
            </div>
        </BrowserRouter>
    )
  }
}

export default Home
