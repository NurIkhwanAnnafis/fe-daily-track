import express from 'express'
import { createServer as createViteServer } from 'vite'

async function startServer() {
  try {
    const app = express()
    const port = 5173

    // Create Vite server in middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa' // Changed from 'custom' to 'spa'
    })

    // Use Vite's connect instance as middleware
    // This handles HMR, serving index.html, and transforming files
    app.use(vite.middlewares)

    // API routes will go here in the future
    // Example:
    // app.use('/api', apiRouter)

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()