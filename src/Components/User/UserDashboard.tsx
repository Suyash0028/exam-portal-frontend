import React from 'react';
import { useHistory } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const history = useHistory();
  const score = localStorage.getItem('score');

  const handleStartClick = () => {
    history.push('/questionnaire');
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          <h1>Welcome to the User Dashboard</h1>
          <p>This is a protected route, only accessible by authenticated users.</p>
          {score !== null && (
            <div className="mt-3">
              <h2>Your Score: {score}</h2>
            </div>
          )}
          <button className="btn btn-primary" onClick={handleStartClick}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
