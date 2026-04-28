import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  title: ReactNode
  description?: ReactNode
  onCreate?: () => void
}

const PageContainer: React.FC<Props> = (props) => {
  const { children, title, onCreate, description } = props

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-2 justify-between items-center">
        <h2 className="text-lg text-[#64748B]">{description}</h2>
        {onCreate && (
          <Button
            htmlType="button"
            type="primary"
            icon={<PlusOutlined />}
            onClick={onCreate}
          >
            <span className="font-semibold">{`Add ${title}`}</span>
          </Button>
        )}
      </div>

      {children}
    </div>
  )
}

export default PageContainer