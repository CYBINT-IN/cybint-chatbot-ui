import { useState } from "react";
import TextInput from "../../FormInputs/TextInput/TextInput";
import "./QuestionForm.css";

const QuestionForm = ({ gridArea = "form" }) => {
  const [data, setData] = useState({
    question: "",
    answer: "",
    keywords: [],
  });
  return (
    <form className="form" style={{ gridArea }}>
      <TextInput label="Question" dark name="question" />
      <TextInput label="Answer" dark name="answer" />
      <TextInput label="Keywords" dark name="keywords" />
      <button className="dark btn submit" type="submit">
        ADD
      </button>
    </form>
  );
};

export default QuestionForm;
