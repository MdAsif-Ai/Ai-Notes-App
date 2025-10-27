# 🔐 Authentication & User Profile Guide

## Overview

The AI Knowledge Management platform now includes a complete authentication system with user profiles, login/register functionality, and personalized account management.

## ✨ Features

### 1. **User Authentication**
- **Login System**: Secure login with email/password
- **Registration**: Create new accounts with role selection
- **Logout**: Sign out functionality with data persistence
- **Session Management**: Automatic login on return visits

### 2. **User Profile Page**
- **Profile Overview**: Avatar, name, email, role, join date
- **User Statistics**: Documents, insights, nodes, activity hours
- **Three Main Tabs**:
  - **Account**: Edit profile, change password, security settings
  - **Activity**: Recent actions and uploads history
  - **Settings**: Notifications, preferences, theme options

### 3. **Profile Dropdown**
Located in the top-right corner with:
- User avatar with gradient background
- Quick access to profile page
- Settings shortcut
- Logout button

## 🚀 How to Use

### **For First-Time Users**

1. **Click "Login" button** in the top-right corner
2. **Switch to "Register" tab**
3. Fill in:
   - Full Name
   - Email
   - Password
   - Role (Executive, Analyst, Developer, Researcher)
4. **Click "Create Account"**
5. You'll be automatically logged in!

### **For Returning Users**

1. **Click "Login" button**
2. Enter your **email** and **password**
3. **Click "Sign In"**

### **Demo Accounts**

Three demo accounts are pre-created for testing:

| Name | Email | Role |
|------|-------|------|
| Sarah Johnson | sarah@example.com | Executive |
| Michael Chen | michael@example.com | Analyst |
| Alex Rivera | alex@example.com | Developer |

**Note**: Any password works for demo accounts (this is for demonstration only)

## 📋 Profile Features

### **Profile Overview Section**
- **Avatar**: Displays user initials with gradient background
- **Upload Avatar**: Click the upload button on avatar (future feature)
- **User Stats Cards**:
  - 📄 Total Documents Uploaded
  - 📈 Insights Generated
  - 🏆 Knowledge Nodes Created
  - ⏱️ Hours Active

### **Account Tab**
Edit your profile information:
- ✏️ **Full Name**
- ✉️ **Email Address**
- 👤 **Role** (Executive/Analyst/Developer/Researcher)
- 🔒 **Password Change** (coming soon)

**Actions**:
- Click "Edit Profile" to enable editing
- Make changes
- Click "Save Changes"
- Or "Cancel" to discard

### **Activity Tab**
View recent actions:
- 📤 File uploads
- 💡 AI insights generated
- 🔗 Knowledge nodes added
- ⚠️ Contradictions detected

Each activity shows:
- Icon with color-coded background
- Action description
- Timestamp

### **Settings Tab**

**Notifications**:
- ✉️ Email Notifications
- 🔔 Push Notifications
- 📧 Weekly Digest

**Preferences**:
- ⚙️ Auto Processing (automatically process uploads)
- 🎨 Dark Mode (theme toggle)

All settings update instantly with toast notifications!

## 🎨 Design Features

### **Authentication Modal**
- **Smooth Animations**: Slide-up transitions
- **Tabbed Interface**: Easy switch between Login/Register
- **Icon Integration**: Visual cues for input fields
- **Gradient Branding**: Sparkles icon with blue-purple gradient
- **Responsive**: Works on all screen sizes

### **Profile Page**
- **Animated Cards**: Hover effects and transitions
- **Gradient Avatars**: Beautiful color backgrounds for initials
- **Statistics Dashboard**: Quick overview of user activity
- **Color-Coded Activities**: Different colors for different action types
- **Interactive Toggles**: Smooth switch animations

### **Profile Dropdown**
- **Hover Effects**: Scale animation on hover
- **Border Animation**: Avatar border changes on hover
- **Clean Layout**: Well-organized menu items
- **Visual Feedback**: Different colors for logout action

## 💾 Data Storage

All user data is stored in **localStorage**:

- `users`: Array of all registered users
- `currentUser`: Currently logged-in user object
- `hasSeenWelcome`: Whether user has seen welcome modal

