import { theme as antdTheme, type ThemeConfig } from 'antd'

export type ThemeMode = 'light' | 'dark'

const fontFamily = "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"

export const getAppTheme = (mode: ThemeMode): ThemeConfig => ({
  cssVar: { prefix: 'ant' },
  hashed: false,
  algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: mode === 'dark' ? '#34d399' : '#10b981',
    colorInfo: mode === 'dark' ? '#34d399' : '#10b981',
    // Validated status palette (income/expense/net semantics) — see dataviz skill run.
    colorSuccess: '#0ca30c',
    colorError: '#d03b3b',
    colorWarning: '#fab219',
    borderRadius: 8,
    fontFamily,
  },
  components: {
    Card: {
      paddingLG: 16,
    },
    Table: {
      cellPaddingBlock: 10,
      cellPaddingInline: 12,
    },
    Menu: {
      itemHeight: 40,
      itemMarginBlock: 2,
      itemMarginInline: 8,
    },
    Layout: {
      headerHeight: 60,
    },
  },
})
