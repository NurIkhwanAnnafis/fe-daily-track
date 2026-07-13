import React, { useRef } from 'react'
import { useProfile } from '../../hooks/useProfile'
import {
  UserOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons'
import { Avatar, Tag, Typography, theme } from 'antd'
import CardDetail from './component/CardDetail'
import { useProfilePage } from './hooks/useProfilePage'
import FormAccountDetails, { type FormAccountDetailsRef } from './component/FormAccountDetails'
import FormUserConfig, { type FormUserConfigRef } from './component/FormUserConfig'

const ProfilePage: React.FC = () => {
  const refFormAccountDetail = useRef<FormAccountDetailsRef>(null)
  const refFormUserConfig = useRef<FormUserConfigRef>(null)
  const {
    token: { colorPrimary, colorPrimaryBg },
  } = theme.useToken()
  const { profile, currentData, fetchProfile } = useProfile({
    enabled: true,
    showError: true,
    fetchUserConfig: true,
  })

  const {
    dataAccountsDetail,
    dataFinancialLimit,
    dataOrganization,
    dataActivity,
  } = useProfilePage({
    profile,
    userConfig: currentData?.user_config
  })

  return (
    <div className="min-h-screen pb-10">
      {/* Banner */}
      <div
        className="h-12 sm:h-20 md:h-28 w-full relative rounded-b-xl"
        style={{ background: `linear-gradient(135deg, ${colorPrimaryBg}, ${colorPrimary}22)` }}
      />

      <FormUserConfig
        ref={refFormUserConfig}
        onSuccess={() => fetchProfile()}
      />

      <FormAccountDetails
        ref={refFormAccountDetail}
        onSuccess={() => fetchProfile()}
      />

      {/* Avatar + Name */}
      <div className="px-4 sm:px-6">
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
              <Typography.Title level={4} className="m-0! text-lg! sm:text-xl! leading-tight! truncate">
                {profile?.first_name + ' ' + profile?.last_name}
              </Typography.Title>
              <Typography.Text type="secondary" className="text-xs! sm:text-sm!">
                {profile?.organization?.name ?? '—'}
              </Typography.Text>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Account Details */}
          <CardDetail
            iconTitle={dataAccountsDetail.iconTitle}
            title="Account Details"
            data={dataAccountsDetail.data}
            onEdit={() => refFormAccountDetail.current?.handleUpdate(profile)}
          />

          {/* Financial Limit */}
          <CardDetail
            iconTitle={dataFinancialLimit.iconTitle}
            title="Financial Limit"
            data={dataFinancialLimit.data}
            onEdit={() => refFormUserConfig.current?.handleUpdate(currentData?.user_config)}
          />

          {/* Organization */}
          <CardDetail
            iconTitle={dataOrganization.iconTitle}
            title="Organization"
            data={dataOrganization.data}
          />

          {/* Activity */}
          <CardDetail
            iconTitle={dataActivity.iconTitle}
            title="Activity"
            data={dataActivity.data}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
