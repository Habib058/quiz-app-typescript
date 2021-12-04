import React, { useState, useEffect, useRef } from 'react';

type QuestionData={
    data:any;
    onAnswerUpdate:any;
    numberOfQuestions:any;
    activeQuestion:number;
    onSetActiveQuestion:any;
    onSetStep:any
}

const Question: React.FC<QuestionData> = ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep }) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef<any>();

  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    if(findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  const changeHandler = (e:any) => {
    setSelected(e.target.value);
    if(error) {
      setError('');
    }
  }
  type QuestionState ={
    q: string;
    a:string;
  }
  const nextClickHandler = (e:any) => {
    if(selected === '') {
      return setError('Please select one option!');
    }
    onAnswerUpdate((prevState: QuestionState[]) => [...prevState, { q: data.question, a: selected }]);
    setSelected('');
    if(activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    }else {
      onSetStep(3);
    }
  }

  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h2 className="mb-5">{data.question}</h2>
          <div className="control" ref={radiosWrapper}>
            {data.choices.map((choice:any, i:number) => (
              <label className="radio has-background-light" key={i}>
                <input type="radio" name="answer" value={choice} onChange={changeHandler} />
                {choice}
              </label>
            ))}
          </div>
          {error && <div className="has-text-danger">{error}</div>}
          <button className="button is-link is-medium is-fullwidth mt-4" onClick={nextClickHandler}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Question;