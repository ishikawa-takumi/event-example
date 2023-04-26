import { useState } from "react";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [number, setNumber] = useState(0);

  async function greet() {
    const unlisten = await listen<number>("get-number", (event) => {
      setNumber(event.payload);
      unlisten();
    });
    invoke("greet");
  }

  return (
    <div>
      <button onClick={greet}>Press</button>
      <p>{number}</p>
    </div>
  );
}

export default App;
