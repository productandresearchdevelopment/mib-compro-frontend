# Product HUB Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Enterprise Resource Planning Frontend application built with Next.js 15, React 19, and Tailwind CSS. Designed to provide a premium, responsive, and intuitive user interface for the Product HUB system.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Features](#features)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

**Product HUB Frontend** is the modern web interface for the Product HUB system. It consumes the API to provide comprehensive management tools for:

- **CRM Module** - Dashboard for Customer Relationship Management
- **System Module** - Administrative controls for users, roles, and companies
- **Files** - Upload and management interface

### Key Features

- ✅ **Modern UX/UI** - Built with Radix UI and Shadcn UI for accessible, premium components
- **Responsive Design** - Fully responsive layout optimized for all devices
- **Type Safety** - End-to-end type safety with TypeScript
- **State Management** - Efficient client-state with Zustand and server-state with TanStack Query
- **Form Handling** - Robust forms with React Hook Form and Zod validation
- **Theming** - Dark/Light mode support via next-themes

---

## 🏗️ Architecture

The application uses **Next.js App Router** for routing and layout management.

### Data Flow

```
User Action → Component → React Query / Zustand → API Client → Backend API
    ↑             │                                  │
    └─────────────┴──────────────────────────────────┘
            UI Updates (Optimistic / Real-time)
```

- **Server Components**: Used for initial data fetching and layout structure.
- **Client Components**: Used for interactive elements, forms, and dynamic data binding.
- **Store**: Global client state (like sidebar toggle, auth user session) managed by Zustand.
- **Cache**: Server data caching and synchronization managed by TanStack Query.

---

## 🛠️ Tech Stack

### Core Framework

- **[Next.js 16](https://nextjs.org/)** - React Framework for Production
- **[React 19](https://react.dev/)** - Library for web and native user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript at Any Scale

### Styling & UI

- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Primitives for building high-quality web apps
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons
- **[Hugeicons](https://hugeicons.com/)** - High-quality icon library
- **[Sonner](https://sonner.emilkowal.ski/)** - An opinionated toast component for React

### State & data

- **[TanStack Query](https://tanstack.com/query/latest)** - Powerful asynchronous state management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Small, fast and scalable bearbones state-management
- **[Axios/Fetch](https://axios-http.com/)** - HTTP Client (via custom proxy wrapper)

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant, flexible and extensible forms
- **[Zod](https://zod.dev/)** - TypeScript-first schema declaration and validation

---

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router pages & layouts
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Base UI elements (buttons, inputs, etc.)
│   │   └── ...             # Feature-specific components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Library configurations (utils, utils)
│   ├── store/              # Zustand state stores
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper functions & formatting
├── .env                    # Environment variables
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── package.json            # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher (LTS recommended)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/productandresearchdevelopment/podhub-frontend.git
cd podhub-frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Configure environment variables**

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` to point to your backend API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

4. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:3001` (or whichever port Next.js selects).

---

## 💻 Development

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Code Standards

- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Hooks**: camelCase with use prefix (e.g., `useAuth.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `UserType.ts`) or `types.ts`

---

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a git repository (GitHub, GitLab, BitBucket).
2. Import your project into Vercel.
3. Configure the **Build Settings** (detected automatically).
4. Add your **Environment Variables** (e.g., `NEXT_PUBLIC_API_URL`).
5. Deploy!

### Docker

You can also containerize the application:

```bash
docker build -t podhub-frontend .
docker run -p 3000:3000 podhub-frontend
```

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Developer Team**  
PT QUALITA INDONESIA

- **Salman Dwi Maulana Akbar** — Fullstack Developer  
  GitHub: https://github.com/SalmanDMA

---

## 📞 Support

For support, email dev@qualita.com or open an issue in the repository.

---

**Made with ❤️ by PT QUALITA INDONESIA**
