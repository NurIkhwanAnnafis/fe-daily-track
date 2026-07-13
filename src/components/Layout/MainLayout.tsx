
import { Avatar, Button, Drawer, Dropdown, Layout, Menu, Tooltip, Typography } from 'antd';
import { MenuUnfoldOutlined, MoonFilled, SunFilled, UserOutlined } from "@ant-design/icons"
import LayoutProvider from '../../provider/layout.context';
import { useMainLayout } from './hooks/useMainLayout';

const { Header, Content, Footer, Sider } = Layout;

type MainLayoutProps = {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const {
    colorBgContainer,
    colorBgLayout,
    colorBorderSecondary,
    mode,
    toggleThemeMode,
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

  const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
    background: colorBgContainer,
    borderRight: `1px solid ${colorBorderSecondary}`,
  };

  const ThemeToggle = (
    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <Button
        variant="text"
        shape="circle"
        onClick={toggleThemeMode}
        icon={mode === 'dark' ? <SunFilled /> : <MoonFilled />}
      />
    </Tooltip>
  )

  return (
    <Layout hasSider className='min-h-full!'>
      <Drawer
        placement='left'
        closable={false}
        onClose={() => setCollapsed(false)}
        open={collapsed}
        key='left'
      >
        <div className="mx-6 mt-6 mb-4 flex gap-2 items-center">
          <img src="/favicon.svg" alt="My Daily" className="w-9 h-9" />
          <div className="flex flex-col">
            <Typography.Text strong className="text-base leading-tight">FinTrack</Typography.Text>
            <Typography.Text type="secondary" className="text-xs leading-tight">Expense Tracker</Typography.Text>
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
        <div className='absolute bottom-6 left-6 right-6 flex items-center justify-between'>
          <Dropdown menu={{ items: profileMenuItems, onClick: handleClickItems }} trigger={['click']}>
            <div className='flex gap-2 items-center cursor-pointer'>
              <Avatar size={32} icon={<UserOutlined />} />
              <span className='font-medium'>{profile?.first_name}</span>
            </div>
          </Dropdown>
          {ThemeToggle}
        </div>
      </Drawer>
      <Sider style={siderStyle} className="max-lg:hidden">
        <div className="mx-6 mt-6 mb-4 flex gap-2 items-center">
          <img src="/favicon.svg" alt="My Daily" className="w-9 h-9" />
          <div className="flex flex-col">
            <Typography.Text strong className="text-base leading-tight">FinTrack</Typography.Text>
            <Typography.Text type="secondary" className="text-xs leading-tight">Expense Tracker</Typography.Text>
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
      <Layout style={{ background: colorBgLayout }}>
        <Header
          style={{ background: colorBgContainer, borderBottom: `1px solid ${colorBorderSecondary}` }}
          className='pl-6! pr-6! pt-4! pb-4! flex items-center gap-3'
        >
          <Button
            variant='text'
            icon={<MenuUnfoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className='lg:hidden!'
          />
          <h3 className='text-xl font-semibold m-0'>{currentMenu?.title}</h3>
          <div className='ml-auto flex items-center gap-2'>
            {ThemeToggle}
            {!screen.isMobile && (
              <Dropdown menu={{ items: profileMenuItems, onClick: handleClickItems }} trigger={['click']}>
                <Button icon={<UserOutlined />} type='text' iconPlacement='end'>
                  {profile?.first_name}
                </Button>
              </Dropdown>
            )}
          </div>
        </Header>
        <Content className='mt-6 mx-4' style={{ overflow: 'initial' }}>
          <LayoutProvider {...screen}>
            {children}
          </LayoutProvider>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Typography.Text type="secondary" className="text-xs">
            Ikhwan ©{new Date().getFullYear()} Designed by Ant Design
          </Typography.Text>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default MainLayout