import { Typography, theme } from "antd"

const InfoRow: React.FC<{
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}> = ({ icon, label, value }) => {
  const {
    token: { colorBorderSecondary, colorPrimary },
  } = theme.useToken()

  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0" style={{ borderColor: colorBorderSecondary }}>
      <span className="mt-0.5 text-base" style={{ color: colorPrimary }}>{icon}</span>
      <div className="flex flex-col min-w-0">
        <Typography.Text type="secondary" className="text-xs! font-medium uppercase tracking-wide">
          {label}
        </Typography.Text>
        <Typography.Text strong className="text-sm! break-all">
          {value}
        </Typography.Text>
      </div>
    </div>
  )
}

export default InfoRow
