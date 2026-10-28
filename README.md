# Paceefik Engineering Services Limited

> **“From concept to completion, we deliver engineering solutions that last.”**

Official corporate web application for **Paceefik Engineering Services Limited** (Paceefik Engineering), based in Osogbo, Osun State, Nigeria, led by founder and project engineer **Ibrahim Muslihudeen Pacific**.

---

## 🌟 Features & Highlights

- **Interactive Photo Gallery**: Curated showcase of over 70 real-world project photographs covering building construction, structural and concrete works, borehole drilling, and on-site engineering teams.
- **7 Core Engineering Services**:
  1. Building Construction
  2. Structural & Concrete Works
  3. Blockwork & Masonry
  4. Borehole Drilling & Water Systems
  5. Project Supervision & Engineering Consultancy
  6. Geotechnical Services & Soil Investigation
  7. Renovation & Remodelling
- **Multi-Step Quote Request Workflow**: Interactive client quotation request system with automated reference numbers (`PE-Q-YYYYMMDD-XXXX`), project specification capture, file attachments, and WhatsApp/Email routing.
- **Contact & Location Hub**: Direct contact channels, WhatsApp enquiry routing, message submission with tracking reference numbers (`PE-C-YYYYMMDD-XXXX`), and head-office location guidance.
- **Engineering Insights Knowledge Base**: Comprehensive professional articles covering Nigerian construction standards, bill of quantities (BOQ) preparation, borehole drilling techniques, beam engineering, and soil testing.
- **Full SEO & Structured Data**: Built-in JSON-LD schemas (`Organization`, `LocalBusiness`, `EngineeringService`, `BreadcrumbList`), preloaded Sora font, Open Graph social share cards, and HTML sitemap.
- **Automated GitHub Pages Deployment**: GitHub Actions workflow included to build and deploy the site automatically to GitHub Pages on every push to `main`.

---

## 🚀 Live Hosting Options

### 1. GitHub Pages (Automated Deployment via GitHub Actions)
This repository includes an automated GitHub Actions deployment workflow in `.github/workflows/deploy.yml`.

1. Push this repository to GitHub on the `main` branch.
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. The deployment workflow will automatically run, build the site, and publish it to:
   ```
   https://<your-username>.github.io/<your-repo-name>/
   ```
*(Custom domains like `paceefik.com` can also be configured under **Custom domain** in repository settings).*

---

## 🛠 Local Development

### Requirements
- **Node.js 20+** or **22+**
- **npm** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build & Production Preview

```bash
# Production build (creates dist/ with index.html and 404.html for SPA routing)
npm run build

# Start production server
npm run start
```

---

## 📁 Project Architecture

```
├── .github/workflows/
│   └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── fonts/                  # Sora typography assets
│   ├── images/paceefik/        # 74+ verified project & company photos
│   ├── sitemap.xml             # XML sitemap for search engines
│   └── robots.txt              # Search crawler directives
├── src/
│   ├── components/site/        # Header, Footer, Gallery, Lightbox, Actions
│   ├── config/                 # Company configuration, contact data, brand colors
│   ├── content/                # Services, projects catalog, insights, routes
│   ├── pages/                  # Home, About, Services, Projects, Quote, Contact
│   ├── App.tsx                 # Core application router & SPA state manager
│   ├── main.tsx                # Client entry point
│   └── index.css               # Typography, Tailwind CSS styling, responsive rules
├── server.ts                   # Express server with /api/forms endpoints and static serving
├── index.html                  # HTML entry point with metadata & font preloads
├── package.json
└── tsconfig.json
```

---

## 📄 License
© Paceefik Engineering Services Limited. All rights reserved.
