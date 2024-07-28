import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons'

export const AppLoader = () => {
    return <div style={{ position: "relative", height: "100%" }}>
        <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
        }} >
            <Spin indicator={
                <LoadingOutlined
                    style={{
                        fontSize: 48,
                    }}
                    spin
                />
            } />
        </div>
    </div>
}