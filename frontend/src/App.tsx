import { Navbar, Dashboard } from "./components";

import "./index.css";

export function App() {
  return (
    <div className="max-w-7xl flex flex-col justify-center mx-auto relative h-screen">
      <Navbar />
      <div className="flex-grow mt-16 flex justify-center bg-white">
        <Dashboard />
      </div>
    </div>
  );
}
