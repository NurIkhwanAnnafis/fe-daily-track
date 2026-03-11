import type React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const Loading: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-700/50">
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  )
}

export default Loading