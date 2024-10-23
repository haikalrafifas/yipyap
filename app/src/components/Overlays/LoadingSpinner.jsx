import '../../styles/LoadingSpinner.css';

const LoadingSpinner = ({ message = '' }) => {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      {message && (
        <div className="loading-text">
          {message}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
