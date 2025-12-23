# Awesome Obsidian

A modern and high-performance curated list of Obsidian plugins, allowing you to explore, search, and rate the best community extensions.

## 🚀 Tech Stack

The project uses the latest technologies in the web ecosystem to ensure performance and an excellent developer experience.

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/postcss`)
- **Database**: [Drizzle ORM](https://orm.drizzle.team/) with [LibSQL](https://github.com/tursodatabase/libsql) (SQLite/Turso)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme Management**: `next-themes`

## 🏗️ Project Architecture

Awesome Obsidian was designed to be fast and efficient:

- **Static Export**: Configured with `output: 'export'`, generating a static site that can be hosted anywhere.
- **Obsidian API Integration**: Plugin data is fetched directly from the official `obsidianmd/obsidian-releases` repository.
- **Smart Caching**: Uses Next.js `unstable_cache` to manage caching for external requests and the database.
- **Client-Side Search**: Plugin filtering and pagination occur on the client side for an instant response.

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fazedordecodigo/awesome-obsidian.git
   cd awesome-obsidian
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file based on `.env.example` and add your Turso credentials (if necessary for the rating system).

4. Initialize the database:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
src/
├── app/            # Routes, layouts, and Server Actions
├── components/     # Reusable UI components
├── db/             # Drizzle configuration and Schema
└── lib/            # API logic, queries, and utilities
```

## ✨ Key Features

- **Plugin Exploration**: Complete list of Obsidian community plugins.
- **Real-Time Search**: Filter plugins by name, author, or description.
- **Statistics**: View downloads, stars, and update date.
- **Rating System**: Rate your favorite plugins.
- **Dark/Light Theme**: Native theme support with persistence.

## 🔄 Development Workflow

- **Development**: `npm run dev` to start the local server.
- **Database**: Use `npm run db:push` to sync schema changes.
- **Build**: `npm run build` generates the static export in the `out/` folder.
- **Linting**: `npm run lint` to ensure code quality.

## 📏 Code Standards

- **Components**: Prefer functional components and use Tailwind CSS 4 for styling.
- **Icons**: Always use the `lucide-react` library.
- **Data**: Centralize API calls in `src/lib/obsidian-api.ts` and queries in `src/lib/db-queries.ts`.
- **Security**: Never expose secrets in the code; use environment variables.

## 🧪 Testing

Currently, the project uses ESLint to ensure code consistency. Unit and integration tests are planned for future versions.

## 🤝 Contributing

Contributions are welcome! Follow the established code standards and feel free to open Pull Requests or Issues.

1. Fork the project
2. Create a Branch for your feature (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the Branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.
