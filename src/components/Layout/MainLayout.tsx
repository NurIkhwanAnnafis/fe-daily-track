
import { Button, Drawer, Dropdown, Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons"
import LayoutProvider from '../../provider/layout.context';
import { useMainLayout } from './hooks/useMainLayout';

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
  borderRight: '2px solid #f0f0f0',
};

type MainLayoutProps = {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const {
    colorBgContainer,
    screen,
    profile,
    selectedKeys,
    collapsed,
    menuItems,
    currentMenu,
    profileMenuItems,
    setCollapsed,
    setSelectedKeys,
    handleClickItems,
  } = useMainLayout()

  return (
    <Layout hasSider className='min-h-full!'>
      <Drawer
        placement='left'
        closable={false}
        onClose={() => setCollapsed(false)}
        open={collapsed}
        key='left'
      >
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
          items={menuItems}
          onClick={({ key }) => {
            setSelectedKeys([key])
            setCollapsed(false)
          }}
        />
      </Drawer>
      <Sider style={siderStyle} className="max-lg:hidden">
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
          items={menuItems}
          onClick={({ key }) => {
            setSelectedKeys([key])
            if (collapsed) setCollapsed(false)
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{ background: colorBgContainer }}
          className='pl-6! pr-6! pt-4! pb-4! border-b-2! border-[#f0f0f0]! flex items-center'
        >
          <Button
            variant='text'
            icon={<MenuUnfoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className='lg:hidden! mr-3'
          />
          <h3 className='text-2xl font-semibold'>{currentMenu?.title}</h3>
          {!screen.isMobile && (
            <Dropdown menu={{ items: profileMenuItems, onClick: handleClickItems }} trigger={['click']}>
              <Button icon={<UserOutlined />} className='ml-auto!' type='text' iconPlacement='end'>
                {profile?.email}
              </Button>
            </Dropdown>
          )}
        </Header>
        <Content className='mt-6 mx-4' style={{ overflow: 'initial' }}>
          <LayoutProvider {...screen}>
            {children}
          </LayoutProvider>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ikhwan ©{new Date().getFullYear()} Designed by Ant Design
        </Footer>
      </Layout>
    </Layout>
  )
}

export default MainLayout