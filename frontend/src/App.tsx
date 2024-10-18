import { Navbar, Dashboard } from "./components";
import "./index.css";

export function App() {
  return (
    <div className="max-w-7xl flex flex-col justify-center mx-auto relative h-screen">
      <Navbar />
      <div className="flex-grow flex justify-start mt-[100px]">
        <Dashboard />
      </div>
    </div>
  );
}
