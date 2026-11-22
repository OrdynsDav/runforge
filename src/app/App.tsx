import { DevSettingsProvider } from "../context/DevSettings/DevSettingsProvider";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";
import "./App.css";

function App() {
  return (
    <DevSettingsProvider>
      <DashboardPage />
    </DevSettingsProvider>
  );
}

export default App;
