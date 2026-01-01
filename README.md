# VTU SGPA Calculator ⚡

[![CI](https://github.com/theanikeeeeet/VTU-SGPA-CALCULATOR/actions/workflows/ci.yml/badge.svg)](https://github.com/theanikeeeeet/VTU-SGPA-CALCULATOR/actions)
[![Pages](https://github.com/theanikeeeeet/VTU-SGPA-CALCULATOR/actions/workflows/deploy.yml/badge.svg)](https://theanikeeeeet.github.io/VTU-SGPA-CALCULATOR)

A fast, privacy-first SGPA/CGPA calculator for VTU students — minimal UI, accurate calculations, and zero data collection.

---

## 🔍 Demo & Live

![App screenshot](assets/screenshot.png)

**Live demo:** https://theanikeeeeet.github.io/VTU-SGPA-CALCULATOR

> To refresh the screenshot: open the **Actions** tab → choose **Capture runtime screenshot** workflow → click **Run workflow**.

---

## ✨ Key Features

- Quick SGPA & CGPA calculations (marks → grade points → weighted average)
- Interactive, mobile-friendly charts (Chart.js) showing marks vs credits
- Export as PDF (client-side; no server) and updateable README screenshot via workflow
- Accessibility & validation: marks clamped to 0–100, empty fields ignored, and friendly messages
- Privacy-first: all computation happens locally in the browser; nothing is sent to any server

---

## 🚀 Quick Start (detailed)

**Prerequisites**
- Node.js v16+ and npm installed

**Clone the repository**
```bash
git clone https://github.com/theanikeeeeet/VTU-SGPA-CALCULATOR.git
cd VTU-SGPA-CALCULATOR
```

**Install dependencies**
```bash
npm install
```

**Development server**
```bash
npm start
# Open http://localhost:3000
```

**Build for production**
```bash
npm run build
# serve with: npx http-server build -p 5000
```

**Run tests**
```bash
npm test
```

---

## 🧭 Usage (how it works)

1. Select scheme, branch, and semester from the dropdowns.
2. Enter marks (0–100) for each subject; empty fields are ignored.
3. Click **Calculate SGPA** to compute SGPA for the semester.
4. Click **Save Semester** to preserve the SGPA (used by CGPA calculation).
5. In **CGPA** tab, click **Calculate CGPA** to compute cumulative GPA based on saved semesters.
6. Use **Export Result** to generate a PDF snapshot of the result area.

**Notes**
- Grades use the mapping in `src/utils/grades.js`.
- SGPA/CGPA values are rounded to two decimal places for readability.

---

## ✅ Validation & Error Handling

- Marks validated (0–100). Invalid inputs are ignored and the UI shows guidance.
- At least one valid mark and non-zero total credits are required to calculate SGPA.
- Export errors are handled gracefully with a friendly message.

---

## 🧪 Testing & CI

- Unit tests live in `src/utils/*.test.js` and run with `npm test`.
- CI (`.github/workflows/ci.yml`) runs `npm install`, `npm test`, and `npm run build`.

---

## 📦 Project Structure (short)

- `src/`
  - `App.js` — main app and tabbed UI
  - `components/Charts.js` — chart component (responsive)
  - `components/SubjectRow.js` — controlled row with validation
  - `utils/grades.js` — grade mapping and SGPA calculation (unit-tested)
- `public/` — static files and `index.html`
- `assets/` — README screenshot and images
- `.github/workflows/` — CI, deploy, and screenshot workflows

---

## 🔧 Deployment

- GitHub Pages: `.github/workflows/deploy.yml` builds and deploys `build/` on push to `main`.
- Netlify/Vercel: run `npm run build` and connect the repo to deploy from `build/`.

---

## 🤝 Contributing

1. Fork → branch → implement → add tests (if applicable) → open PR
2. Keep changes small and describe the reason clearly
3. Follow repository code style and run tests locally

See `CONTRIBUTING.md` for more details.

---

## 🛠 Troubleshooting

- CI `npm ci` failures: keep `package.json` and `package-lock.json` in sync; workflows use `npm install` where appropriate.
- Export PDF issues: run export in a modern browser; headless environments may restrict canvas APIs.
- If `git` is not recognized on Windows, add Git to PATH or re-run installer and restart terminal.

---

## 🔭 Roadmap

- Add E2E tests (Playwright), better grade predictor, and translations.

---

## 📄 License & Contact

MIT — see `LICENSE`.
Questions or suggestions? Open an issue or submit a PR: https://github.com/theanikeeeeet/VTU-SGPA-CALCULATOR

---

Made with ❤️ for VTU students — simple, private, and useful.