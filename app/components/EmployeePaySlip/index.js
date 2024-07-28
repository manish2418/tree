import { Button, Col, Row, Select, Table } from "antd"

const monthOptions = [
    {
        label: 'January',
        value: 'January',
    },
    {
        label: 'February',
        value: 'February',
    },

    {
        label: 'March',
        value: 'March',
    },
    {
        label: 'April',
        value: 'April',
    },
    {
        label: 'May',
        value: 'May',
    },
    {
        label: 'June',
        value: 'June',
    },
    {
        label: 'July',
        value: 'July',
    },
    {
        label: 'August',
        value: 'August',
    },
    {
        label: 'September',
        value: 'September',
    },
    {
        label: 'October',
        value: 'October',
    },
    {
        label: 'November',
        value: 'November',
    },
    {
        label: 'December',
        value: 'December',
    },
]

const financialYearOptions = [
    {
        label: '2024 - 2025',
        value: '2024_2025',
    },
    {
        label: '2023 - 2024',
        value: '2023_2024',
    },

    {
        label: '2022 - 2023',
        value: '2022_2023',
    },
]

const columns = [
    {
        title: 'Particulars',
        dataIndex: 'particulars1',
    },
    {
        title: 'Current Period',
        dataIndex: 'current_period1',
    },
    {
        title: 'Year To Date',
        dataIndex: 'year_to_date1',
    },
    {
        title: 'Particulars',
        dataIndex: 'particulars2',
    },
    {
        title: 'Current Period',
        dataIndex: 'current_period2',
    },
    {
        title: 'Year To Date',
        dataIndex: 'year_to_date2',
    },
]

const data = [
    {
        key: '1',
        particulars1: 'Basic Salary',
        current_period1: '100000',
        year_to_date1: '100000',
        particulars2: 'PF Contribution',
        current_period2: '0.0',
        year_to_date2: '0.0',
    },
    {
        key: '2',
        particulars1: 'House Rent Allowance',
        current_period1: '100000',
        year_to_date1: '100000',
        particulars2: 'VPF Contribution',
        current_period2: '0.0',
        year_to_date2: '0.0',
    },
    {
        key: '3',
        particulars1: 'Leave Travel Allowance',
        current_period1: '100000',
        year_to_date1: '100000',
        particulars2: 'Professional Tax',
        current_period2: '0.0',
        year_to_date2: '0.0',
    },
    {
        key: '4',
        particulars1: 'Medical Allowance',
        current_period1: '100000',
        year_to_date1: '100000',
        particulars2: 'Income Tax',
        current_period2: '0.0',
        year_to_date2: '0.0',
    },
    {
        key: '5',
        particulars1: 'Performance Bonus',
        current_period1: '100000',
        year_to_date1: '100000',
        particulars2: 'TreeHub Welfare Trust',
        current_period2: '0.0',
        year_to_date2: '0.0',
    },
    {
        key: '6',
        particulars1: 'Misc. Earnings',
        current_period1: '100000',
        year_to_date1: '100000',
        particulars2: 'Health Insurance Premium',
        current_period2: '0.0',
        year_to_date2: '0.0',
    },
    {
        key: '7',
        particulars1: 'Leave Encashment Service',
        current_period1: '100000',
        year_to_date1: '100000',
        particulars2: 'Well-begin Loan',
        current_period2: '0.0',
        year_to_date2: '0.0',
    },
]

export const EmployeePaySlip = () => {
    const calculateTotal = (column) => {
        return data.reduce(
            (total, item) => total + parseFloat(item[column] || 0),
            0
        )
    }

    const totalRow = {
        key: 'total',
        particulars1: 'Total',
        current_period1: calculateTotal('current_period1').toFixed(2),
        year_to_date1: calculateTotal('year_to_date1').toFixed(2),
        particulars2: 'Total',
        current_period2: calculateTotal('current_period2').toFixed(2),
        year_to_date2: calculateTotal('year_to_date2').toFixed(2),
    }

    const final_data = [...data, totalRow]
    return <Col span={20} className='expense-right-col'>
        <div className='payslip-body'>
            <Row justify={'center'}>
                <Col span={20}>
                    <Row align={'middle'} className='select-row'>
                        <Col span={12}>
                            <h2>Select financial year</h2>
                            <Select
                                style={{
                                    width: 200,
                                }}
                                options={financialYearOptions}
                                placeholder='Select Year'
                            />
                            &nbsp;&nbsp;
                            <Select
                                style={{
                                    width: 200,
                                }}
                                options={monthOptions}
                                placeholder='Select Month'
                            />
                        </Col>
                        <Col span={12} align='end'>
                            <Button type='primary'>Download Payslips</Button>
                        </Col>
                    </Row>
                    <Table
                        columns={columns}
                        dataSource={final_data}
                        pagination={false}
                        scroll={{
                            y: '60vh',
                        }}
                        className='payslip-table'
                    />
                </Col>
            </Row>
        </div>
    </Col>
}
