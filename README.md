# Mission Command Central (MC2)

Mission Command Central is a high-fidelity tactical monitoring and mission coordination dashboard designed for modern joint operation environments. It provides a comprehensive Common Operational Picture (COP) for monitoring assets, intelligence, and mission lifecycle in real-time.

## 🛡️ Core Capabilities

- **Common Operational Picture (COP):** Real-time tracking of multi-domain assets (Air, Land, Sea, Space) via integrated GIS mapping.
- **Signals Intelligence (SIGINT):** Advanced monitoring of electronic emissions, radar signatures (ELINT), and communication intercepts (COMINT).
- **Mission Lifecycle Management:** Full suite for operational orders (OPORD), mission phase tracking, and Rules of Engagement (ROE) enforcement.
- **State-of-the-Art Security:** Simulated high-security environment with classification banners, COMSEC monitoring, and multi-factor PKI authentication.
- **Tactical Analytics:** Visual representation of threat levels, asset readiness, and logistics status.

## 🚀 Technology Stack

The application is built using a modern, performance-oriented stack:

- **Frontend Framework:** [React 18](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Mapping:** [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) or `npm` / `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mission-command-central
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   bun dev
   # or
   npm run dev
   ```

## 📋 Data Architecture

This project currently operates as a **high-fidelity prototype** using sophisticated mock data. 
- **In-Memory Store:** Powered by Zustand for complex state transitions.
- **Simulated Real-time:** Assets update their positions and status dynamically via background timers.
- **Extensible:** The data layer is designed to be easily swapped with a real-time WebSocket or REST API backend.

## 🔐 Security Information

This system is configured for **NATO STANAG 4677** compliance simulation. All data displayed is for demonstration and experimentation purposes only.

---

*This application was developed as a high-level experiment in rapid prototyping for complex C2 systems.*
