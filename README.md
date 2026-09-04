# 🧠 Brainly Frontend

> **⚠️ Development In Progress** — This project is actively being built. Features, components, and APIs are subject to change.

A **second-brain web application** that lets users save, organize, and share content from YouTube and Twitter/X — all in one place. Built with React, TypeScript, Vite, and TailwindCSS v4.

---

## 🚧 Project Status

```
█████████░░░░░░░░░░░░░░░░   ~35% Complete
```

| Area | Status |
|------|--------|
| Project Setup & Tooling | ✅ Done |
| Design Tokens & Theme | ✅ Done |
| Icon System | ✅ Done |
| `Button` Component | ✅ Done |
| `Card` Component | ✅ Done |
| Layout / Dashboard Shell | 🔄 In Progress |
| Sidebar / Navigation | ⏳ Planned |
| Content Modals (Add Content) | ⏳ Planned |
| Backend Integration | ⏳ Planned |
| Authentication | ⏳ Planned |
| Share Brain Feature | ⏳ Planned |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI Framework |
| TypeScript | ~6.0 | Type Safety |
| Vite | 8 | Build Tool & Dev Server |
| TailwindCSS | v4 | Styling |

---

## 📁 Project Structure

```
brainly-frontend/
├── icon/                        # Reusable SVG icon components
│   ├── index.ts                 # Shared IconProps & size variants
│   ├── plusicon.tsx             # + (Add) icon
│   ├── shareicon.tsx            # Share icon
│   ├── deleteicon.tsx           # Delete/Trash icon
│   └── youtubeIcon.tsx          # YouTube brand icon
│
├── src/
│   ├── component/
│   │   └── ui/
│   │       ├── Button.tsx       # Reusable Button component
│   │       └── Card.tsx         # Content Card (YouTube / Twitter)
│   │
│   ├── App.tsx                  # Root application component
│   ├── App.css                  # App-level styles
│   ├── index.css                # Global styles & Tailwind theme
│   └── main.tsx                 # React DOM entry point
│
├── index.html                   # HTML shell
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies & scripts
```

---

## 🏗️ Architecture Diagrams

### Component Tree (Current)

```
App
└── Card
    ├── YoutubeIcon
    ├── ShareIcon
    ├── DeleteIcon
    └── [Conditional Embed]
        ├── <iframe>        (type="youtube")
        └── <blockquote>    (type="tweeter")
```

### Icon System Design

```
icon/index.ts
  ├── IconProps  { size?: "sm" | "md" | "lg" }
  └── IconSizeVariant
        ├── "sm" → "size-4"   (16px)
        ├── "md" → "size-5"   (20px)  ← default
        └── "lg" → "size-6"   (24px)

        Used by:
        ├── PlusIcon
        ├── ShareIcon
        ├── DeleteIcon
        └── YoutubeIcon
```

### Button Component API

```
<Button>
  Props:
  ├── variant  → "primary"   (purple-600 bg, white text)
  │            → "secondary" (purple-300 bg, purple-600 text)
  │
  ├── size     → "sm" | "md" | "lg"
  │
  ├── text     → string (label)
  ├── startIcon? → ReactElement (icon before label)
  ├── endIcon?   → ReactElement (icon after label)
  └── onClick?   → () => void
```

### Card Component API

```
<Card>
  Props:
  ├── type  → "youtube"   renders <iframe> embed
  │         → "tweeter"  renders Twitter <blockquote>
  │
  ├── link  → string (content URL)
  └── title → string (card heading)

  Actions (icons in card header):
  ├── ShareIcon  → share content
  └── DeleteIcon → remove card
```

### Planned Application Architecture

```
┌─────────────────────────────────────────────────────┐
│                      App.tsx                         │
│                                                      │
│  ┌──────────────┐   ┌──────────────────────────────┐ │
│  │   Sidebar    │   │        Dashboard             │ │
│  │              │   │                              │ │
│  │  • All       │   │  ┌────────┐  ┌────────┐      │ │
│  │  • YouTube   │   │  │ Card   │  │ Card   │ ...  │ │
│  │  • Twitter   │   │  │YouTube │  │Twitter │      │ │
│  │              │   │  └────────┘  └────────┘      │ │
│  │  [Share      │   │                              │ │
│  │   Brain]     │   │         [+ Add Content]      │ │
│  └──────────────┘   └──────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                           ▲
                           │ (future)
                    ┌──────┴──────┐
                    │  Backend API │
                    │  (Planned)   │
                    └─────────────┘
```

### TailwindCSS v4 Custom Theme Tokens

```
@theme
├── --color-purple-600  #5046e4   (primary buttons, accents)
├── --color-purple-500  #3e38a7   (hover states)
├── --color-purple-300  #e0e7fe   (secondary button bg)
├── --color-gray-100    #eeeeef   (light borders)
├── --color-gray-200    #e6e9ed   (hover backgrounds)
└── --color-gray-600    #95989c   (muted text)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Clone the repository
git clone <repo-url>
cd brainly-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the codebase |

---

## 🧩 Components

### `Button`
> `src/component/ui/Button.tsx`

A flexible button supporting two visual variants and three sizes, with optional leading/trailing icons.

```tsx
import { Button } from "./component/ui/Button";
import { PlusIcon } from "../icon/plusicon";

<Button
  variant="primary"
  size="md"
  text="Add Content"
  startIcon={<PlusIcon />}
  onClick={() => console.log("clicked")}
/>
```

### `Card`
> `src/component/ui/Card.tsx`

Displays a saved content card. Automatically renders a YouTube iframe or a Twitter embed based on the `type` prop.

```tsx
import { Card } from "./component/ui/Card";

<Card type="youtube" link="https://youtu.be/..." title="React Crash Course" />
<Card type="tweeter" link="https://x.com/..." title="Interesting Thread" />
```

### Icons
> `icon/`

All icons accept an optional `size` prop (`"sm" | "md" | "lg"`).

```tsx
import { PlusIcon } from "./icon/plusicon";
import { ShareIcon } from "./icon/shareicon";
import { DeleteIcon } from "./icon/deleteicon";
import { YoutubeIcon } from "./icon/youtubeIcon";

<PlusIcon size="lg" />
```

---

## 🗺️ Roadmap

- [ ] **Dashboard layout** — responsive grid of Cards
- [ ] **Sidebar** — filter by content type (All / YouTube / Twitter)
- [ ] **Add Content Modal** — form to add YouTube & Twitter links
- [ ] **Share Brain** — generate a shareable, read-only link
- [ ] **Backend API** — Node.js/Express + MongoDB (separate repo)
- [ ] **Authentication** — JWT-based login & signup
- [ ] **Search & Filter** — search saved content by title/tag
- [ ] **Tagging System** — categorize and organize saved content

---

## 📄 License

This project is for educational purposes as part of a full-stack development course (Week 15).

---

> 🚧 **This project is under active development.** More features and documentation will be added as development progresses.
