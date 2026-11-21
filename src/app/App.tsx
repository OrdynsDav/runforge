import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="*" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
