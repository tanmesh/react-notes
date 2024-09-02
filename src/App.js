import React, { useState } from "react";
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
import FilteringTablePage from "./components/reactTable/FilteringTable.page";
import PaginatedTablePage from "./components/reactTable/PaginatedTable.page";

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


  const Header = ({ name }) => (
    <header style={{ marginBottom: '2rem' }}>
      <h1 style={{
        fontSize: '2.25rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        display: 'inline-block'
      }}>
        <span style={{
          background: 'linear-gradient(90deg, #4a90e2, #9b59b6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent'
        }}>
          Hello,
        </span>
        <span style={{
          background: 'linear-gradient(90deg, #9b59b6, #9b59b6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          marginLeft: '0.5rem'
        }}>
          {name}
        </span>
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#6b7280' }}>How can I help you today?</p>
    </header>
  );

  const TaskCard = ({ title, iconLabel, to }) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
      backgroundColor: '#f3f4f6',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      boxShadow: isHovered
        ? '0 4px 6px rgba(0, 0, 0, 0.1)'
        : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '10px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
    };

    return (
      <Link
        to={to}
        style={{ textDecoration: 'none', color: 'inherit' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{title}</h3>
          <div style={{
            alignSelf: 'flex-end',
            backgroundColor: '#e5e7eb',
            borderRadius: '9999px',
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem'
          }}>
            {iconLabel}
          </div>
        </div>
      </Link>
    );
  };

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
    ];

    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
        <Header name="Tanmesh" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {tasks.map((task, index) => (
            <TaskCard key={index} title={task.title} iconLabel={task.iconLabel} to={task.to} />
          ))}
        </div>
        <hr style={{ margin: '2rem 0' }} />
        <div className='d-flex flex-column align-items-center'>
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
            {/* React Redux */}
            <Route path="/rtk-cake-shop" element={<CakeShopPage />} />
            {/* React Table */}
            <Route path="/table" element={<ReactTablePage />} />
            <Route path="/sorting-table" element={<SortingTablePage />} />
            <Route path="/filtering-table" element={<FilteringTablePage />} />
            <Route path="/paginated-table" element={<PaginatedTablePage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    );
  }

  /**
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
