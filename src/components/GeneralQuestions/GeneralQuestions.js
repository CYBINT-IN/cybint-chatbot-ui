import "./GeneralQuestions.css";
import QuestionForm from "./QuestionForm/QuestionForm";
import Example from "../Example/Example";
import List from "../List/List";
const initialData = [
  {
    name: "Questions",
    values: [
      "What number of flavours do you offer ",
      "What time does the shop open",
      "What number of flavours do you offer",
      "What time does the shop open",
      "What number of flavours do you offer ",
      "What time does the shop open",
      "What number of flavours do you offer",
      "What time does the shop open",
    ],
  },
  {
    name: "Answer",
    values: [
      "We have variety of flavours ranging from",
      "We are open from 1 AM to 7PM",
      "We have variety of flavours ranging from",
      "We are open from 1 AM to 7PM",
      "We have variety of flavours ranging from",
      "We are open from 1 AM to 7PM",
      "We have variety of flavours ranging from",
      "We are open from 1 AM to 7PM",
    ],
  },
  {
    name: "Keywords",
    values: [
      '"What", "Flavours", "Number',
      '"What", "Timings", "Open',
      '"What", "Flavours", "Number',
      '"What", "Timings", "Open',
      '"What", "Flavours", "Number',
      '"What", "Timings", "Open',
      '"What", "Flavours", "Number',
      '"What", "Timings", "Open',
    ],
  },
];
const GeneralQuestions = () => {
  return (
    <>
      <div className="general-ques-header">
        <h1 className="header-label">General Question</h1>
      </div>
      <div className="general-ques-body">
        <QuestionForm />
        <Example />
        <List columns={initialData} />
      </div>
    </>
  );
};

export default GeneralQuestions;
