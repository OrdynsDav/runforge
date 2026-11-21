import { RunDetailProvider } from "../../context/RunDetail/RunDetailProvider";
import { RunsFiltersProvider } from "../../context/RunsFilters/RunsFiltersProvider";
import Header from "../../molecules/Header/Header";
import { RunsContent } from "../../organisms/RunsContent/RunsContent";
import "./DashboardPage.css";

export const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <Header />
      <main>
        <RunsFiltersProvider>
          <RunDetailProvider>
            <RunsContent />
          </RunDetailProvider>
        </RunsFiltersProvider>
      </main>
    </div>
  );
};
