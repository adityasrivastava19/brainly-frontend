# Brainly Frontend

> **Development In Progress** - This project is actively being built. Features, components, and APIs are subject to change.

A **second-brain web application** that lets users save, organize, search, and share content from YouTube and Twitter/X all in one place. Built with React, TypeScript, Vite, and TailwindCSS v4.

---

## Project Status

```
████████████████████████░░   ~88% Complete
```

| Area | Status |
|------|--------|
| Project Setup and Tooling | ✅ Done |
| Design Tokens and Theme | ✅ Done |
| Icon System | ✅ Done |
| Button Component | ✅ Done |
| Card Component YouTube + Twitter | ✅ Done |
| InputBox Component | ✅ Done |
| Dropbox Component | ✅ Done |
| CreateModal Component | ✅ Done |
| SideBar Component | ✅ Done |
| ErrorBoundary Component | ✅ Done |
| Layout / Dashboard Shell | ✅ Done |
| Authentication Signin / Signup pages | ✅ Done |
| Protected Route Guard | ✅ Done |
| React Router Integration | ✅ Done |
| Backend Integration (GET + POST content) | ✅ Done |
| Search Content | ✅ Done |
| Share Brain Feature | 🔲 Planned |

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI Framework |
| TypeScript | ~6.0 | Type Safety |
| Vite | 8 | Build Tool and Dev Server |
| TailwindCSS | v4 | Styling |
| React Router DOM | v7 | Client-side routing |
| React Hook Form | v7 | Form state management |

---

## Project Structure

```
brainly-frontend/
├── src/
│   ├── component/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── createModeal.tsx
│   │   │   ├── inputBox.tsx
│   │   │   ├── dropbox.tsx
│   │   │   ├── sideBar.tsx
│   │   │   └── protectedRRoute.tsx
│   │   └── ErrorBoundary.tsx
│   │
│   ├── icon/
│   │   ├── index.ts
│   │   ├── acadmicicon.tsx
│   │   ├── plusicon.tsx
│   │   ├── shareicon.tsx
│   │   ├── deleteicon.tsx
│   │   ├── crossicon.tsx
│   │   ├── tweetericon.tsx
│   │   └── youtubeIcon.tsx
│   │
│   ├── pages/
│   │   ├── dashboard.tsx
│   │   ├── signin.tsx
│   │   └── signup.tsx
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Architecture Diagrams

### 1. Application Routing

```mermaid
flowchart TD
    A([User visits app]) --> B{Has JWT token in localStorage?}
    B -- No --> C["/signin"]
    B -- Yes --> D{ProtectedRoute}
    D -- Passes --> E["/dashboard"]
    D -- Fails --> C
    C --> F[Signin Page]
    F --> G{Auth success?}
    G -- No --> F
    G -- Yes - store token --> E
    H["/signup"] --> I[Signup Page]
    I --> C
    E --> J[Dashboard]
```

---

### 2. Component Tree

```mermaid
graph TD
    App --> BrowserRouter
    BrowserRouter --> Routes

    Routes --> PR["ProtectedRoute JWT guard"]
    Routes --> Signin
    Routes --> Signup

    PR --> Dashboard

    Dashboard --> CreateModal
    Dashboard --> SideBar
    Dashboard --> SearchBar["Search Bar + Submit"]
    Dashboard --> CardGrid["Card Grid"]
    Dashboard --> Button_Share["Button Share Brain secondary"]
    Dashboard --> Button_Add["Button Add Content primary"]

    CreateModal --> CrossIcon
    CreateModal --> InputBox_Title["InputBox Title"]
    CreateModal --> Dropbox["Dropbox Type selector"]
    CreateModal --> InputBox_Link["InputBox Link"]
    CreateModal --> Button_Submit["Button Submit primary"]

    SideBar --> AcadmicIcon
    SideBar --> YoutubeIcon_SB["YoutubeIcon Videos nav"]
    SideBar --> TweeterIcon_SB["TweeterIcon Tweets nav"]
    SideBar --> Button_Logout["Button Logout variant"]

    CardGrid --> Card

    Card --> TypeIcon["YoutubeIcon or TweeterIcon"]
    Card --> ShareIcon_C["ShareIcon"]
    Card --> DeleteIcon_C["DeleteIcon"]
    Card --> Embed["iframe youtube or blockquote tweeter"]
