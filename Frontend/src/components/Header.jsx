import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#4361ee',
        textDecoration: 'none'
      }}>
        TaskManager
      </Link>
      
      <nav style={{
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        <Link 
          to="/" 
          style={{
            color: '#6c757d',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'color 0.3s ease',
            padding: '0.5rem 0',
            position: 'relative'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#4361ee'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#6c757d'}
        >
          Home
        </Link>
        
        {isLoggedIn && (
          <Link 
            to="/create" 
            style={{
              color: '#6c757d',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              padding: '0.5rem 0',
              position: 'relative'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#4361ee'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6c757d'}
          >
            Create Task
          </Link>
        )}
        
        {isLoggedIn ? (
          <button
            onClick={logout}
            style={{
              padding: '0.5rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#ffffff',
              backgroundColor: '#4361ee',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a56d4'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4361ee'}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            style={{
              padding: '0.5rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#ffffff',
              backgroundColor: '#4361ee',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a56d4'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4361ee'}
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}