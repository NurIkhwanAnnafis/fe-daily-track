
import { Layout, theme } from 'antd';

type AuthLayoutProps = {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <Layout hasSider className='w-full h-full' style={{ background: colorBgLayout }}>
      {children}
    </Layout>
  )
}

export default AuthLayout
