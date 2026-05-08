# My Daily — Personal Finance Tracker

A personal finance management web application for tracking daily income, expenses, categories, and financial reports. Built with a modern React SSR stack and a lightweight Express server.

---

## ✨ Features

- 📊 **Dashboard** — High-level overview of your financial health
- 💸 **Expense Tracking** — Log and categorize your daily expenses
- 💰 **Income Tracking** — Record income sources and amounts
- 🏷️ **Category Management** — Organize transactions with custom categories
- 📈 **Reports** — Visualize spending and income trends with charts
- 👤 **User Profile** — Manage your account and configuration
- 🔐 **Authentication** — Secure login powered by Supabase

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library |
| [TanStack Router](https://tanstack.com/router) | File-based, type-safe client routing |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Ant Design](https://ant.design/) | UI component library |
| [Recharts](https://recharts.org/) | Data visualization / charts |
| [Zustand](https://zustand-demo.pmnd.rs/) | Global state management |
| [nuqs](https://nuqs.47ng.com/) | Type-safe URL search params |
| [dayjs](https://day.js.org/) | Date formatting and manipulation |
| [Effect](https://effect.website/) | Typed functional programming, Network Handling & error handling |

### Build & Tooling
| Technology | Purpose |
|---|---|
| [Vite 7](https://vite.dev/) | Build tool & dev server |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [tsx](https://github.com/privatenumber/tsx) | TypeScript execution for the server |
| [ESLint](https://eslint.org/) | Code linting |
| [PostCSS / Autoprefixer](https://postcss.org/) | CSS processing |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (or your preferred package manager)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd my-daily

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and fill in the required values (see Environment Variables section)

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:<PORT>` as configured in your `.env`.

---

## 🔧 Environment Variables

Copy `.env.example` to `.env` and provide the appropriate values for your environment.

```env
NODE_ENV=development
VITE_BASE_URL=your_api_url
PORT=your_port
```

| Variable | Description |
|---|---|
| `NODE_ENV` | Runtime environment (`development` / `production`) |
| `VITE_BASE_URL` | Base URL for API requests |
| `PORT` | Port the Express server listens on |

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server (Express + Vite SSR) |
| `npm run build` | Build the client and SSR bundles for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the codebase |

---

## 📁 Project Structure

```
my-daily/
├── src/
│   ├── components/     # Shared UI components
│   ├── constants/      # App-wide constants
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Library configurations & helpers
│   ├── pages/          # Page-level components
│   │   ├── dashboard/
│   │   ├── expense/
│   │   ├── income/
│   │   ├── category/
│   │   ├── report/
│   │   ├── profile/
│   │   └── login/
│   ├── provider/       # React context providers
│   ├── routes/         # TanStack Router file-based routes
│   ├── services/       # API service layer
│   ├── store/          # Zustand state stores
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── server/             # Express SSR server
├── entry-client.tsx    # Client hydration entry point
├── entry-server.tsx    # SSR render entry point
├── vite.config.ts      # Vite configuration
└── package.json
```

## Docker

```bash
docker-compose up -d --build
```