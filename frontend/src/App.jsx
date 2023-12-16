import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { HomePage } from "./pages/HomePage";
import { TravelFormPage } from "./pages/TravelFormPage";
import { TravelDetailPage } from "./pages/TravelDetailPage";
import { Profile } from "./pages/Profile";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { TravelProvider } from "./context/TravelContext";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import Notify from './components/Notify'

export const App = () => {
  return (
    <AuthProvider>
      <TravelProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/add-travel" element={<TravelFormPage />} />
              <Route path="/travel/:id" element={<TravelDetailPage />} />
              <Route path="/travel/:id" element={<TravelFormPage />} />
              <Route path="/edit-travel/:id" element={<TravelFormPage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
          <Footer />
          <Notify />
        </Router>
      </TravelProvider>
    </AuthProvider>
  )
}
