
import { Layout } from 'antd';

type AuthLayoutProps = {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Layout hasSider className='bg-[#F6F7F8] w-full h-full'>
      {children}
    </Layout>
  )
}

export default AuthLayout