**User Object Structure**:
```javascript
{
  id: "user-1234567890",
  name: "John Doe",
  email: "john@example.com",
  role: "analyst",
  avatar: "url-to-image", // optional
  joinedDate: "2024-10-26T00:00:00.000Z"
}
```

## 🔄 User Flow

### **New User Registration**
```
Click Login → Register Tab → Fill Form → Create Account
    ↓
Auto Login → Welcome Modal (first time) → Dashboard
```

### **Returning User Login**
```
Click Login → Enter Credentials → Sign In
    ↓
Load Profile → Redirect to Dashboard
```

### **Profile Management**
```
Click Avatar Dropdown → My Profile → Edit Information
    ↓
Make Changes → Save → Update Stored Data
```

### **Logout**
```
Click Avatar Dropdown → Logout
    ↓
Clear Current User → Return to Dashboard → Show Login Button
```

## 🎯 Integration with Other Features

### **Persona-Based AI Insights**
The user's **role** is used in the AI Insights page to:
- Customize response style
- Filter relevant information
- Prioritize content based on role

**Roles**:
- **Executive**: High-level summaries, strategic insights
- **Analyst**: Data-driven analysis, detailed metrics
- **Developer**: Technical details, implementation notes
- **Researcher**: In-depth analysis, source citations

### **Personalized Dashboard**
Future features will include:
- Role-specific widgets
- Personalized recommendations
- Custom dashboard layouts
- Team collaboration based on user role

## 🔒 Security Notes

**Current Implementation**:
- ✅ Client-side authentication (demo purposes)
- ✅ Data stored in localStorage
- ✅ Session persistence
- ⚠️ **Not production-ready** - no server-side validation

**For Production**:
You would need to integrate:
- Backend API (Supabase, Firebase, custom server)
- Encrypted password storage
- JWT tokens or session cookies
- Email verification
- Password reset functionality
- Two-factor authentication (2FA)

## 📱 Responsive Design

The authentication system works seamlessly across devices:

- **Desktop**: Full profile layout with all features
- **Tablet**: Adjusted grid layouts, collapsible sections
- **Mobile**: Stacked layouts, bottom navigation ready

## 🎨 Customization

### **Colors**
Profile uses gradient themes:
- **Blue-Purple**: Main branding, avatars
- **Green**: Success states, positive trends
- **Orange**: Warnings, pending actions
- **Red**: Errors, logout

### **Animations**
- **Card Hover**: Lift effect with shadow
- **Button Hover**: Scale transform (105%)
- **Avatar Hover**: Border glow animation
- **Switch Toggle**: Smooth transition

## 🚀 Next Steps

Future enhancements:
1. **Backend Integration**: Connect to Supabase/Firebase
2. **Avatar Upload**: Allow users to upload profile pictures
3. **Team Management**: Invite team members, roles, permissions
4. **Activity Feed**: Real-time activity updates
5. **Notifications Center**: Detailed notification preferences
6. **Social Login**: Google, GitHub, Microsoft authentication
7. **Email Verification**: Verify email on registration
8. **Password Reset**: Forgot password flow
9. **Profile Completion**: Onboarding checklist
10. **Export Data**: Download user data and activity

## 📝 Testing Checklist

- [ ] Register new account
- [ ] Login with existing account
- [ ] Edit profile information
- [ ] View activity history
- [ ] Toggle notification settings
- [ ] Toggle preferences
- [ ] Navigate via profile dropdown
- [ ] Logout and verify session cleared
- [ ] Login again and verify session restored
- [ ] Test on mobile/tablet views

## 💡 Tips

1. **Use demo accounts** for quick testing
2. **Check browser console** for setup messages
3. **Clear localStorage** to reset all data: `localStorage.clear()`
4. **Profile is accessible** from top-right dropdown OR sidebar (if added)
5. **All changes persist** across page refreshes
6. **Toast notifications** show feedback for all actions

## 🐛 Troubleshooting

**Can't login?**
- Check if users exist: `console.log(localStorage.getItem('users'))`
- Try demo accounts first
- Clear localStorage and reload

**Profile not showing?**
- Ensure you're logged in
- Check currentUser: `console.log(localStorage.getItem('currentUser'))`

**Settings not saving?**
- Check browser console for errors
- Verify localStorage is enabled
- Try refreshing the page

---

**Enjoy your personalized AI Knowledge Management experience!** 🎉
