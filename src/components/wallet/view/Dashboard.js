import React, { Component } from 'react'
import DashboardMap from './DashboardMap'
import DashboardPortfolio from './DashboardPortfolio'
import DashboardTransactions from './DashboardTransactions'
import DashboardPFBreakdown from './DashboardPFBreakdown'
import { Button, ButtonGroup, Row, Col } from 'react-bootstrap'



class Dashboard extends Component {
    render() {
        return (
          <div>
            <Row className="show-grid">
              <Col xs={6} xsOffset={8}>
                <ButtonGroup style={{marginTop: '12px'}}>
                  <Button>Day</Button>
                  <Button>Month</Button>
                  <Button>Year</Button>
                </ButtonGroup>
              </Col>
            </Row>
            <div className="row">
              <DashboardMap />
            </div>
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
