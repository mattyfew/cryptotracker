import React, { Component } from 'react'
import { Button, Jumbotron } from 'react-bootstrap'

const STYLES = {
  jumbotron: {
    margin: '24px',
    height: '60vh',
    backgroundColor: '#F77777'
  },
  container: {
    marginTop: '20%'
  }
}

class DashboardTransactions extends Component {
    render() {
        return (
          <div>
            <Jumbotron style={STYLES.jumbotron}>
              <div className="container-fluid" style={STYLES.container}>
                Dashboard Transactions
              </div>
            </Jumbotron>
          </div>
        )
    }
}

export default DashboardTransactions
