"use client"
import React, { useState } from 'react'
import {
    Button,
    Menu,
    Row,
} from 'antd'
import { ClaimSideBarOptions, Localizations } from '@/utils/constants';
import { ClaimForm } from '@/app/components/ClaimForm';
import { EmployeePaySlip } from '@/app/components/EmployeePaySlip';
import ClaimList from '@/app/components/ClaimList';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ReconciliationOutlined,
    FileDoneOutlined,
    NotificationOutlined,
    OrderedListOutlined
} from "@ant-design/icons";

const getComponentWiseSkeleton = (component) => {
    switch (component) {
        case ClaimSideBarOptions.REQUEST_FOR_CLAIM:
            return <ClaimForm />
        case ClaimSideBarOptions.PAYSLIPS:
            return <EmployeePaySlip />
        case ClaimSideBarOptions.LIST_CLAIMS_REQUESTED_BY_ME:
            return <ClaimList />
        case ClaimSideBarOptions.LIST_CLAIMS_ASSIGNED_TO_ME:
            // Wrapper component is to enforce rerendering so that should not be removed
            return <><ClaimList assignedToMe={true} /></>
        default:
            return <></>
    }
}

const getSideMenuItems = ({ setActiveComponent }) => ([
    {
        key: '1',
        icon: <FileDoneOutlined />,
        label: Localizations[ClaimSideBarOptions.REQUEST_FOR_CLAIM],
        onClick: () => {
            setActiveComponent(ClaimSideBarOptions.REQUEST_FOR_CLAIM)
        }
    },
    {
        key: '2',
        icon: <ReconciliationOutlined />,
        label: Localizations[ClaimSideBarOptions.PAYSLIPS],
        onClick: () => {
            setActiveComponent(ClaimSideBarOptions.PAYSLIPS)
        }
    },
    {
        key: '3',
        icon: <OrderedListOutlined />,
        label: Localizations[ClaimSideBarOptions.LIST_CLAIMS_REQUESTED_BY_ME],
        onClick: () => {
            setActiveComponent(ClaimSideBarOptions.LIST_CLAIMS_REQUESTED_BY_ME)
        }
    },
    {
        key: '4',
        icon: <NotificationOutlined />,
        label: Localizations[ClaimSideBarOptions.LIST_CLAIMS_ASSIGNED_TO_ME],
        onClick: () => {
            setActiveComponent(ClaimSideBarOptions.LIST_CLAIMS_ASSIGNED_TO_ME)
        }
    },
]);

const claim = () => {
    const { status } = useSession();

    const router = useRouter()

    if (status === "unauthenticated") {
        router.replace("/login")
    }

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const [activeComponent, setActiveComponent] = useState(ClaimSideBarOptions.REQUEST_FOR_CLAIM)
    return (
        <div className='claim-body'>
            <Row className='claim-menu'>
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    style={{
                        marginBottom: 16,
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={[ClaimSideBarOptions.REQUEST_FOR_CLAIM]}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={collapsed}
                    items={getSideMenuItems({ setActiveComponent: setActiveComponent })}
                />
            </Row>
            {getComponentWiseSkeleton(activeComponent)}
        </div>
    )
}

export default claim
