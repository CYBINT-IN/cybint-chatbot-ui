import { useState } from "react";
import { createQA } from "../../../utils/qa";
import TextInput from "../../FormInputs/TextInput/TextInput";
import "./QuestionForm.css";

const QuestionForm = ({ gridArea = "form" }) => {
  const [data, setData] = useState({
    statement: "",
    answer: "",
    keywords: ''
  });
  const updateValue = (fieldName) => (e) => {
    const newState = { ...data }
    newState[fieldName] = e.target.value
    setData(newState)
  }


  const handleAddClick = (e) => {
    e.preventDefault()
    const keywords = (data.keywords ?? '').split(/ ?, ?/)
    const response = createQA({...data, keywords})
    if (response) {
      // Handle Success
    } else {
      // Handle Failure
    }
  }

  return (
    <form className="form" style={{ gridArea }}>
      <TextInput
        value={data.statement} onChange={updateValue('statement')} label="Question" dark name="question"
      />
      <TextInput 
        value={data.answer} onChange={updateValue('answer')} label="Answer" dark name="answer" 
      />
      <TextInput 
        value={data.keywords} onChange={updateValue('keywords')} label="Keywords" dark name="keywords" 
      />
      <button 
      onClick={handleAddClick}
      className="dark btn submit" type="submit">
        ADD
      </button>
    </form>
  );
};

export default QuestionForm;
