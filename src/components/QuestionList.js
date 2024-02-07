import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleDeleteItem(deleteQuestion) {
    const updatedQuestions = questions.filter((question) => question.id !== deleteQuestion.id);
    setQuestions(updatedQuestions);
  }

  const questionArr = questions.map((question) => {
    return <QuestionItem key={question.id} question={question} onDeleteQuestion={handleDeleteItem} />;
  });
  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionArr}</ul>
    </section>
  );
}

export default QuestionList;