import type { ThemeMode } from "./theme"

/**
 * Categorical palette for category-breakdown donut charts.
 * Fixed hue order — validated for CVD separation and contrast against the
 * app's actual light (#ffffff) and dark (#141414) card surfaces. Never reorder
 * or cycle; a 9th category should fold into "Other" instead of adding a hue.
 */
export const CATEGORICAL_PALETTE: Record<ThemeMode, string[]> = {
  light: ['#2a78d6', '#1baf7a', '#eda100', '#008300', '#4a3aa7', '#e34948', '#e87ba4', '#eb6834'],
  dark: ['#3987e5', '#199e70', '#c98500', '#008300', '#9085e9', '#e66767', '#d55181', '#d95926'],
}

/** Informational (non-status) accent for the "Balance" stat — categorical slot 1. */
export const BALANCE_COLOR: Record<ThemeMode, string> = {
  light: '#2a78d6',
  dark: '#3987e5',
}
