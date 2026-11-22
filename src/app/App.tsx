import { DevSettingsProvider } from "../context/DevSettings/DevSettingsProvider";
import { RunsPage } from "../pages/RunsPage/RunsPage";
import "./App.css";

function App() {
  return (
    <DevSettingsProvider>
      <RunsPage />
    </DevSettingsProvider>
  );
}

export default App;
