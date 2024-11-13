import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
