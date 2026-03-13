import type React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const Loading: React.FC = () => {
  return (
    <div
      className="bg-neutral-900/80 fixed left-0 top-0 z-50 h-full w-full text-neutral-900"
    >
      <div
        className="bg-white my-[5%] mx-auto w-64 px-2 py-5 text-center rounded"
      >
        <div className="flex justify-center mb-4 text-primary-500">
          <Spin indicator={<LoadingOutlined spin className="text-5xl!" />} />
        </div>
        <p className="text-xl font-medium text-neutral-700 mb-2">
          Loading
        </p>
        <p className="text-base font-normal text-neutral-500">
          Please wait...
        </p>
      </div>
    </div>

  )
}

export default Loading