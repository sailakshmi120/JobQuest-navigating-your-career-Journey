import React, { useEffect, useRef, useState } from "react";
import UserNav from "./UserNav";
import { useNavigate, useParams } from "react-router-dom";
import axiosapi from "../axiosapi";
import toast from "react-hot-toast";

const Exam = () => {
  const [questions, setQuestions] = useState([
    { questionId: "", questionText: "" },
  ]);
  const { id } = useParams();
  const studentId = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [showMarks, setShowMarks] = useState(false);

  const fetchAllQuestions = async () => {
    try {
      const res = await axiosapi.get(`/user/get/questions/${id}`);
      setQuestions(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  //   const handleAddQuestion = () => {
  //     setQuestions([...questions, { question: "", answer: "" }]);
  //   };

  //   const handleRemoveQuestion = (index) => {
  //     const newQuestions = questions.filter((_, i) => i !== index);
  //     setQuestions(newQuestions);
  //   };
  const handleCopyPaste = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const data = [];
      for (let i of questions) {
        const questionId = i.questionId;
        const submittedAnswer = i.answer;
        data.push({ questionId, submittedAnswer });
      }

      // You can handle form submission logic here (e.g., sending to an API)
      const result = await axiosapi.post(
        `/user/students/answers/${studentId}/${id}`,
        {
          answers: data,
        }
      );
      //   navigate("/userhome");
      toast.success("Answers submitted successfully");
      setShowModal(true);
      setQuestions([{ questionId: "", questionText: "", answer: "" }]);
      setShowMarks(result.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div style={{ paddingTop: "60px" }}>
      <UserNav />
      <div className="card mt-5 container">
        <form className="container mt-5" onSubmit={handleSubmit}>
          <h2>Exam</h2>
          {/* pop up card  */}
          {showModal && (
            <div
              className={`modal fade-in`}
              tabIndex={-1}
              style={{ display: "block" }}
            >
              <div
                ref={modalRef}
                className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
              >
                <div
                  className="modal-content"
                  style={{ backgroundColor: "ghostwhite" }}
                >
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Exam Submitted
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div>
                      {showMarks ? (
                        <div>
                          <p>
                            You have obtained{" "}
                            <strong className="text-primary text-bold">
                              {showMarks?.totalMarks}
                            </strong>{" "}
                            marks.
                          </p>
                          <p>Thank you for participating!</p>
                        </div>
                      ) : (
                        <h1>loading...</h1>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/userhome")}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {questions.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="form-group"></div>
              <div className="form-group">
                <h5 className="" id={`question-${index}`}>
                  <label>{`Q ${index + 1})`}</label> {item.questionText}
                </h5>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id={`answer-${index}`}
                  name="answer"
                  value={item.answer}
                  placeholder="Enter your answer"
                  onChange={(event) => handleChange(index, event)}
                  onCopy={handleCopyPaste}
                  onPaste={handleCopyPaste}
                  required
                />
              </div>
              <hr />
            </div>
          ))}

          <button type="submit" className="btn btn-primary mb-5">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Exam;
