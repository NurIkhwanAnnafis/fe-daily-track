import { useMemo } from "react"
import { Tag } from "antd"
import {
  BankOutlined,
  CalendarOutlined,
  IdcardOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  WalletOutlined
} from "@ant-design/icons"
import type { User } from "../../../types/user"
import type { UserConfig } from "../../../types/user-config"
import { numberFormatter } from "../../../utils/number"
import { formatDate } from "../../../utils/date"

type Props = {
  profile: User | undefined
  userConfig: UserConfig | undefined
}

export const useProfilePage = (props: Props) => {
  const { profile, userConfig } = props

  const dataAccountsDetail = useMemo(() => {
    return {
      iconTitle: <UserOutlined />,
      data: [
        {
          label: 'User ID',
          value: 'XXXX-XXXX-XXXX-XXXX',
          icon: <IdcardOutlined />
        },
        {
          label: 'First Name',
          value: profile?.first_name ?? '—',
          icon: <IdcardOutlined />
        },
        {
          label: 'Last Name',
          value: profile?.last_name ?? '—',
          icon: <IdcardOutlined />
        },
        {
          label: 'Email',
          value: profile?.email ?? '—',
          icon: <MailOutlined />
        },
        {
          label: 'Role',
          value: profile?.role ? (
            <Tag color="geekblue" className="capitalize! rounded-full!">
              {profile.role}
            </Tag>
          ) : (
            '—'
          ),
          icon: <SafetyCertificateOutlined />
        }
      ]
    }
  }, [profile])

  const dataFinancialLimit = useMemo(() => {
    return {
      iconTitle: <WalletOutlined />,
      data: [
        {
          label: 'Initial Amount',
          value: numberFormatter(userConfig?.config.initial_amount, 'id'),
          icon: <WalletOutlined />
        },
        {
          label: 'Income Limit Per Month',
          value: numberFormatter(userConfig?.config.income_limit_per_month, 'id'),
          icon: <WalletOutlined />
        },
        {
          label: 'Income Limit Per Day',
          value: numberFormatter(userConfig?.config.income_limit_per_day, 'id'),
          icon: <WalletOutlined />
        },
        {
          label: 'Expense Limit Per Month',
          value: numberFormatter(userConfig?.config.expense_limit_per_month, 'id'),
          icon: <WalletOutlined />
        },
        {
          label: 'Expense Limit Per Day',
          value: numberFormatter(userConfig?.config.expense_limit_per_day, 'id'),
          icon: <WalletOutlined />
        }
      ]
    }
  }, [userConfig])

  const dataOrganization = useMemo(() => {
    return {
      iconTitle: <BankOutlined />,
      data: [
        {
          label: 'Organization ID',
          value: 'XXXX-XXXX-XXXX-XXXX',
          icon: <IdcardOutlined />
        },
        {
          label: 'Organization Name',
          value: profile?.organization?.name ?? '—',
          icon: <BankOutlined />
        }
      ]
    }
  }, [userConfig])

  const dataActivity = useMemo(() => {
    return {
      iconTitle: <CalendarOutlined />,
      data: [
        {
          label: 'Joined',
          value: formatDate(profile?.created_at),
          icon: <CalendarOutlined />
        },
        {
          label: 'Last Updated',
          value: formatDate(profile?.updated_at),
          icon: <CalendarOutlined />
        }
      ]
    }
  }, [profile])

  return {
    dataAccountsDetail,
    dataFinancialLimit,
    dataOrganization,
    dataActivity,
  }
}