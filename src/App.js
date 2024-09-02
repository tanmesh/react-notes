import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"; /* Devtools for React Query */
import HomePage from "./components/Home.page";
import RQSuperHeroPage from "./components/reactQuery/RQSuperHero.page";
import SuperHeroesPage from "./components/reactQuery/SuperHeroes.page";
import RQSuperHeroesPage from "./components/reactQuery/RQSuperHeroes.page";
import 'bootstrap/dist/css/bootstrap.min.css'; /* Importing Bootstrap CSS */
import ParallelQueriesPage from "./components/reactQuery/ParallelQueries.page";
import DynamicParallelQueriesPage from "./components/reactQuery/DynamicParallelQueries.page";
import DependedQueriesPage from "./components/reactQuery/DependedQueries.page";
import PaginatedQueriesPage from "./components/reactQuery/PaginatedQueries.page";
import InfiniteQueriesPage from "./components/reactQuery/InfiniteQueries.page";
import CakeShopPage from "./components/redux/CakeShop.page";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import ReactTablePage from "./components/reactTable/ReactTable.page";
import SortingTablePage from "./components/reactTable/SortingTable.page";

const queryClient = new QueryClient();

function App() {

  const theme = {
    dark: {
      primary: '#000',
      text: '#fff'
    },
    light: {
      primary: '#fff',
      text: '#000'
    }
  };

  const GlobalStyle = createGlobalStyle`
    button {
      font-family: 'Roboto';
    }
  `;

  const AppContent = () => {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/superheroes">SuperHeroes</Link>
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
            <li>
              <Link to="/rq-paginated-queries">Paginated Queries</Link>
            </li>
            <li>
              <Link to="/rq-infinite-queries">Infinite Queries</Link>
            </li>
            <li>
              <Link to="/rtk-cake-shop">Using Redux</Link>
            </li>
            <li>
              <Link to="/table">React Table</Link>
            </li>
            <li>
              <Link to="/sorting-table">Sorting Table</Link>
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
          <Route path="/rq-paginated-queries" element={<PaginatedQueriesPage />} />
          <Route path="/rq-infinite-queries" element={<InfiniteQueriesPage />} />
          <Route path="/rtk-cake-shop" element={<CakeShopPage />} />
          <Route path="/table" element={<ReactTablePage />} />
          <Route path="/sorting-table" element={<SortingTablePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    );
  }

  /*
 * Adding queryClient instance will give access to every hook and methods that React Query provides
 */
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppContent />
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
