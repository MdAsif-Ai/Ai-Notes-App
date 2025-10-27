# 🏗️ System Architecture

Technical architecture and component structure of the AI Knowledge Management Platform.

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    AI Knowledge Hub                          │
│                  (React Application)                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     Auth     │  │  Knowledge   │  │      AI      │     │
│  │   System     │  │  Management  │  │   Insights   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Profile    │  │  Analytics   │  │   Storage    │     │
│  │  Management  │  │   Engine     │  │   Layer      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🗂️ Component Hierarchy

### App Structure
```
App.tsx (Root)
├── AuthModal
├── WelcomeModal
├── Toaster (Notifications)
├── Sidebar Navigation
│   ├── Logo
│   ├── Navigation Items
│   └── User Info (if collapsed)
└── Main Content Area
    ├── Header
    │   ├── AI Search Bar
    │   ├── Notifications Dropdown
    │   └── User Profile Dropdown
    └── Page Router
        ├── Dashboard
        ├── UploadSources
        ├── KnowledgeGraph
        ├── AIInsights
        ├── Analytics
        ├── SettingsPage
        └── UserProfile
```

## 📦 Module Breakdown

### 1. Authentication Module

**Components:**
- `AuthModal.tsx` - Login/Register interface
- `DemoUserSetup.tsx` - Demo user initialization

**Responsibilities:**
- User registration
- User login
- Session management
- Demo account setup

**Data Flow:**
```
User Input → Validation → localStorage → State Update → UI Update
```

**localStorage Schema:**
```javascript
{
  users: [
    {
      id: string,
      name: string,
      email: string,
      role: string,
      avatar?: string,
      joinedDate: string
    }
  ],
  currentUser: UserObject | null
}
```

### 2. Profile Management Module

**Components:**
- `UserProfile.tsx` - Main profile page
- `Avatar` (ShadCN) - User avatar display
- `Tabs` (ShadCN) - Profile tabs

**Features:**
- Profile overview
- Account editing
- Activity history
- Settings management

**State Management:**
```javascript
{
  isEditing: boolean,
  editedName: string,
  editedEmail: string,
  editedRole: string,
  settings: {
    emailNotifications: boolean,
    pushNotifications: boolean,
    weeklyDigest: boolean,
    autoProcessing: boolean,
    darkMode: boolean
  }
}
```

### 3. Dashboard Module

**Components:**
- `Dashboard.tsx` - Main dashboard
- `StatsCard.tsx` - Statistics cards
- `AnimatedCard.tsx` - Enhanced cards
- `ProcessingStatus.tsx` - Processing widget
- `RealTimeUpdates.tsx` - Updates feed

**Data Sources:**
- Mock statistics
- Mock recent activities
- Mock alerts
- Mock action items

**Layout Grid:**
```
┌─────────┬─────────┬─────────┬─────────┐
│ Stat 1  │ Stat 2  │ Stat 3  │ Stat 4  │
├─────────┴─────────┴─────────┴─────────┤
│          Processing Status             │
├────────────────────┬───────────────────┤
│   Real-time        │  Quick            │
│   Updates          │  Actions          │
├────────────────────┼───────────────────┤
│                    │  Action           │
│   Alerts           │  Items            │
└────────────────────┴───────────────────┘
```

### 4. Upload Module

**Components:**
- `UploadSources.tsx` - Upload interface
- Tabs (Documents, Audio, Video, Text)

**Upload Flow:**
```
File Selection
    ↓
Validation (type, size)
    ↓
Add to State
    ↓
Show in List
    ↓
Multi-stage Processing
    ↓
Update Knowledge Graph
```

**Processing Stages:**
1. Uploading (file transfer)
2. Extracting (text extraction)
3. Analyzing (entity detection)
4. Building (graph creation)
5. Complete (ready for use)

### 5. Knowledge Graph Module

**Components:**
- `KnowledgeGraph.tsx` - Graph visualization
- Canvas API - Rendering engine

**Node Types:**
```javascript
{
  people: { color: '#22c55e', icon: '👤' },
  topics: { color: '#3b82f6', icon: '💬' },
  documents: { color: '#f59e0b', icon: '📄' },
  actions: { color: '#8b5cf6', icon: '✓' },
  concepts: { color: '#06b6d4', icon: '💡' },
  contradictions: { color: '#ef4444', icon: '⚠️' }
}
```

