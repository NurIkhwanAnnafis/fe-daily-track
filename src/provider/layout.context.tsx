import { createContext } from "react";

type LayoutContextType = {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

type LayoutProviderProps = LayoutContextType

export const LayoutContext = createContext<LayoutContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: true
})

const LayoutProvider: React.FC<LayoutProviderProps & { children: React.ReactNode }> = (props) => {
  const { children, ...restProps } = props
  return (
    <LayoutContext.Provider
      value={restProps}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export default LayoutProvider
