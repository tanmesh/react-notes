import React from 'react';
import { Link } from 'react-router-dom';
import allTasks from '../tasks.json';

const Header = ({ name }) => (
  <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
    <h1 style={{
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '0.75rem',
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
    <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>How can I help you today?</p>
  </header>
);

const TaskCard = ({ title, iconLabel, to }) => (
  <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '150px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      border: '1px solid #e5e7eb',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#374151' }}>{title}</h3>
      <div style={{
        alignSelf: 'flex-end',
        backgroundColor: '#f3f4f6',
        borderRadius: '9999px',
        width: '2.5rem',
        height: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.125rem',
        color: '#6b7280'
      }}>
        {iconLabel}
      </div>
    </div>
  </Link>
);

const TaskSection = ({ title, tasks }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1f2937' }}>{title}</h2>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1.5rem'
    }}>
      {tasks.map((task, index) => (
        <TaskCard key={index} {...task} />
      ))}
    </div>
  </div>
);

const HomePage = () => {
  const name = 'Tanmesh';

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <Header name={name} />
      <div>
        {Object.entries(allTasks).map(([category, sections]) => (
          <div key={category}>
            {Object.entries(sections).map(([sectionTitle, tasks]) => (
              <TaskSection key={sectionTitle} title={sectionTitle} tasks={tasks} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;