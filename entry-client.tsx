import React from "react"
import { hydrateRoot } from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"
import { NuqsAdapter } from "nuqs/adapters/react"
import { createAppRouter } from "./src/routes"
import "./src/index.css"

const root = document.getElementById("root") as HTMLElement
const router = createAppRouter()

hydrateRoot(
  root!,
  <NuqsAdapter>
    <RouterProvider router={router} />
  </NuqsAdapter>
)
