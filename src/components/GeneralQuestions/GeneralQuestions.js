import { useEffect, useState } from 'react';
import './GeneralQuestions.css';
import QuestionForm from './QuestionForm/QuestionForm';
import Example from '../Example/Example';
import List from '../List/List';
import { deleteQa, readAllQa } from '../../utils/qa';
import Trash from '../../assets/trash.svg';

const GeneralQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [active, setActive] = useState('');

  const sanitizeQuestions = async () => {
    const response = await readAllQa();
    let questions = [];
    let answers = [];
    let keywords = [];

    response.forEach((item) => {
      questions.push({ data: item.statement, id: item._id });
      answers.push({ data: item.answer, id: item._id });
      keywords.push({
        data: "'" + item.keywords.join("', '") + "'",
        id: item._id,
      });
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
        <QuestionForm fetchQues={sanitizeQuestions} />
        <Example />
        <List columns={questions} active={active} setActive={setActive} />
        <img
          src={Trash}
          alt='Delete'
          width='30'
          className='delete'
          style={active !== '' ? {} : { display: 'none' }}
          onClick={() => {
            deleteQa(active);
            sanitizeQuestions();
          }}
        />
      </div>
    </>
  );
};

export default GeneralQuestions;
