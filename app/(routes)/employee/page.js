'use client'
import {
    Modal,
    message,
} from 'antd'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import axios from 'axios'
import { EmployeeActiveTabs } from '@/utils/constants'
import EmployeeTopBar from '@/app/components/EmployeeTopBar'
import { AppHeader } from '@/app/components/AppHeader'
import { AddEmployee } from '@/app/components/AddEmployee'
import EmployeeList from '@/app/components/EmployeeList'
import EmployeeDirectory from '@/app/components/EmpoyeeDirectory'
import Salary from '@/app/components/Salary'
import { AppLoader } from '@/app/components/AppLoader'

const getTabWiseSkeleton = (tab) => {
    switch (tab) {
        case EmployeeActiveTabs.MY_REPORTEES:
            return <EmployeeList includeOnlyMyReportees={true} />
        case EmployeeActiveTabs.DIRECTORY:
            return <EmployeeDirectory />
        case EmployeeActiveTabs.SALARY:
            return <Salary />
        default:
            return <></>
    }
}

const employee = () => {

    const { data: session, status } = useSession();

    const router = useRouter()


    const [activeTab, setActiveTab] = useState(EmployeeActiveTabs.MY_REPORTEES)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const onFinish = (values) => {
        if (values) {
            setIsModalOpen(false)
            axios.post('/api/employee', values).then(() => message.info("Created the user successfully")).catch(e => message.error("Sorry something went wrong"))
        } else {
            message.info("Please input the details")
        }
    }


    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    if (status === "unauthenticated") {
        router.replace("/login")
    }

    return (
        <>
            <div className='employee-header'>
                <AppHeader title="Employee"
                    children={
                        status === "loading" ? <></> : <EmployeeTopBar activeTab={activeTab}
                            setActiveTab={setActiveTab} activeUserRole={session.user?.role}
                            showModal={showModal}
                        />
                    }
                />
                {status === "loading" ? <AppLoader /> : <Modal
                    title=<h3>Add Employee</h3>
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    className='add-employee-modal'
                    footer={null}
                >
                    <AddEmployee onFinish={onFinish} handleCancel={handleCancel} />
                </Modal>}
            </div>
            {getTabWiseSkeleton(activeTab)}
        </>
    )
}

export default employee
