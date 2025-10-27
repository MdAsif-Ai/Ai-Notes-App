# AI Knowledge Management Platform

A professional, modern web application for managing multi-source knowledge with AI-powered insights, real-time processing, interactive visualizations, and complete user authentication system.

> 🔐 **New!** Full authentication system with user profiles, login/register, and personalized settings. See [AUTH_GUIDE.md](./AUTH_GUIDE.md) for details.

## 🎨 Design Features

### Visual Design
- **Modern UI/UX**: Clean, minimalistic interface with professional aesthetics
- **Color Palette**: Soft blues, whites, grays with vibrant accent colors
- **Smooth Animations**: Micro-interactions, hover effects, and transitions throughout
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile
- **Glassmorphism Effects**: Modern glass-like UI elements
- **Gradient Backgrounds**: Dynamic gradient accents for visual interest

### Animation System
- **Custom CSS Animations**:
  - `shimmer`: Loading animations for processing states
  - `pulse-glow`: Glowing effects for active elements
  - `slide-up`: Smooth entry animations for cards
  - `fade-in`: Gentle opacity transitions
  - `node-pulse`: Pulsing effect for graph nodes

- **Interactive Hover States**:
  - Cards lift on hover with shadow effects
  - Buttons scale and transform
  - Icons animate on interaction
  - Smooth color transitions

### Component Library
- **AnimatedCard**: Enhanced cards with hover effects and glow options
- **StatsCard**: Gradient-styled statistics with trend indicators
- **ProcessingStatus**: Real-time AI processing feedback widget
- **RealTimeUpdates**: Live update feed with animations
- **WelcomeModal**: Interactive onboarding experience
- **TooltipWrapper**: Consistent tooltip styling
- **AuthModal**: Login/Register modal with tabbed interface
- **UserProfile**: Complete profile page with account management

## 🚀 Key Features

### 0. User Authentication & Profiles 🔐
- **Complete Auth System**: Login/Register with email
- **User Profiles**: Personalized dashboard with stats and activity
- **Role-Based Access**: Executive, Analyst, Developer, Researcher roles
- **Account Management**: Edit profile, change settings, view activity
- **Session Persistence**: Stay logged in across visits
- **Demo Accounts**: Pre-loaded test users for quick access

**Demo Login Credentials**:
- `sarah@example.com` (Executive)
- `michael@example.com` (Analyst)  
- `alex@example.com` (Developer)

📖 **[Read Full Authentication Guide](./AUTH_GUIDE.md)**

### 1. Multi-Source Upload
- **Supported Formats**:
  - Documents: PDF, Word, Excel, TXT
  - Images: JPG, PNG (with OCR support)
  - Audio: MP3, WAV, M4A (live recording + file upload)
  - Video: MP4, MOV, AVI + YouTube URL import
  - Other: Web links, email, chat transcripts

- **Upload Features**:
  - Drag-and-drop interface with visual feedback
  - Progress bars with multi-stage processing
  - File validation and size limits
  - Metadata input (title, description, tags, date, role)
  - Real-time status indicators

### 2. Knowledge Graph Visualization
- **Interactive Canvas**: HTML5 Canvas-based graph rendering
- **Node Types**: People, Topics, Documents, Actions, Concepts, Contradictions
- **Visual Features**:
  - Color-coded nodes by type
  - Connection lines showing relationships
  - Contradiction indicators with warning badges
  - AI-generated summaries on selection
  - Predicted next actions

- **Interactions**:
  - Click to select and view details
  - Zoom in/out controls
  - Node filtering by type
  - Search functionality
  - Toggle contradiction display
  - Auto-refresh for live updates

### 3. AI Insights & Semantic Search
- **Context-Aware Search**: Natural language queries across all sources
- **Persona-Based Responses**:
  - Executive: Strategic focus and high-level summaries
  - Analyst: Data-driven insights and metrics
  - Developer: Technical details and implementation notes

- **AI Features**:
  - Semantic search with relevance scoring
  - Suggested queries
  - Pattern analysis
  - Predicted follow-ups
  - Trend identification

