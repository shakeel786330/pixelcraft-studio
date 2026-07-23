import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Footer, ProtectedRoute } from '@/components'
import { Home } from '@/pages/Home'
import { Services } from '@/pages/Services'
import { Portfolio } from '@/pages/Portfolio'
import { Pricing } from '@/pages/Pricing'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { ProjectRequest } from '@/pages/ProjectRequest'
import { AdminLogin } from '@/pages/admin/Login'
import { AdminDashboard } from '@/pages/admin/Dashboard'
import { AdminPortfolio } from '@/pages/admin/Portfolio'
import { AdminServices } from '@/pages/admin/Services'
import { AdminPricing } from '@/pages/admin/Pricing'
import { AdminTestimonials } from '@/pages/admin/Testimonials'
import { AdminMessages } from '@/pages/admin/Messages'
import { AdminRequests } from '@/pages/admin/Requests'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-20">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project-request" element={<ProjectRequest />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/portfolio"
              element={
                <ProtectedRoute>
                  <AdminPortfolio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services"
              element={
                <ProtectedRoute>
                  <AdminServices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pricing"
              element={
                <ProtectedRoute>
                  <AdminPricing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/testimonials"
              element={
                <ProtectedRoute>
                  <AdminTestimonials />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/messages"
              element={
                <ProtectedRoute>
                  <AdminMessages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/requests"
              element={
                <ProtectedRoute>
                  <AdminRequests />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