```

---

### 3. Data Flow - Adding Content

```mermaid
sequenceDiagram
    participant User
    participant Dashboard
    participant CreateModal
    participant Backend
    participant CardGrid

    User->>Dashboard: Clicks Add Content button
    Dashboard->>CreateModal: open=true
    User->>CreateModal: Fills Title, selects Type, pastes Link
    User->>CreateModal: Clicks Submit
    CreateModal->>Dashboard: onAddCard(FormValues)
    Dashboard->>Backend: POST /api/v1/content with Bearer token
    alt Success
        Backend->>Dashboard: 201 returns saved content
        Dashboard->>CardGrid: setCards prev plus newCard
        CardGrid->>User: New Card rendered
        Dashboard->>CreateModal: onClose called open=false
    else Failure
        Backend->>Dashboard: error response
        Dashboard->>User: logs error to console
    end
```

---

### 4. Data Flow - Search Content

```mermaid
sequenceDiagram
    participant User
    participant Dashboard
    participant Backend

    User->>Dashboard: Types query and submits search form
    Dashboard->>Backend: GET /api/v1/search?q=query with Bearer token
    alt Results found
        Backend->>Dashboard: returns matching content array
        Dashboard->>User: Renders filtered Card grid
    else No results
        Backend->>Dashboard: empty array
        Dashboard->>User: Shows No content found message
    else Error
        Backend->>Dashboard: error response
        Dashboard->>User: Shows error message in red
    end
    Note over Dashboard: Clearing the input resets to full card grid
```

---

### 5. Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant SigninPage
    participant Backend
    participant LocalStorage
    participant Dashboard

    User->>SigninPage: Enters email and password
    SigninPage->>Backend: POST /api/v1/user/signin
    alt Success
        Backend->>SigninPage: returns token
        SigninPage->>LocalStorage: setItem token
        SigninPage->>Dashboard: navigate to /dashboard
    else Failure
        Backend->>SigninPage: 401 error
        SigninPage->>User: Show error message
    end

    Note over Dashboard: ProtectedRoute reads token on every navigation
```

---

### 6. Icon System

```mermaid
graph LR
    I["icon/index.ts - IconProps and IconSizeVariant"]

    I --> PI[PlusIcon]
    I --> SI[ShareIcon]
    I --> DI[DeleteIcon]
    I --> CI[CrossIcon]
    I --> TI[TweeterIcon]
    I --> YI[YoutubeIcon]
    I --> AI[AcadmicIcon]

    SV["size prop"]
    SV --> sm["sm - size-4 - 16px"]
    SV --> md["md - size-5 - 20px - default"]
    SV --> lg["lg - size-6 - 24px"]
```

---

### 7. Button Variants and Sizes

```mermaid
graph TD
    B["Button Component"]

    B --> V[variant]
    V --> V1["primary - bg-purple-600 white text"]
    V --> V2["secondary - bg-purple-300 purple-600 text"]
    V --> V3["logout - bg-red-600 white text"]

    B --> S[size]
    S --> S1["sm - py-1 px-2 text-sm"]
    S --> S2["md - py-1.5 px-3 text-md"]
    S --> S3["lg - py-4 px-6 text-xl"]
    S --> S4["login - full-width indigo-600"]

    B --> P[props]
    P --> P1["text string"]
    P --> P2["startIcon optional ReactElement"]
    P --> P3["endIcon optional ReactElement"]
    P --> P4["onClick optional function"]
    P --> P5["loading optional boolean disables button"]
    P --> P6["type optional button or submit"]
```

---

### 8. Full-Stack Architecture

```mermaid
graph TB
    subgraph Browser["Browser - Client"]
        direction TB
        App2["App.tsx - React Router"]
        Auth2["Auth Pages - Signin / Signup"]
        Dash2["Dashboard + Sidebar + Search"]
        Cards2["Card Grid"]
    end

    subgraph API["Backend API - localhost:3000"]
        direction TB
        AuthRoute["/api/v1/user/signin and /signup"]
        ContentRoute["/api/v1/content - GET POST DELETE"]
        SearchRoute["/api/v1/search?q=query"]
        ShareRoute["/api/v1/brain/share - Planned"]
    end

    subgraph DB["Database"]
        Mongo[(MongoDB)]
        UserCol["users collection"]
        ContentCol["content collection"]
    end

    Auth2 -->|POST credentials| AuthRoute
    AuthRoute -->|JWT token| Auth2
    Dash2 -->|Bearer token GET| ContentRoute
    Dash2 -->|Bearer token POST| ContentRoute
    Dash2 -->|Bearer token GET q=query| SearchRoute
    ContentRoute --> Mongo
    SearchRoute --> Mongo
    Mongo --> UserCol
    Mongo --> ContentCol
    ShareRoute --> Mongo
    App2 --> Auth2
    App2 --> Dash2
    Dash2 --> Cards2
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- Backend server running at `http://localhost:3000` (see backend repo)

