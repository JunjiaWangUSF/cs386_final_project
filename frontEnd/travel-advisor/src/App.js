import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import TravelAdvisorForm from "./pages/TravelAdvisorForm";
import ItineraryDisplay from './pages/ItineraryDisplay';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/travel-advisor" element={<TravelAdvisorForm />} />
            <Route path="/itinerary" element={<ItineraryDisplay />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
