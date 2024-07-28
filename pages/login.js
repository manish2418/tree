import { Col, Input, Row, Form, Checkbox, Button, Modal, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import LoginImg from '../public/Assests/Login.svg'
import loginimg from '../public/Assests/login.png'
import Image from 'next/image'
const login = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const showConfirmModal = () => {
    setIsConfirmModalOpen(true)
  }
  const handleConfirmOk = () => {
    setIsConfirmModalOpen(false)
  }
  const handleConfirmCancel = () => {
    setIsConfirmModalOpen(false)
  }

  const [form] = Form.useForm()
  const [changePasswordForm] = Form.useForm()

  const loginForm = async (values) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    })

    if (!result.error) {
      // set some auth state
      router.push('/dashboard')
    }
  }

  const forgotPassword = (values) => {
    console.log(values)

    if (values.email) {
      setIsModalOpen(false)
      form.resetFields()
      setIsConfirmModalOpen(true)
    }
  }

  const changePassword = (values) => {
    console.log(values)

    if (values) {
      changePasswordForm.resetFields()
      handleConfirmCancel()
      message.success('Your password is changes successfully')
    }
  }

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/dashboard')
      } else {
        setIsLoading(false)
      }
    })
  }, [router])

  return (
    <div className='login-container'>
      <div className='login'>
        <Row className='form-container'>
          <Col span={6} align={'middle'}>
            <Image src={LoginImg} width={50} height={50} />
            <h1>Log in</h1>
            <Form
              layout='vertical'
              onFinish={loginForm}
              requiredMark={false}
              className='login-form'
            >
              <Form.Item
                name='email'
                label='Email Address'
                rules={[
                  {
                    type: 'email',
                    message: 'Please enter a valid email address.',
                  },
                  {
                    required: true,
                    message: 'Please enter your email',
                  },
                ]}
              >
                <Input
                  size='large'
                  placeholder='Email'
                  className='input'
                ></Input>
              </Form.Item>

              <Form.Item
                name='password'
                label='Password'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your password',
                  },
                ]}
              >
                <Input.Password
                  size='small'
                  type='password'
                  placeholder='Password'
                  className='input'
                ></Input.Password>
              </Form.Item>

              <Button htmlType='submit' className='sign-in-button'>
                Sign In
              </Button>

              <Row justify={'center'}>
                <span
                  className='forgot-password cursor-pointer'
                  onClick={showModal}
                >
                  Forgot Password ?
                </span>
              </Row>
              {/* <Row className='rember-row'>
                <Form.Item name='remember' valuePropName='checked'>
                  <Checkbox>
                    <span className='rember-me cursor-pointer'>
                      Remember me
                    </span>
                  </Checkbox>
                </Form.Item>
              </Row> */}
            </Form>
          </Col>
        </Row>
      </div>
      <Modal
        title=''
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className='forgot-password-modal'
      >
        <Row justify={'center'} className='forgot-password-row'>
          <Col span={20} align={'center'}>
            <h2>Forgot Password?</h2>
            <p>What is the email address associated with your account?</p>
            <Form
              layout='vertical'
              onFinish={forgotPassword}
              requiredMark={false}
              form={form}
              className='login-form'
            >
              <Form.Item
                name='email'
                rules={[
                  {
                    type: 'email',
                    message: 'Please enter a valid email address.',
                  },
                  {
                    required: true,
                    message: 'Please enter your email',
                  },
                ]}
              >
                <Input
                  size='small'
                  placeholder='Email'
                  className='input'
                ></Input>
              </Form.Item>
              <Button htmlType='submit' className='sign-in-button'>
                Send Email
              </Button>
            </Form>
          </Col>
        </Row>
      </Modal>

      <Modal
        title=''
        open={isConfirmModalOpen}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        footer={null}
        className='forgot-password-modal'
      >
        <Row justify={'center'} className='forgot-password-row'>
          <Col span={20} align={'center'}>
            <h2>Enter new password</h2>
            <Form
              layout='vertical'
              onFinish={changePassword}
              requiredMark={false}
              form={changePasswordForm}
              className='login-form'
            >
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please enter password' },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%#!*^&?])[A-Za-z\d@$%#!*^&?]{10,}$/,
                    message:
                      'Password needs to contain a minimum of 10 characters, at least one upper case letter, at least one lower case letter, at least one number and at least one special character (@, $, %, #, !, *, ^, &, ?).',
                  },
                ]}
              >
                <Input.Password
                  size='large'
                  // type='password'
                  placeholder='Password'
                  className='input'
                ></Input.Password>
              </Form.Item>
              <Form.Item
                name='confirm-password'
                rules={[
                  {
                    required: true,
                    message: 'Please Confirm your password',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }

                      return Promise.reject(
                        'The two passwords that you entered do not match!'
                      )
                    },
                  }),
                ]}
              >
                <Input.Password
                  size='large'
                  // type='password'
                  placeholder='Confirm Password'
                  className='input'
                ></Input.Password>
              </Form.Item>

              <Button htmlType='submit' className='sign-in-button'>
                Change Password
              </Button>
              <p className='pass-warn'>
                Please include at least 10 characters with a number and symbol.
              </p>
            </Form>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default login
