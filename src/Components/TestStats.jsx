import React from "react";

const TestStats = (props) => {
  return (
    <section className="test-stats">
      <div>
        Time Remaining:
        <span data-testid="time-remaining" className="highlighted">{props.timeRemaining}</span>
      </div>
      <div>
        Speed (WPM): 
        <span data-testid="typing-speed" className="highlighted">{props.wordsPerMinute}</span>
      </div>
    </section>
  );
};

export default TestStats;
