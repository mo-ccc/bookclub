import React from 'react';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Tabbed = ({children}) => {
    return (
        <div>
            <Tab.Container defaultActiveKey={children[0][0]}>
            <Col>
              <Row>
                <Nav variant="tabs" className="flex-row" style={{width: "100%"}}>
                  {children.map(i => (
                    <Nav.Item key={i[0]}>
                      <Nav.Link eventKey={i[0]} style={{padding: "10px 20px"}}>{i[0]}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Row>
              <Row>
                  <Tab.Content style={{padding: "10px", width: "100%"}}>
                    {children.map(i => (
                      <Tab.Pane key={i[0]} eventKey={i[0]} style={{width: "100%"}}>
                        {i[1]}
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
              </Row>
            </Col>
          </Tab.Container>
        </div>
    )
}

export default Tabbed