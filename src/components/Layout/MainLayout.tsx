
import { Layout, Menu, theme } from 'antd';
import type { MenuItemType } from 'antd/es/menu/interface';
import { WalletOutlined } from "@ant-design/icons"
import { createMenu } from '../../constants/menu';
import { useNavigate } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
  accentColor: 'white',
  background: 'white',
};

type MainLayoutProps = {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['/dashboard'])
  const navigate = useNavigate()
  const menu = useMemo(() => createMenu(navigate), [navigate])
  const title = menu?.find(x => x?.key === selectedKeys[0]) as MenuItemType | undefined

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="m-6 flex gap-2 text-[#62d163]">
          <WalletOutlined className="text-5xl" />
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-neutral-950">FinTrack</p>
            <p className="text-xs text-neutral-500">Expense Tracker</p>
          </div>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={selectedKeys}
          items={menu}
          onClick={({ key }) => setSelectedKeys([key])}
        />
      </Sider>
      <Layout>
        <Header
          style={{ background: colorBgContainer }}
          className='pl-6! pr-6! pt-4! pb-4!'
        >
          <h3 className='text-2xl font-semibold'>{title?.label}</h3>
        </Header>
        <Content className='mt-6 mx-4' style={{ overflow: 'initial' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ikhwan ©{new Date().getFullYear()} Designed by Ant Design
        </Footer>
      </Layout>
    </Layout>
  )
}

export default MainLayout