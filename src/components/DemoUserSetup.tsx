/**
 * Demo User Setup
 * Creates demo users for testing if none exist
 */
export const setupDemoUsers = () => {
  const existingUsers = localStorage.getItem('users');
  
  if (!existingUsers || JSON.parse(existingUsers).length === 0) {
    const demoUsers = [
      {
        id: 'user-demo-1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        role: 'executive',
        joinedDate: '2024-01-15T00:00:00.000Z',
      },
      {
        id: 'user-demo-2',
        name: 'Michael Chen',
        email: 'michael@example.com',
        role: 'analyst',
        joinedDate: '2024-02-20T00:00:00.000Z',
      },
      {
        id: 'user-demo-3',
        name: 'Alex Rivera',
        email: 'alex@example.com',
        role: 'developer',
        joinedDate: '2024-03-10T00:00:00.000Z',
      },
    ];
    
    localStorage.setItem('users', JSON.stringify(demoUsers));
    console.log('✅ Demo users created! You can login with:');
    console.log('   - sarah@example.com');
    console.log('   - michael@example.com');
    console.log('   - alex@example.com');
  }
};
