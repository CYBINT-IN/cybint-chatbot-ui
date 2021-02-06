import "./ProgressBar.css";

const ProgressBar = ({ completed, total }) => {
  const progress = (completed / total) * 100;
  const fillerStyle = {
    width: `${progress}%`,
  };

  return (
    <div className="progressbar-wrapper">
      <span className="progressbar-label">
        Step {completed} of {total}
      </span>
      <div className="progressbar-container">
        <div className="progressbar-filler" style={fillerStyle}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
