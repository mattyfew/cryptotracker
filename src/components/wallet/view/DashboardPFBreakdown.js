import React, { Component } from 'react'
import { Button, Jumbotron } from 'react-bootstrap'
// import {Doughnut} from 'react-chartjs-2'
import { PieChart } from 'react-easy-chart'


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

class DashboardPFBreakdown extends Component {
  render() {
    return (
      <div>
        <div style={STYLES.jumbotron}>
          Dashboard PFBreakdown Pie Chart
          <PieChart
            data={[
              { key: 'A', value: 100, color: '#aaac84' },
              { key: 'B', value: 200, color: '#dce7c5' },
              { key: 'C', value: 50, color: '#e3a51a' }
            ]} />
        </div>
      </div>
    )
  }
}

export default DashboardPFBreakdown
