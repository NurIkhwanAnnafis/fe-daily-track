import { Button, Typography } from "antd"
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
        <Typography.Text type="secondary" className="text-lg!">{description}</Typography.Text>
        <div className="sm:float-right">
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
      </div>

      {children}
    </div>
  )
}

export default PageContainer