
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Moon, Sun, User, ChevronDown, Home, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@/context/NavigationContext';
import { useSidebar } from '@/context/SidebarContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface UniversalHeaderProps {
  variant?: 'protected' | 'public';
}

const UniversalHeader: React.FC<UniversalHeaderProps> = ({ variant = 'public' }) => {
  const { theme, setTheme, isDark } = useTheme();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { notifications } = useNavigation();
  const { setIsMobileOpen } = useSidebar();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/auth/login');
  };

  const handleSignUp = () => {
    navigate('/auth/signup');
  };

  const handleMobileMenuToggle = () => {
    if (isMobile && isAuthenticated) {
      setIsMobileOpen(true);
    }
  };

  // For protected variant, only show protected content if user is authenticated
  const showProtectedContent = variant === 'protected' && isAuthenticated;
  // For public variant, always show public content
  const showPublicContent = variant === 'public';

  console.log('UniversalHeader render:', { variant, isAuthenticated, user, showProtectedContent });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left Section - Logo + Mobile Menu */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button - Only show when authenticated and on mobile */}
          {showProtectedContent && isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMobileMenuToggle}
              className="h-10 w-10 px-0 hover:bg-accent/50 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-roomly-primary to-roomly-secondary flex items-center justify-center shadow-lg">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-roomly-accent rounded-full opacity-80"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-roomly-primary to-roomly-secondary bg-clip-text text-transparent leading-tight">
                Roomly
              </h1>
              {showPublicContent && (
                <span className="text-xs text-muted-foreground leading-none hidden sm:block">
                  Your Home, Organized
                </span>
              )}
              {showProtectedContent && user?.householdId && (
                <span className="text-xs text-muted-foreground leading-none hidden sm:block">
                  Household
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {showProtectedContent ? (
            <>
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-10 w-10 px-0 hover:bg-accent/50 transition-colors"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 w-10 px-0 relative hover:bg-accent/50 transition-colors"
                aria-label={`${notifications} notifications`}
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-medium"
                  >
                    {notifications > 9 ? '9+' : notifications}
                  </Badge>
                )}
              </Button>

              {/* User Avatar with Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="h-10 px-3 space-x-2 hover:bg-accent/50 transition-colors"
                    disabled={isLoading}
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarImage 
                        src={user?.avatar} 
                        alt={user?.name || 'User avatar'} 
                      />
                      <AvatarFallback className="text-sm bg-gradient-to-br from-roomly-primary to-roomly-secondary text-white">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    {!isLoading && <ChevronDown className="h-4 w-4 opacity-50" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Theme Toggle (always available) */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-10 w-10 px-0 hover:bg-accent/50 transition-colors"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Public Route Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignIn}
                  className="h-10 px-4 hover:bg-accent/50 transition-colors"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={handleSignUp}
                  className="h-10 px-4 bg-gradient-to-r from-roomly-primary to-roomly-secondary hover:opacity-90 transition-opacity shadow-md"
                >
                  Sign Up
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default UniversalHeader;
