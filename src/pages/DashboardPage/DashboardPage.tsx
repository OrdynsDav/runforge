import { RunsFiltersProvider } from "../../context/RunsFiltersProvider";
import Header from "../../molecules/Header/Header";
import { RunsContent } from "../../organisms/RunsContent/RunsContent";
import "./DashboardPage.css";

export const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <Header />
      <main>
        <RunsFiltersProvider>
          <RunsContent />
        </RunsFiltersProvider>
      </main>
    </div>
  );
};
