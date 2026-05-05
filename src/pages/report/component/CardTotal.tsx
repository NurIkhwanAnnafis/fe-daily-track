import { Card, Tooltip, Typography } from "antd"
import React from "react"
import { InfoCircleFilled } from "@ant-design/icons"
import { numberFormatter } from "../../../utils/number"

type CardTotalProps = {
  income: number
  expense: number
  amount: number
  balance: number
}

const CardTotal: React.FC<CardTotalProps> = ({ income, expense, amount, balance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card
        className="text-center"
        title="Total Balance"
        variant="outlined"
      >
        <Typography.Text type={balance === 0 ? undefined : balance < 0 ? 'danger' : 'success'}>
          <span className="text-xl font-medium">
            {numberFormatter(balance, 'id')}
          </span>
        </Typography.Text>
      </Card>
      <Card
        className="text-center"
        title={
          <span>
            Income
            <Tooltip title="Total Income affected by filter date">
              <InfoCircleFilled className="ml-2" />
            </Tooltip>
          </span>
        }
        variant="outlined"
      >
        <Typography.Text type="success">
          <span className="text-xl font-medium">
            +{numberFormatter(income, 'id')}
          </span>
        </Typography.Text>
      </Card>
      <Card
        className="text-center"
        title={
          <span>
            Expense
            <Tooltip title="Total Expenses affected by filter date">
              <InfoCircleFilled className="ml-2" />
            </Tooltip>
          </span>
        }
        variant="outlined"
      >
        <Typography.Text type="danger">
          <span className="text-xl font-medium">
            -{numberFormatter(expense, 'id')}
          </span>
        </Typography.Text>
      </Card>
      <Card
        className="text-center"
        title={
          <span>
            Total
            <Tooltip title="Calculation of Income and Expense affected by filter date">
              <InfoCircleFilled className="ml-2" />
            </Tooltip>
          </span>
        }
        variant="outlined"
      >
        <Typography.Text type={amount === 0 ? undefined : amount < 0 ? 'danger' : 'success'}>
          <span className="text-xl font-medium">
            {numberFormatter(amount, 'id')}
          </span>
        </Typography.Text>
      </Card>
    </div>
  )
}

export default CardTotal
