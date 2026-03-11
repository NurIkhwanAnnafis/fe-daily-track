import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterProvider } from '@tanstack/react-router'
import { createAppRouter } from './src/routes'

export function render(url: string) {
  const router = createAppRouter()
  router.navigate({ to: url })

  const html = renderToString(
    <RouterProvider router={router} />
  )

  return { html }
}
