import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/LoginF';
import Register from './components/Register';
import Layout  from './components/Layout';
import Donate from './components/Donate';
import DonorDashboard from './components/DonarDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import NGODashboard from './components/NGODashboard';
import Overview from './components/overview';

function App() {
  return (
    <Router>
      <Routes> 
       <Route path="/" element={<Layout><Welcome /></Layout>} />
        <Route path="/donate" element={<Layout><Donate /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/ngo-dashboard" element={<NGODashboard />} />
        <Route path="/Overview" element={<Overview />} />
        
        
        
      </Routes>
    </Router>
  );
}

export default App;
