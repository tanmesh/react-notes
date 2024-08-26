import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"; /* Devtools for React Query */
import HomePage from "./components/Home.page";
import RQSuperHeroPage from "./components/RQSuperHero.page";
import SuperHeroesPage from "./components/SuperHeroes.page";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import 'bootstrap/dist/css/bootstrap.min.css'; /* Importing Bootstrap CSS */
import ParallelQueriesPage from "./components/ParallelQueries.page";
import DynamicParallelQueriesPage from "./components/DynamicParallelQueries.page";
import DependedQueriesPage from "./components/DependedQueries.page";

const queryClient = new QueryClient();

function App() {
  /*
   * Adding queryClient instance will give access to every hook and methods that React Query provides
   */
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/superheroes">Superheroes</Link>
              </li>
              <li>
                <Link to="/rq-superheroes">RQ SuperHeroes</Link>
              </li>
              <li>
                <Link to="/rq-parallel-queries">Parallel Queries</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel-queries">Dynamic Parallel Queries</Link>
              </li>
              <li>
                <Link to="/rq-dependent-queries">Dependent Queries</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/superheroes" element={<SuperHeroesPage />} />
            <Route path="/rq-superheroes" element={<RQSuperHeroesPage />} />
            <Route path="/rq-superhero/:heroId" element={<RQSuperHeroPage />} />
            <Route path="/rq-parallel-queries" element={<ParallelQueriesPage />} />
            {/* Lets mimic a scenario, where the User is passing dynamic list of heroIds */}
            <Route path="/rq-dynamic-parallel-queries" element={<DynamicParallelQueriesPage heroIds={[1, 3]} />} />
            <Route path="/rq-dependent-queries" element={<DependedQueriesPage email='tanmesh@example.com' />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
