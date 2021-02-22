import { useEffect, useState } from 'react';
import './GeneralQuestions.css';
import QuestionForm from './QuestionForm/QuestionForm';
import Example from '../Example/Example';
import List from '../List/List';
import { readAllQa } from '../../utils/qa';

const GeneralQuestions = () => {
  const [questions, setQuestions] = useState([]);

  const sanitizeQuestions = async () => {
    const response = await readAllQa();
    let questions = [];
    let answers = [];
    let keywords = [];
    response.forEach((item) => {
      questions.push(item.statement);
      answers.push(item.answer);
      keywords.push("'" + item.keywords.join("', '") + "'");
    });
    const mouldedData = [
      { name: 'Question', values: questions },
      { name: 'Answer', values: answers },
      { name: 'Keywords', values: keywords },
    ];
    setQuestions(mouldedData);
  };

  useEffect(() => {
    sanitizeQuestions();
  }, []);

  return (
    <>
      <div className='general-ques-header'>
        <h1 className='header-label'>General Question</h1>
      </div>
      <div className='general-ques-body'>
        <QuestionForm />
        <Example />
        <List columns={questions} />
      </div>
    </>
  );
};

export default GeneralQuestions;
