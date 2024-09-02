import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChevronRight, ChevronLeft } from "lucide-react";
import HomePage from "./components/Home.page";
import RQSuperHeroPage from "./components/reactQuery/RQSuperHero.page";
import SuperHeroesPage from "./components/reactQuery/SuperHeroes.page";
import RQSuperHeroesPage from "./components/reactQuery/RQSuperHeroes.page";
import 'bootstrap/dist/css/bootstrap.min.css';
import ParallelQueriesPage from "./components/reactQuery/ParallelQueries.page";
import DynamicParallelQueriesPage from "./components/reactQuery/DynamicParallelQueries.page";
import DependedQueriesPage from "./components/reactQuery/DependedQueries.page";
import PaginatedQueriesPage from "./components/reactQuery/PaginatedQueries.page";
import InfiniteQueriesPage from "./components/reactQuery/InfiniteQueries.page";
import CakeShopPage from "./components/redux/CakeShop.page";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import ReactTablePage from "./components/reactTable/ReactTable.page";
import SortingTablePage from "./components/reactTable/SortingTable.page";
import FilteringTablePage from "./components/reactTable/FilteringTable.page";
import PaginatedTablePage from "./components/reactTable/PaginatedTable.page";
import RowSelection from "./components/reactTable/RowSelection";
import ColumnOrder from "./components/reactTable/ColumnOrder";

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    background-color: 'white';
    margin: 0;
    padding: 0;
  }
  button {
    font-family: 'Inter', sans-serif;
  }
`;

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

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const SidebarToggle = () => (
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      style={{
        position: 'fixed',
        left: isSidebarOpen ? '240px' : '0',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        background: '#4ECDC4',
        border: 'none',
        borderRadius: '0 8px 8px 0',
        padding: '1rem 0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'left 0.3s ease-in-out',
      }}
    >
      {isSidebarOpen ? <ChevronLeft color="white" size={24} /> : <ChevronRight color="white" size={24} />}
    </button>
  );

  const Sidebar = ({ tasks }) => (
    <div style={{
      position: 'fixed',
      left: isSidebarOpen ? '0' : '-240px',
      top: 0,
      bottom: 0,
      width: '240px',
      background: 'white',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      transition: 'left 0.3s ease-in-out',
      overflowY: 'auto',
      zIndex: 999,
    }}>
      <div style={{ padding: '2rem 1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#333' }}>
          Quick Access
        </h2>
        {tasks.map((task, index) => (
          <Link
            key={index}
            to={task.to}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              color: '#333',
              textDecoration: 'none',
              borderRadius: '8px',
              marginBottom: '0.5rem',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f2f5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ marginRight: '1rem', fontSize: '1.25rem' }}>{task.iconLabel}</span>
            {task.title}
          </Link>
        ))}
      </div>
    </div>
  );

  const AppContent = () => {
    const tasks = [
      { title: 'Home', iconLabel: '🏠', to: '/' },
      { title: 'SuperHeroes', iconLabel: '🦸', to: '/superheroes' },
      { title: 'RQ SuperHeroes', iconLabel: '🚀', to: '/rq-superheroes' },
      { title: 'Parallel Queries', iconLabel: '🔀', to: '/rq-parallel-queries' },
      { title: 'Dynamic Parallel Queries', iconLabel: '🔄', to: '/rq-dynamic-parallel-queries' },
      { title: 'Dependent Queries', iconLabel: '🔗', to: '/rq-dependent-queries' },
      { title: 'Paginated Queries', iconLabel: '📄', to: '/rq-paginated-queries' },
      { title: 'Infinite Queries', iconLabel: '♾️', to: '/rq-infinite-queries' },
      { title: 'Using Redux', iconLabel: '🔄', to: '/rtk-cake-shop' },
      { title: 'React Table', iconLabel: '📊', to: '/table' },
      { title: 'Sorting Table', iconLabel: '🔢', to: '/sorting-table' },
      { title: 'Filtering Table', iconLabel: '🔍', to: '/filtering-table' },
      { title: 'Paginated Table', iconLabel: '📑', to: '/paginated-table' },
      { title: 'RowSelection', iconLabel: '🔘', to: '/row-selection' },
      { title: 'Column Order', iconLabel: '🔀', to: '/column-order' },
    ];

    return (
      <div style={{
        transition: 'margin-left 0.3s ease-in-out',
        marginLeft: isSidebarOpen ? '240px' : '0',
      }}>
        <SidebarToggle />
        <Sidebar tasks={tasks} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <div className='d-flex flex-column align-items-center'>
            <Routes>
              <Route path="/superheroes" element={<SuperHeroesPage />} />
              <Route path="/rq-superheroes" element={<RQSuperHeroesPage />} />
              <Route path="/rq-superhero/:heroId" element={<RQSuperHeroPage />} />
              <Route path="/rq-parallel-queries" element={<ParallelQueriesPage />} />
              <Route path="/rq-dynamic-parallel-queries" element={<DynamicParallelQueriesPage heroIds={[1, 3]} />} />
              <Route path="/rq-dependent-queries" element={<DependedQueriesPage email='tanmesh@example.com' />} />
              <Route path="/rq-paginated-queries" element={<PaginatedQueriesPage />} />
              <Route path="/rq-infinite-queries" element={<InfiniteQueriesPage />} />
              <Route path="/rtk-cake-shop" element={<CakeShopPage />} />
              <Route path="/table" element={<ReactTablePage />} />
              <Route path="/sorting-table" element={<SortingTablePage />} />
              <Route path="/filtering-table" element={<FilteringTablePage />} />
              <Route path="/paginated-table" element={<PaginatedTablePage />} />
              <Route path="/row-selection" element={<RowSelection />} />
              <Route path="/column-order" element={<ColumnOrder />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }

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