**Rendering Logic:**
```
Calculate Node Positions (circular layout)
    ↓
Draw Connection Lines
    ↓
Draw Nodes (circles with labels)
    ↓
Draw Contradiction Badges (if enabled)
    ↓
Handle Click Events
```

### 6. AI Insights Module

**Components:**
- `AIInsights.tsx` - Query interface

**Personas:**
```javascript
{
  executive: {
    icon: '👔',
    focus: 'Strategic',
    style: 'High-level summaries'
  },
  analyst: {
    icon: '📊',
    focus: 'Data-Driven',
    style: 'Detailed analysis'
  },
  developer: {
    icon: '💻',
    focus: 'Technical',
    style: 'Implementation details'
  }
}
```

**Query Flow:**
```
User Query
    ↓
Persona Selection
    ↓
Mock AI Processing
    ↓
Generate Response (adapted to persona)
    ↓
Show Sources
    ↓
Suggest Follow-ups
```

### 7. Analytics Module

**Components:**
- `Analytics.tsx` - Charts dashboard
- Recharts library - Visualization

**Chart Types:**
- Bar Chart (Sentiment trends)
- Horizontal Bar (Engagement)
- Pie Chart (Topic distribution)
- Line Chart (Action items)

**Data Structure:**
```javascript
{
  sentimentData: Array<{month, positive, neutral, negative}>,
  engagementData: Array<{name, value}>,
  topicData: Array<{name, value}>,
  actionData: Array<{week, completed, pending}>
}
```

## 🔄 Data Flow Architecture

### User Authentication Flow
```
┌─────────────┐
│  User Input │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│   Validation    │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐      ┌──────────────┐
│  localStorage   │◄────►│  App State   │
└──────┬──────────┘      └──────┬───────┘
       │                        │
       ▼                        ▼
┌─────────────────┐      ┌──────────────┐
│  Persist Data   │      │  Update UI   │
└─────────────────┘      └──────────────┘
```

### File Upload Flow
```
User Selects File
    ↓
File Validation
    ↓
Add to Upload Queue
    ↓
┌──────────────────────┐
│  Multi-stage Process │
├──────────────────────┤
│ 1. Upload            │
│ 2. Extract           │
│ 3. Analyze           │
│ 4. Build Graph       │
│ 5. Complete          │
└──────────────────────┘
    ↓
Update State
    ↓
Refresh Knowledge Graph
```

### AI Query Flow
```
User Query + Persona
    ↓
Process Query
    ↓
┌──────────────────────┐
│   AI Processing      │
├──────────────────────┤
│ • Semantic Search    │
│ • Entity Extraction  │
│ • Relationship Map   │
│ • Response Gen       │
└──────────────────────┘
    ↓
Format for Persona
    ↓
Display Results
    ↓
Show Sources
```

## 🎨 Design System Architecture

### Component Library Structure
```
/components
├── Core Pages
│   ├── Dashboard.tsx
│   ├── UploadSources.tsx
│   ├── KnowledgeGraph.tsx
│   ├── AIInsights.tsx
│   ├── Analytics.tsx
│   ├── SettingsPage.tsx
│   └── UserProfile.tsx
│
├── Authentication
│   ├── AuthModal.tsx
│   └── DemoUserSetup.tsx
│
├── Shared Components
│   ├── AnimatedCard.tsx
│   ├── StatsCard.tsx
│   ├── ProcessingStatus.tsx
│   ├── RealTimeUpdates.tsx
│   ├── WelcomeModal.tsx
│   └── TooltipWrapper.tsx
│
└── UI Library (ShadCN)
    └── /ui (50+ components)
```

### Styling Architecture
```
/styles
└── globals.css
    ├── CSS Variables (tokens)
    ├── Base Styles
    ├── Typography
    ├── Custom Animations
    ├── Utility Classes
    └── Component Overrides
```

### Animation System
```
Custom Keyframes
├── @keyframes shimmer
├── @keyframes pulse-glow
├── @keyframes slide-up
├── @keyframes fade-in
└── @keyframes node-pulse

Utility Classes
├── .animate-shimmer
├── .animate-pulse-glow
├── .animate-slide-up
├── .animate-fade-in
├── .animate-node-pulse
├── .transition-all-smooth
└── .card-hover
```

## 🔧 State Management

