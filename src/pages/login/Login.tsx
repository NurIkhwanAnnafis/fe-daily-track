import React from "react"
import { Button, Checkbox, Form, Input } from "antd"
import { WalletOutlined } from "@ant-design/icons"
import type { FieldType } from "./login.type"
import { useLogin } from "./hooks/useLogin"


const Login: React.FC = () => {
  const { handleLogin, loading } = useLogin()

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-1/4 rounded-xl overflow-hidden shadow-lg">
        {/* Green top bar */}
        <div className="h-3 bg-[#62d163]" />
        {/* White content */}
        <div className="p-10 flex flex-col justify-around items-center bg-white gap-8">
          <div className="flex gap-3 text-[#62d163]">
            <WalletOutlined className="text-2xl" />
            <h5 className="text-[20px] font-bold text-neutral-950">My Daily</h5>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h6 className="text-2xl font-bold text-neutral-950">Sign In</h6>
            <p className="text-neutral-500">Welcome back to your financial dashboard</p>
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
              className="w-full mb-4! text-neutral-950"
              required={false}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              className="w-full mb-4! text-neutral-950"
              required={false}
            >
              <Input.Password />
            </Form.Item>

            <div className="flex justify-between items-center mb-4!">
              <Form.Item<FieldType> name="remember" valuePropName="checked" label={null} className="mb-0!">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="#">
                <p className="text-[#62d163]">Forgot Password?</p>
              </a>
            </div>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                Log In
              </Button>
            </Form.Item>
          </Form>

          <p className="text-center text-neutral-950">Don't have an account? <a href="#"><span className="text-[#62d163]">Sign up</span></a></p>
        </div>
      </div>
    </div>
  )
}

export default Login
