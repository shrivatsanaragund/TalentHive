import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Jobs from "./pages/jobs/Jobs";
import Job from "./pages/job/Job";
import Orders from "./pages/orders/Orders";
import "./App.scss";
import Footer from './components/footer/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import Messages from './pages/messages/Messages';
import MyJobs from './pages/myJobs/MyJobs';
import MyJob from './pages/myJob/MyJob';
import Add from './pages/add/Add';
import Success from './pages/success/Success';
import Pay from "./pages/pay/Pay";
import Message from './pages/message/Message';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Admin from './pages/admin/Admin';
import { IndexProvider } from './context/currentIndexCon';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EditJob from './pages/editJob/EditJob';


function App() {
  const { t, i18n } = useTranslation();
  const queryClient = new QueryClient();

  const Layout = () => {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <IndexProvider>
            <Navbar />
            <Outlet />
            <Footer />
          </IndexProvider>
        </QueryClientProvider>
      </div>
    );
  };
    
  return (
    
    <Router>
      <Suspense fallback="..Loading">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login t={t} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/job/:id" element={<Job />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/message/:id" element={<Message />} />
            <Route path="/myJob" element={<MyJob />} />
            <Route path="/myJobs" element={<MyJobs />} />
            <Route path="/add" element={<Add />} />
            <Route path="/pay/:id" element={<Pay />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/success" element={<Success />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/editJob/:id" element={<EditJob />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;