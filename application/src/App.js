import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [match, setMatch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/England");
        if (response.ok) {
          const data = await response.json();
          const data2 = JSON.parse(data);
          setMatch(data2["result10"]); // Update the state with the fetched data
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div>
        {Object.keys(match).map((key, i) => (
          <p>{key}:</p>
        ))}
      </div>
    </div>
  );
}

export default App;
