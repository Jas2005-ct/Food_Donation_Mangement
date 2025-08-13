import React, { useEffect, useState } from 'react';

const DonorDashboard = () => (
  <div>
    <h2>Donor Dashboard</h2>
    <ul>
      <li>View donation history</li>
      <li>Make a new donation</li>
      <li>See impact statistics</li>
    </ul>
  </div>
);

const NGODashboard = () => (
  <div>
    <h2>NGO Dashboard</h2>
    <ul>
      <li>View food requests</li>
      <li>Create new request</li>
      <li>Track delivery status</li>
    </ul>
  </div>
);

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    const user_type = localStorage.getItem('user_type');

    if (email && user_type) {
      setUser({ email, user_type });
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {user.email}</h1>

      {user.user_type === 'donor' && <DonorDashboard />}
      {user.user_type === 'ngo' && <NGODashboard />}
      {!['donor', 'ngo'].includes(user.user_type) && (
        <p>Your user type is not recognized.</p>
      )}
    </div>
  );
};

export default Dashboard;
