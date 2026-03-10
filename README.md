# 🌌 Astro Blog Antigravity

**Sarim's Pensieve — A Thinking Space.**

Aسٹunning, high-performance blog built with **Astro**, **Keystatic**, and **Vanilla CSS**. This project is designed for thinkers and writers who want a premium, fast, and easily manageable digital garden.

---

## ✨ Key Features

-   **🚀 Fast & Light**: Built with Astro for minimal JavaScript and maximum performance.
-   **📝 Keystatic CMS Integration**: A local-first, Git-based CMS that allows you to manage content directly from your browser.
-   **🔍 Live Search**: Lightning-fast client-side search for articles by title, excerpt, or category.
-   **🌓 Dark Mode**: A sleek, persistent dark theme with smooth transitions.
-   **📱 Fully Responsive**: Optimized for everything from large desktops to mobile phones.
-   **🎨 Premium Design**: Modern typography (Outfit & Playfair Display), subtle micro-animations, and a curated color palette.
-   **📂 Organized Categorization**: Easily filter thoughts into Philosophy, Science, Thoughts, and Miscellaneous.

---

## 🛠️ Tech Stack

-   **Framework**: [Astro](https://astro.build/)
-   **CMS**: [Keystatic](https://keystatic.com/)
-   **Styling**: Vanilla CSS (Modern CSS Variables & Logic)
-   **Fonts**: [Google Fonts](https://fonts.google.com/) (Outfit, Playfair Display)
-   **Search**: Client-side fetch + API Routes
-   **Deployment**: Optimized for [Netlify](https://www.netlify.com/)

---

## 📂 Project Structure

```text
/
├── public/              # Static assets (Favicons, static images)
├── src/
│   ├── components/      # Reusable Astro components (Header, Cards, etc.)
│   ├── content/         # Markdown/Markdoc files (Managed by Keystatic)
│   ├── layouts/         # Base templates for pages (MainLayout.astro)
│   ├── pages/           # Route definitions (Home, Single Post, API)
│   │   ├── api/         # JSON endpoints for search
│   │   └── [slug].astro # Dynamic post routing
│   └── styles/          # Global styles and design system tokens
├── keystatic.config.ts  # CMS configuration & schema definitions
└── astro.config.mjs     # Astro framework settings
```

---

## 🚀 Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/sarimhasan/Astro-Blog-Antigravity.git
cd Astro-Blog-Antigravity
```

### 2. Install dependencies
```sh
npm install
```

### 3. Run development server
```sh
npm run dev
```
Your site will be available at `http://localhost:4321`.

### 4. Access the CMS
While the dev server is running, visit:
`http://localhost:4321/keystatic`
This will open the local Keystatic interface where you can create and edit posts.

### 5. Build for production
```sh
npm run build
```

---

## ⚙️ Configuration

### Keystatic Storage
The project is configured to use:
-   **Local Storage** in development (faster).
-   **GitHub Storage** in production (so content is saved back to your repo automatically).

Ensure you update the `repo` field in `keystatic.config.ts` to point to your own repository if you fork this project.

### Environment Variables
Check `.env.example` for required variables (especially if using GitHub Auth for Keystatic).

---

## 🤝 Contributing

Feel free to fork this project and adapt it to your own needs! If you find any issues or have suggestions, please open an issue or pull request.

---

## 📄 License

This project is open-source and available under the MIT License.
