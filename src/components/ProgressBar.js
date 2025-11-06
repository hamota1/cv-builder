import React from 'react';

const ProgressBar = ({ skill, percentage }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-label">
        <span>{skill}</span>
        <span>{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;