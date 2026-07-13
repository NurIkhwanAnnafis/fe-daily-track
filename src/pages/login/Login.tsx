import React from "react"
import { Button, Checkbox, Form, Input, Typography, theme } from "antd"
import type { FieldType } from "./login.type"
import { useLogin } from "./hooks/useLogin"


const Login: React.FC = () => {
  const { handleLogin, loading } = useLogin()
  const {
    token: { colorBgContainer, colorBorderSecondary, colorPrimary },
  } = theme.useToken()

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-3">
      <div
        className="xl:w-[380px] w-full rounded-2xl overflow-hidden"
        style={{ background: colorBgContainer, border: `1px solid ${colorBorderSecondary}` }}
      >
        <div className="pt-10 px-10 pb-8 flex flex-col items-center gap-8">
          <img src="/favicon.svg" alt="My Daily" className="w-14 h-14" />
          <div className="flex flex-col gap-2 text-center">
            <Typography.Title level={4} className="m-0!">Welcome back</Typography.Title>
            <Typography.Text type="secondary">Sign in to your My Daily dashboard</Typography.Text>
          </div>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="text-left w-full"
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
              className="w-full mb-4!"
              required={false}
            >
              <Input size="large" placeholder="you@example.com" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              className="w-full mb-4!"
              required={false}
            >
              <Input.Password size="large" placeholder="••••••••" />
            </Form.Item>

            <div className="flex justify-between items-center mb-4!">
              <Form.Item<FieldType> name="remember" valuePropName="checked" label={null} className="mb-0!">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="#">
                <Typography.Text style={{ color: colorPrimary }}>Forgot Password?</Typography.Text>
              </a>
            </div>

            <Form.Item label={null} className="mb-0!">
              <Button type="primary" htmlType="submit" size="large" className="w-full" loading={loading}>
                Log In
              </Button>
            </Form.Item>
          </Form>

          <Typography.Text className="text-center">
            Don't have an account? <a href="#"><Typography.Text style={{ color: colorPrimary }}>Sign up</Typography.Text></a>
          </Typography.Text>
        </div>
      </div>
    </div>
  )
}

export default Login
