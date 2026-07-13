import type React from "react"
import { Spin, Typography, theme } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const Loading: React.FC = () => {
  const {
    token: { colorBgContainer, colorBorderSecondary, colorPrimary },
  } = theme.useToken()

  return (
    <div className="bg-black/60 fixed left-0 top-0 z-1050 h-full w-full">
      <div
        className="my-[5%] mx-auto w-64 px-2 py-6 text-center rounded-xl"
        style={{ background: colorBgContainer, border: `1px solid ${colorBorderSecondary}` }}
      >
        <div className="flex justify-center mb-4" style={{ color: colorPrimary }}>
          <Spin indicator={<LoadingOutlined spin className="text-5xl!" />} />
        </div>
        <Typography.Text strong className="text-lg! block mb-1!">
          Loading
        </Typography.Text>
        <Typography.Text type="secondary">
          Please wait...
        </Typography.Text>
      </div>
    </div>

  )
}

export default Loading