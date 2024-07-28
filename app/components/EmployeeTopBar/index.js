import { Button, Col, Row } from "antd"
import { EmployeeActiveTabs, Localizations } from "@/utils/constants"

const EmployeeTopBar = ({ activeTab, setActiveTab, activeUserRole, showModal }) => {
    return <Row className='employee-tabs'>
        <Col>
            <Row>
                {Object.keys(EmployeeActiveTabs).map(tab => {
                    return <Col>
                        <h3
                            className={activeTab == EmployeeActiveTabs[tab] ? 'active-tab' : ''}
                            onClick={() => setActiveTab(EmployeeActiveTabs[tab])}
                        >
                            {Localizations[EmployeeActiveTabs[tab]]}
                        </h3>
                    </Col>
                })}
            </Row>
        </Col>
        <Col>
            {activeUserRole === 'HR' && (
                <Button type='primary' onClick={showModal}>
                    Add Employee
                </Button>
            )}
        </Col>
    </Row>

}

export default EmployeeTopBar