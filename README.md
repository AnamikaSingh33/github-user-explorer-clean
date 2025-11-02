cat > README.md <<'README'
# GitHub User Explorer

A modern and responsive web application that allows users to search for GitHub users and explore their public repositories with advanced filtering and sorting capabilities.

---

##  Live Demo  
 https://github-user-explorer-clean.vercel.app/

---

##  GitHub Repository  
https://github.com/AnamikaSingh33/github-user-explorer-clean

---

##  Features

 **User Search** – Search for GitHub users by username with input debouncing  
**User Details** – View avatar, name, bio, followers, and public repo count  
 **Repository List** – Displays repositories with stars, forks, language, and updated date  
 **Filters & Sorting** – Filter by language or stars and sort by stars/forks/date/name  
**Pagination / Infinite Scroll** – Smooth loading experience for large lists  
**Error Handling** – Graceful handling of API rate limits and invalid users  
 **Responsive Design** – Mobile-first layout using Tailwind CSS  
 **TypeScript Strict Mode** – Strongly typed with zero `any` types  
 **CI/CD** – Auto-deploy to Vercel via GitHub Actions  

---

## Tech Stack

| Category | Tools |
|-----------|-------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS |
| **State Management** | React Query (TanStack Query) |
| **API** | GitHub REST API v3 |
| **Build & Deploy** | Vite + Vercel + GitHub Actions |
| **Code Quality** | ESLint (strict), Prettier, Husky hooks |

---

##  Setup Instructions

Clone the repository and run locally:

```bash
git clone https://github.com/AnamikaSingh33/github-user-explorer-clean
cd github-user-explorer-clean
npm install
npm run dev
Build for production:
npm run build
npm run preview

