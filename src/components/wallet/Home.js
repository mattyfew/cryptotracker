import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

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

                <Route path="/wallet" component={Dashboard} />
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
