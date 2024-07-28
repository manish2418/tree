"use client"
import React, { useState } from 'react'
import {
    Button,
    Menu,
} from 'antd'
import { HRSideBarOptions, Localizations } from '@/utils/constants';
import {
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from "@ant-design/icons";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { UploadPaySlip } from '@/app/components/UploadPayslip';

const getComponentWiseSkeleton = (component) => {
    switch (component) {
        case HRSideBarOptions.UPLOAD_PAY_SLIPS:
            return <UploadPaySlip />
        default:
            return <></>
    }
}

const getSideMenuItems = ({ setActiveComponent }) => ([
    {
        key: '1',
        icon: <UploadOutlined />,
        label: Localizations[HRSideBarOptions.UPLOAD_PAY_SLIPS],
        onClick: () => {
            setActiveComponent(HRSideBarOptions.UPLOAD_PAY_SLIPS)
        }
    },
]);

const hr = () => {
    const { data: session, status } = useSession();

    const router = useRouter()

    if (status === "unauthenticated") {
        router.replace("/login")
    }


    if (status === "authenticated" && session.user.role !== "HR") {
        router.replace("/dashboard")
    }


    const [activeComponent, setActiveComponent] = useState(HRSideBarOptions.UPLOAD_PAY_SLIPS)
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className='hr-body'>
            <div className='hr-menu'>
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
                    defaultOpenKeys={[HRSideBarOptions.UPLOAD_PAY_SLIPS]}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={collapsed}
                    items={getSideMenuItems({ setActiveComponent: setActiveComponent })}
                />
            </div>
            <div>
                {getComponentWiseSkeleton(activeComponent)}
            </div>
        </div>
    )
}

export default hr
