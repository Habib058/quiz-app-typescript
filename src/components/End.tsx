import React, { useEffect, useState } from 'react';
import { formatTime } from '../Utils';

// import { formatTime } from '../utils';

type EndData ={
    results: any;
    data:any;
    onReset:any;
    onAnswersCheck:any;
    time:number

}

const End: React.FC<EndData> = ({ results, data, onReset, onAnswersCheck, time }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    let correct = 0;
    results.forEach((result:any, index:number) => {
      if(result.a === data[index].answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
    // eslint-disable-next-line
  }, []);

  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h3>Your results</h3>
          <p>{correctAnswers} of {data.length}</p>
          <p><strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong></p>
          <p><strong>Your time:</strong> {formatTime(time)}</p>
          <button className="button is-info mr-2" onClick={onAnswersCheck}>Check your answers</button>
          <button className="button is-success" onClick={onReset}>Try again</button>
        </div>
      </div>
    </div>
  );
}

export default End;