### 4. Real-Time Processing
- **Multi-Stage Processing**:
  1. File upload
  2. Text extraction
  3. Entity analysis
  4. Relationship building
  5. Knowledge graph update

- **Status Notifications**:
  - Contradiction detection
  - Redundancy identification
  - Processing completion
  - Warning alerts

### 5. Analytics Dashboard
- **Visualizations**:
  - Sentiment trends (Bar charts)
  - Engagement metrics (Horizontal bar charts)
  - Topic distribution (Pie charts)
  - Action item tracking (Line charts)

- **Metrics**:
  - Sentiment analysis
  - Participation rates
  - Speaker influence
  - Topic trends
  - Productivity metrics

### 6. Dashboard Overview
- **Statistics Cards**: Animated cards showing:
  - Total documents
  - Knowledge nodes
  - AI insights generated
  - Processing queue

- **Real-Time Widgets**:
  - Processing status
  - Live updates feed
  - AI alerts
  - Recent activities
  - Action items
  - Storage usage

## 🎯 Design Principles

### Professional & Modern
- Clean typography with clear hierarchy
- Consistent spacing and alignment
- Professional color schemes
- Subtle shadows and depth

### Interactive & Engaging
- Hover effects on all interactive elements
- Smooth transitions between states
- Loading animations for feedback
- Micro-interactions for delight

### Accessible & Intuitive
- Clear visual hierarchy
- Keyboard navigation support
- Tooltips for guidance
- Color contrast compliance
- Responsive touch targets

### Performance-Optimized
- Efficient canvas rendering
- Optimized animations
- Lazy loading where appropriate
- Smooth 60fps transitions

## 🛠️ Technology Stack

### Frontend Framework
- **React 18**: Component-based architecture
- **TypeScript**: Type safety and better DX

### Styling & Design
- **Tailwind CSS v4**: Utility-first CSS framework
- **Custom CSS**: Advanced animations and effects
- **ShadCN UI**: Pre-built accessible components

### Visualizations
- **Recharts**: Chart library for analytics
- **HTML5 Canvas**: Custom knowledge graph rendering

### State Management
- **React Hooks**: useState, useEffect for local state
- **Context API Ready**: For global state when needed

## 📱 Responsive Design

### Desktop (1024px+)
- Full sidebar navigation
- Multi-column layouts
- Expanded cards and detailed views

### Tablet (768px - 1023px)
- Collapsible sidebar
- Flexible grid layouts
- Touch-optimized controls

### Mobile (< 768px)
- Bottom navigation (can be added)
- Single column layouts
- Mobile-optimized inputs

## 🎨 Color System

### Primary Colors
- **Blue**: #3B82F6 (Primary actions, links)
- **Purple**: #8B5CF6 (Secondary accents)
- **Green**: #10B981 (Success, positive trends)
- **Orange**: #F59E0B (Warnings, alerts)
- **Red**: #EF4444 (Errors, contradictions)

### Neutral Colors
- **Gray-50**: Background
- **Gray-100-200**: Cards, surfaces
- **Gray-600-900**: Text colors

### Gradients
- **Blue-Purple**: Headers, stats cards
- **Green-Teal**: Upload areas
- **Orange-Pink**: Knowledge graph
- **Purple-Indigo**: AI features

## 🔮 Future Enhancements

### Backend Integration
- **Supabase**: User authentication, database, storage
- **OpenAI API**: GPT-4 for insights and summaries
- **Vector Database**: Pinecone/Weaviate for semantic search
- **WebSockets**: Real-time collaboration

### Advanced Features
- **Multi-user Collaboration**: Real-time editing
- **Export Options**: PDF, DOCX, JSON
- **Advanced Filters**: Complex query building
- **Custom Dashboards**: User-configurable layouts
- **Mobile Apps**: Native iOS/Android versions

## 📄 License

This is a demonstration project showcasing modern web design and development practices.

## 🙏 Credits

Built with:
- React & TypeScript
- Tailwind CSS
- ShadCN UI Components
- Recharts
- Lucide Icons
