import { Button, Form, Upload } from "antd";
import {
    UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";

export const UploadPaySlip = () => {
    const [form] = Form.useForm()

    const props = {
        customRequest: async (options) => {
            const { onSuccess, onError, file, onProgress } = options;
            const data = new FormData()
            data.append('file', options.file)
            const config = {
                "headers": {
                    'content-type': 'multipart/form-data',
                },
            }
            onProgress({ percent: 50 })
            await axios.post("/api/payslip/upload", data, config).then((_res) => {
                onSuccess("Ok");
            }).catch((err) => {
                onError({ statusText: `file upload failed with message ${err?.response?.data?.message}` });
            })

        },
        maxCount: 20,
        accept: ".pdf",
        multiple: true
    };


    return <Form
        layout='vertical'
        form={form}
        requiredMark={false}
        className='reimbursement-form'
    >
        <Form.Item
            label='Upload paysilp pdfs, note that the pdf name should be in the form: <first name>_<last name>_<employee id>_<salary month(1-12)_salary year>.pdf'
            name='upload_payslip'
            rules={[
                {
                    required: true,
                    message: 'Please upload the payslip',
                },
            ]}
        >

            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload PaySlips</Button>
            </Upload>
        </Form.Item>
    </Form>
}
