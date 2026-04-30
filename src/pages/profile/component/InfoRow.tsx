const InfoRow: React.FC<{
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
    <span className="text-indigo-400 mt-0.5 text-base">{icon}</span>
    <div className="flex flex-col min-w-0">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm font-medium text-gray-800 break-all mt-0.5">
        {value}
      </span>
    </div>
  </div>
)

export default InfoRow