### Local State (useState)
```javascript
// Component-level state
- currentPage: Page
- aiQuery: string
- showWelcome: boolean
- showAuthModal: boolean
- currentUser: UserData | null
- dragActive: boolean
- selectedNode: Node | null
- selectedPersona: string
```

### Persistent State (localStorage)
```javascript
// Persisted across sessions
- users: UserData[]
- currentUser: UserData
- hasSeenWelcome: boolean
- userSettings: SettingsObject
```

### Future: Context API Structure
```
AppContext
├── AuthContext
│   ├── currentUser
│   ├── login()
│   ├── logout()
│   └── updateProfile()
│
├── DataContext
│   ├── documents
│   ├── knowledgeGraph
│   ├── insights
│   └── analytics
│
└── UIContext
    ├── theme
    ├── sidebar
    └── modals
```

## 🛡️ Security Architecture

### Current (Client-Side)
```
User Input
    ↓
Basic Validation
    ↓
localStorage (unencrypted)
    ↓
State Management
```

### Future (Production)
```
User Input
    ↓
Client Validation
    ↓
HTTPS Request
    ↓
Server Validation
    ↓
Authentication (JWT)
    ↓
Authorization Check
    ↓
Database (encrypted)
    ↓
Response (sanitized)
    ↓
Client State Update
```

## 📱 Responsive Architecture

### Breakpoints
```css
/* Mobile First */
- Base: 0px (mobile)
- sm: 640px
- md: 768px (tablet)
- lg: 1024px (desktop)
- xl: 1280px
- 2xl: 1536px
```

### Layout Strategy
```
Mobile (<768px)
└── Single column
    └── Stacked components

Tablet (768-1023px)
└── Two columns (flexible)
    └── Grid layouts

Desktop (1024px+)
└── Sidebar + Content
    └── Multi-column grids
```

## 🔌 Integration Points

### Current (Mock)
```
Frontend ─── Mock Data ─── UI Components
```

### Future (Backend)
```
Frontend
    ↓
API Layer
    ├── REST Endpoints
    ├── WebSocket (real-time)
    └── GraphQL (optional)
    ↓
Backend Services
    ├── Authentication Service
    ├── File Processing Service
    ├── AI/ML Service
    ├── Knowledge Graph Service
    └── Analytics Service
    ↓
Data Stores
    ├── PostgreSQL (user data)
    ├── Vector DB (embeddings)
    ├── Graph DB (relationships)
    └── Object Storage (files)
```

## 📊 Performance Optimization

### Current Optimizations
- Component-level state
- Conditional rendering
- Event delegation
- Debounced inputs
- Lazy loading ready

### Future Optimizations
- Code splitting
- Tree shaking
- Image lazy loading
- Virtual scrolling
- Service workers
- Edge caching

## 🧪 Testing Architecture

### Test Pyramid
```
        ╱───────╲
       ╱  E2E    ╲
      ╱───────────╲
     ╱ Integration ╲
    ╱───────────────╲
   ╱   Unit Tests    ╲
  ╱─────────────────── ╲
```

### Test Coverage Goals
- Unit Tests: 80%+
- Integration Tests: 60%+
- E2E Tests: Critical paths

## 📖 Documentation Structure

```
/docs
├── README.md (Overview)
├── AUTH_GUIDE.md (Authentication)
├── QUICK_START.md (Getting Started)
├── FEATURES_OVERVIEW.md (Visual Guide)
├── ARCHITECTURE.md (This file)
├── TESTING_GUIDE.md (Test Checklist)
└── CHANGELOG.md (Version History)
```

---

## 🚀 Deployment Architecture

### Build Process
```
Source Code
    ↓
TypeScript Compilation
    ↓
Tailwind CSS Processing
    ↓
Bundle Optimization
    ↓
Asset Minification
    ↓
Production Build
```

### Deployment Options
```
Option 1: Vercel
├── Automatic deployment
├── Edge network
├── Serverless functions
└── Analytics

Option 2: Netlify
├── Continuous deployment
├── CDN distribution
├── Form handling
└── Split testing

Option 3: GitHub Pages
├── Static hosting
├── Custom domain
└── GitHub Actions
```

---

**This architecture supports:**
- ✅ Scalable component structure
- ✅ Clean separation of concerns
- ✅ Easy testing and maintenance
- ✅ Future backend integration
- ✅ Performance optimization
- ✅ Responsive design
- ✅ Accessibility standards

**Ready for production deployment with minimal changes!** 🎉
