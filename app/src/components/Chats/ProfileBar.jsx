import { useState } from 'react';
import { decodeToken } from '../../utils/token';
import { useHistory } from 'react-router-dom';

const ProfileBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();
  const user = decodeToken();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/auth/login');
    window.location.reload();
  };

  return (
    <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow flex items-center justify-between">
      <div className="flex items-center">
        {/* Profile Picture */}
        <img
          src={user.image}
          alt="Profile"
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <h2 className="text-lg font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.description}</p>
        </div>
      </div>

      {/* Hamburger Menu */}
      <div className="relative">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        
        {menuOpen && (
          <div className="absolute right-0 w-48 bg-white shadow-lg rounded mt-2">
            <ul>
              <li
                onClick={() => {
                  toggleMenu();
                  // Navigate to settings
                }}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                Settings
              </li>
              <li
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileBar;
