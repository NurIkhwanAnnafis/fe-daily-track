import React from 'react'
import { useProfile } from '../../hooks/useProfile'
import {
  UserOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  BankOutlined,
  CalendarOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  IdcardOutlined,
} from '@ant-design/icons'
import { Avatar, Tag, Card } from 'antd'
import InfoRow from './component/InfoRow'

const ProfilePage: React.FC = () => {
  const { profile } = useProfile({
    enabled: true,
    showError: true,
  })

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen pb-10">
      {/* Banner */}
      <div className="h-12 sm:h-36 md:h-44 w-full relative" />

      {/* Avatar + Name */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Avatar row */}
        <div className="relative -mt-10 sm:-mt-12 md:-mt-14 flex gap-3 sm:gap-5 mb-6 sm:mb-8">
          {/* Avatar */}
          <Avatar
            size={68}
            icon={<UserOutlined />}
          />

          {/* Name + org + badge */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 flex-1 min-w-0">
            <div className="min-w-0">
              <h1 className="text-lg! sm:text-xl! font-bold text-gray-900 leading-tight truncate">
                {profile?.email ?? 'Loading…'}
              </h1>
              <p className="text-xs! sm:text-sm! text-gray-500 mt-0.5">
                {profile?.organization?.name ?? '—'}
              </p>
            </div>
            <div className="mt-2 sm:mt-0 sm:ml-auto sm:pb-1 self-start sm:self-auto">
              {profile && (
                <Tag
                  icon={
                    profile.is_active ? (
                      <CheckCircleFilled />
                    ) : (
                      <CloseCircleFilled />
                    )
                  }
                  color={profile.is_active ? 'success' : 'error'}
                  className="text-xs! sm:text-sm! px-2.5! sm:px-3! py-0.5! sm:py-1! rounded-full!"
                >
                  {profile.is_active ? 'Active' : 'Inactive'}
                </Tag>
              )}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Account Details */}
          <Card
            title={(
              <div className='flex items-center gap-3'>
                <UserOutlined />
                <span>Account Details</span>
              </div>
            )}
          >
            <InfoRow icon={<IdcardOutlined />} label="User ID" value="XXXX-XXXX-XXXX-XXXX" />
            <InfoRow icon={<MailOutlined />} label="Email" value={profile?.email ?? '—'} />
            <InfoRow
              icon={<SafetyCertificateOutlined />}
              label="Role"
              value={
                profile?.role ? (
                  <Tag color="geekblue" className="capitalize! rounded-full!">
                    {profile.role}
                  </Tag>
                ) : (
                  '—'
                )
              }
            />
          </Card>

          {/* Organization */}
          <Card 
            title={(
              <div className='flex items-center gap-3'>
                <BankOutlined />
                <span>Organization</span>
              </div>
            )}
          >
            <InfoRow
              icon={<IdcardOutlined />}
              label="Organization ID"
              value="XXXX-XXXX-XXXX-XXXX"
            />
            <InfoRow
              icon={<BankOutlined />}
              label="Organization Name"
              value={profile?.organization?.name ?? '—'}
            />
          </Card>

          {/* Activity — full width on all breakpoints */}
          <div className="sm:col-span-2">
            <Card
              title={(<div className='flex items-center gap-3'>
                <CalendarOutlined />
                <span>Activity</span>
              </div>)}      >
              <InfoRow
                icon={<CalendarOutlined />}
                label="Joined"
                value={formatDate(profile?.created_at)}
              />
              <InfoRow
                icon={<CalendarOutlined />}
                label="Last Updated"
                value={formatDate(profile?.updated_at)}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
