"use client"
import { useRouter } from 'next/navigation'
import { Col, Image, Row } from "antd";
import { LeftOutlined } from '@ant-design/icons'

import TreeLogo from '../../../public/Assests/Dashboard/logo.svg'

export const AppHeader = ({ title, children }) => {
    const router = useRouter()
    return <div className='app-header'>
        <Row className='header-row'>
            <Col>
                <p>
                    <LeftOutlined
                        onClick={() => router.back()}
                        className='cursor-pointer'
                    />
                    {title}
                </p>
            </Col>
            {children}
            <Col>
                <Image
                    src={TreeLogo.src}
                    width={100}
                    height={100}
                    preview={false}
                />
            </Col>
        </Row>
    </div>
}
