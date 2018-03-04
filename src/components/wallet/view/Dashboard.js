import React, { Component } from 'react'
import DashboardMap from './DashboardMap'
import DashboardPortfolio from './DashboardPortfolio'
import DashboardTransactions from './DashboardTransactions'
import DashboardPFBreakdown from './DashboardPFBreakdown'



class Dashboard extends Component {
    render() {
        return (
          <div>
            <DashboardMap />
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <DashboardPortfolio />
                </div>
                <div className="col-md-6 col-xs-12">
                  <DashboardPFBreakdown />
                </div>
              </div>
            <DashboardTransactions />
          </div>
        )
    }
}

export default Dashboard
