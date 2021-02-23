import { useState } from 'react';
import { createQA } from '../../../utils/qa';
import TextInput from '../../FormInputs/TextInput/TextInput';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './QuestionForm.css';

const QuestionForm = ({ gridArea = 'form', fetchQues }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    statement: '',
    answer: '',
    keywords: '',
  });

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const updateValue = (fieldName) => (e) => {
    const newState = { ...data };
    newState[fieldName] = e.target.value;
    setData(newState);
  };

  const handleAddClick = async (e) => {
    e.preventDefault();
    const keywords = (data.keywords ?? '').split(/ ?, ?/);

    /** Empty form */
    if (
      data.statement.length === 0 ||
      data.answer.length === 0 ||
      data.keywords.length === 0
    )
      return;
    else {
      const response = await createQA({ ...data, keywords });

      /* Response is coming as false here preventing truthy for if statement
       * Call is going through normally in network tab
       */
      if (response) {
        setOpen(true);
        setData({
          statement: '',
          answer: '',
          keywords: '',
        });
        fetchQues();
      } else {
        console.error('Error creating question');
      }
    }
  };

  return (
    <form className='form' style={{ gridArea }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key='topcenter'
      >
        <Alert onClose={handleClose} severity='success'>
          Question added
        </Alert>
      </Snackbar>
      <TextInput
        value={data.statement}
        onChange={updateValue('statement')}
        label='Question'
        dark
        name='question'
      />
      <TextInput
        value={data.answer}
        onChange={updateValue('answer')}
        label='Answer'
        dark
        name='answer'
      />
      <TextInput
        value={data.keywords}
        onChange={updateValue('keywords')}
        label='Keywords'
        dark
        name='keywords'
      />
      <button
        onClick={handleAddClick}
        className='dark btn submit'
        type='submit'
      >
        ADD
      </button>
    </form>
  );
};

export default QuestionForm;
