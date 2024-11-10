import React, { useState } from "react";
import CompanyNav from "./CompanyNav";
import axiosapi from "../axiosapi";
import toast from "react-hot-toast";

const AddQuestions = () => {
  const [questions, setQuestions] = useState([
    { questionText: "", answer: "", marks: "" },
  ]);
  const compId = sessionStorage.getItem("compId");

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: "", answer: "", marks: "" }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosapi.get(`/company/application/${compId}`);
      console.log(res.data?.internship, "ress");
      console.log(questions);

      questions?.forEach(async (item) => {
        item.marks = parseInt(item.marks);
      });

      if (res.data?.internship?.length === 0) {
        alert("No applications received yet");
        return;
      }

      for (let i of res.data?.internship) {
        const data = {
          questions: questions,
        };
        console.log(i._id);
        const response = await axiosapi.post(
          `company/addQuestions/${i.intern}`,
          data
        );
        console.log(response, "questions added");
      }
      toast.success("Questions added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div style={{ paddingTop: "70px" }} className="container">
      <CompanyNav />

      {/* Question text, answers, marks */}

      <div className="card mt-5 p-4">
        <div
          className="card-header"
          style={{ backgroundColor: "#4835d4", color: "white" }}
        >
          <h3 className="text-white">Add Questions</h3>
        </div>
        <form className="mt-3 " onSubmit={handleSubmit}>
          {questions.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="form-group">
                <label htmlFor={`question-${index}`}>Question</label>
                <input
                  type="text"
                  className="form-control"
                  id={`question-${index}`}
                  name="questionText"
                  value={item.questionText}
                  placeholder="Enter question"
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`answer-${index}`}>Answer</label>
                <input
                  type="text"
                  className="form-control"
                  id={`answer-${index}`}
                  name="answer"
                  value={item.answer}
                  placeholder="Enter answer"
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`marks-${index}`}>Marks</label>
                <input
                  type="number"
                  className="form-control"
                  id={`marks-${index}`}
                  name="marks"
                  value={item.marks}
                  placeholder="Enter marks"
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveQuestion(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <hr />
          <button
            type="button"
            className="btn btn-secondary mb-3"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestions;
