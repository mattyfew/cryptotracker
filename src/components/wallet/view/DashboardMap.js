import React, { Component } from 'react'
import { Button, Jumbotron } from 'react-bootstrap'
import DashboardLineChart from './DashboardLineChart'

const STYLES = {
  jumbotron: {
    margin: '24px',
    height: '60vh',
    border: '1px',
    backgroundColor: '#fff'
  },
  container: {
    marginTop: '20%'
  }
}

class DashboardMap extends Component {
    render() {
      const data = [
        {x: 0, y: 8},
        {x: 1, y: 5},
        {x: 2, y: 4},
        {x: 3, y: 9},
        {x: 4, y: 1},
        {x: 5, y: 7},
        {x: 6, y: 6},
        {x: 7, y: 3},
        {x: 8, y: 2},
        {x: 9, y: 0}
      ]

        return (
          <div>
            <div style={STYLES.jumbotron}>
              <DashboardLineChart data={data} timePeriod={'month'}/>
              <div className="container-fluid" style={STYLES.container}>
                Map of trend
              </div>
            </div>
          </div>
        )
    }
}

export default DashboardMap