### Install and Run

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
| npm run dev | Start the Vite dev server with HMR |
| npm run build | Type-check and build for production |
| npm run preview | Preview the production build locally |
| npm run lint | Run ESLint across the codebase |

---

## API Reference

The frontend communicates with a backend REST API. All protected endpoints require a `Bearer <token>` Authorization header.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/v1/user/signup` | No | Register a new user |
| POST | `/api/v1/user/signin` | No | Sign in, returns JWT token |
| GET | `/api/v1/content` | Yes | Fetch all saved content for the user |
| POST | `/api/v1/content` | Yes | Save a new content card |
| DELETE | `/api/v1/content` | Yes | Delete a content card |
| GET | `/api/v1/search?q=query` | Yes | Search content by title |
| POST | `/api/v1/brain/share` | Yes | *(Planned)* Generate shareable link |

---

## Components

### Button
> src/component/ui/Button.tsx

Flexible button with three visual variants, four size options, optional leading/trailing icons, and a loading state.

```tsx
<Button variant="primary" size="md" text="Add Content" startIcon={<PluseIcon />} onClick={() => setOpen(true)} />

// Loading state - disables click and shows 50% opacity
<Button variant="primary" size="login" text="Signing in..." loading={true} type="submit" />
```

### Card
> src/component/ui/Card.tsx

Displays a saved content card. Renders a YouTube iframe or Twitter blockquote based on the type prop. YouTube links in both youtu.be/ and watch?v= formats are supported.

```tsx
<Card type="youtube" link="https://youtu.be/..." title="React Crash Course" />
<Card type="tweeter" link="https://x.com/..." title="Interesting Thread" />
```

### CreateModal
> src/component/ui/createModeal.tsx

A centered overlay modal for adding new content. Accepts an `onAddCard` callback that POSTs to the backend and appends the returned card to the dashboard state on success.

```tsx
<CreateModal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  onAddCard={(card) => setCards(prev => [...prev, card])}
/>
```

### SideBar
> src/component/ui/sideBar.tsx

Fixed left sidebar with brand logo, navigation links (Videos, Tweets), and a Logout button that clears the JWT token and redirects to /signin.

### ProtectedRoute
> src/component/ui/protectedRRoute.tsx

React Router layout route that checks for a token in localStorage. Unauthenticated users are redirected to /signin.

```tsx
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

### Input
> src/component/ui/inputBox.tsx

A simple controlled text input field.

```tsx
<Input placeholder="Title" onchange={(e) => setTitle(e.target.value)} />
```

### Icons
> src/icon/

All icons accept an optional size prop: sm, md, or lg.

```tsx
import { AcadmicIcon } from "./icon/acadmicicon";
<AcadmicIcon size="lg" />
```

---

## Roadmap

- [x] Project setup - Vite + React + TypeScript + TailwindCSS v4
- [x] Icon system - AcadmicIcon, PlusIcon, ShareIcon, DeleteIcon, CrossIcon, TweeterIcon, YoutubeIcon
- [x] Button component - primary / secondary / logout variants, sm/md/lg/login sizes, loading state
- [x] Card component - YouTube iframe embed and Twitter blockquote embed
- [x] CreateModal - overlay modal with Title + Type + Link inputs
- [x] SideBar - fixed sidebar with Videos / Tweets nav and Logout
- [x] Dashboard layout - sidebar + content grid
- [x] Authentication pages - Signin and Signup with form validation
- [x] Protected routes - JWT token guard via React Router
- [x] React Router - /signin, /signup, /dashboard routes
- [x] Backend integration - GET and POST content via REST API with Bearer token auth
- [x] Search - filter saved content by title via `/api/v1/search`
- [ ] Share Brain - generate a shareable read-only link
- [ ] Delete content - wire delete button to `DELETE /api/v1/content`
- [ ] Backend API - Node.js/Express + MongoDB (separate repo)

---

## License

This project is for educational purposes as part of a full-stack development course (Week 15).

---

> This project is under active development. More features and documentation will be added as development progresses.
