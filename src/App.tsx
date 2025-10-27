/**
 * Main Application Component
 * Handles routing, layout, and navigation for the AI Knowledge Management platform
 * Features: Smooth animations, responsive design, real-time updates
 */
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Network,
  Upload,
  Lightbulb,
  BarChart3,
  Settings,
  Search,
  Bell,
  User,
  AlertCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Dashboard from "./components/Dashboard";
import KnowledgeGraph from "./components/KnowledgeGraph";
import UploadSources from "./components/UploadSources";
import AIInsights from "./components/AIInsights";
import Analytics from "./components/Analytics";
import SettingsPage from "./components/SettingsPage";
import WelcomeModal from "./components/WelcomeModal";
import TooltipWrapper from "./components/TooltipWrapper";
import AuthModal from "./components/AuthModal";
import { useAuth } from "./components/FirebaseAuth";
import UserProfile from "./components/UserProfile";
import ProfileModal from "./components/ProfileModal";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Badge } from "./components/ui/badge";
import { Toaster } from "./components/ui/sonner";
import { setupDemoUsers } from "./components/DemoUserSetup";

type Page =
  | "dashboard"
  | "upload-sources"
  | "knowledge-graph"
  | "ai-insights"
  | "analytics"
  | "settings"
  | "profile";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinedDate: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [aiQuery, setAiQuery] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    // Setup demo users for testing
    setupDemoUsers();

    // Check if user is already logged in
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    // Show welcome modal on first visit (only if logged in)
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome && storedUser) {
      setShowWelcome(true);
    }

    // Close sidebar on mobile by default
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync with Firebase auth when available
  const { user: firebaseUser, signOut: firebaseSignOut } = useAuth();

  useEffect(() => {
    if (firebaseUser) {
      const mapped: UserData = {
        id: firebaseUser.uid,
        name:
          firebaseUser.displayName ||
          firebaseUser.email?.split("@")[0] ||
          "User",
        email: firebaseUser.email || "",
        role: "analyst",
        avatar: firebaseUser.photoURL || undefined,
        joinedDate:
          firebaseUser.metadata?.creationTime || new Date().toISOString(),
      };
      setCurrentUser(mapped);
      localStorage.setItem("currentUser", JSON.stringify(mapped));
    } else {
      // if firebase user signs out, clear currentUser and local storage so app shows logged-out state
      setCurrentUser(null);
      try {
        localStorage.removeItem("currentUser");
      } catch {
        // ignore
      }
    }
  }, [firebaseUser]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem("hasSeenWelcome", "true");
  };

  const handleLogin = (user: UserData) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    // sign out from Firebase if possible, then clear local app state
    firebaseSignOut()
      .catch(() => {
        // ignore errors; still clear local state
      })
      .finally(() => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
        setCurrentPage("dashboard");
      });
  };

  const handleUpdateProfile = (updates: Partial<UserData>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // Update in users array
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex(
        (u: UserData) => u.id === currentUser.id
      );
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
      }
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "upload-sources", name: "Upload Sources", icon: Upload },
    { id: "knowledge-graph", name: "Knowledge Graph", icon: Network },
    { id: "ai-insights", name: "AI Insights", icon: Lightbulb },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard onNavigate={setCurrentPage} currentUser={currentUser} />
        );
      case "upload-sources":
        return <UploadSources />;
      case "knowledge-graph":
        return <KnowledgeGraph />;
      case "ai-insights":
        return <AIInsights />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <SettingsPage />;
      case "profile":
        return currentUser ? (
          <UserProfile
            user={currentUser}
            onLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
          />
        ) : (
          <Dashboard onNavigate={setCurrentPage} currentUser={currentUser} />
        );
      default:
        return (
          <Dashboard onNavigate={setCurrentPage} currentUser={currentUser} />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 animate-fade-in">
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      {/* Welcome Modal */}
      <WelcomeModal open={showWelcome} onClose={handleCloseWelcome} />

      {/* Auth Modal */}
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
      {/* Profile Modal (opens when user selects View profile) */}
      <ProfileModal
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onNavigateToProfile={() => {
          setCurrentPage("profile");
          setShowProfileModal(false);
        }}
      />

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        ${sidebarCollapsed ? "w-20" : "w-64"} 
        bg-white border-r border-gray-200 flex flex-col 
        transition-all-smooth shadow-lg fixed md:relative h-full z-50
      `}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="animate-fade-in">
                <h1 className="text-blue-600">AI Knowledge Hub</h1>
                <p className="text-gray-500 text-sm mt-1">
                  Meeting Intelligence
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const button = (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id as Page)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                  transition-all-smooth group
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:scale-[1.02]"
                  }
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Icon
                  className={`
                  w-5 h-5 transition-transform
                  ${isActive ? "animate-node-pulse" : "group-hover:scale-110"}
                `}
                />
                {!sidebarCollapsed && (
                  <span className="animate-fade-in">{item.name}</span>
                )}
              </button>
            );

            return sidebarCollapsed ? (
              <TooltipWrapper key={item.id} content={item.name} side="right">
                {button}
              </TooltipWrapper>
            ) : (
              button
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:scale-110 transition-transform"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>

            {/* AI Query Input */}
            <div className="flex-1 max-w-2xl relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <Input
                type="text"
                placeholder="Ask AI anything about your knowledge base..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="pl-10 pr-4 transition-all-smooth focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:scale-110 transition-transform"
                  >
                    <Bell className="w-5 h-5" />
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 animate-pulse">
                      3
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="focus:bg-orange-50">
                    <div className="flex gap-2 w-full">
                      <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1 flex-1">
                        <p className="text-sm">
                          Contradiction detected in Q4 budget
                        </p>
                        <p className="text-xs text-gray-500">5 minutes ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-blue-50">
                    <div className="flex gap-2 w-full">
                      <Network className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1 flex-1">
                        <p className="text-sm">
                          Knowledge graph updated: 8 new connections
                        </p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-yellow-50">
                    <div className="flex gap-2 w-full">
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1 flex-1">
                        <p className="text-sm">
                          Redundant topics found in 3 documents
                        </p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile */}
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 hover:scale-105 transition-transform group"
                    >
                      <Avatar className="w-8 h-8 border-2 border-transparent group-hover:border-blue-500 transition-all">
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                          {getInitials(currentUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm hidden md:inline">
                        {currentUser.name}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <div className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={currentUser.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                            {getInitials(currentUser.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {currentUser.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {currentUser.email}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => setShowProfileModal(true)}
                          className="w-full text-sm"
                        >
                          View profile
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage("settings")}
                          className="w-full text-sm"
                        >
                          Settings
                        </Button>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1">
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="hover:scale-105 transition-transform"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
              {/* Quick logout button for mobile / quick access */}
              {currentUser && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="md:hidden ml-1 hover:scale-105 transition-transform"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5 text-red-600" />
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{renderPage()}</main>
      </div>
    </div>
  );
}
