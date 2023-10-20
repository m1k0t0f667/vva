import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter for routing
import AppRoutes from "./routes"; // Assuming you named your routing component as AppRoutes
import "./App.css";
import Navbar from "./Pages/Components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <AppRoutes /> {/* Render your routing component */}
      </Router>
    </div>
  );
}

export default App;
