import { lazy, Suspense } from "react";
import { RunDetailProvider } from "../../context/RunDetail/RunDetailProvider";
import { RunsFiltersProvider } from "../../context/RunsFilters/RunsFiltersProvider";
import Header from "../../molecules/Header/Header";
import { RunsContent } from "../../organisms/RunsContent/RunsContent";
import "./RunsPage.css";

const DevPanel = lazy(() => import("../../organisms/DevPanel/DevPanel"));

export const RunsPage = () => {
  return (
    <div className="runs-page">
      <Header />
      <main>
        <RunsFiltersProvider>
          <RunDetailProvider>
            {DevPanel && (
              <Suspense fallback={null}>
                <DevPanel />
              </Suspense>
            )}
            <RunsContent />
          </RunDetailProvider>
        </RunsFiltersProvider>
      </main>
    </div>
  );
};
