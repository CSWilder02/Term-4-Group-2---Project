// import React, { useState, useEffect } from "react";
// import "./answers.css";
// import { QuestionCard } from "../../../elements/Cards/QuestionCard/questionCard";
// import questionsDemoData from "../../../../test_data/question.data";
// import answerDemoData from "../../../../test_data/answer.data";
// import LeftBar from "../../../elements/SideBars/leftBar";
// import { AnswerCard } from "../../../elements/Cards/AnswerCard/answerCard";
// // import from "./";

// export const Answers = ({
//   user,
//   users,
//   questions,
//   answers,
//   replies,
//   topics,
// }) => {
//   const [Questions, setQuestions] = useState(questionsDemoData);
//   const [Answers, setAnswers] = useState(answerDemoData);

//   console.log("Answer Data in Answers component:", Questions[0]);


//   const options = [
//     { label: "Top", value: "top" },

//     { label: "Newest", value: "newest" },

//     { label: "Oldest", value: "oldest" },
//   ];

//   return (
//     <div className="Comment">
//       {/* ------------------LeftBar------------------------------------ */}
//       <div className="leftBar">
//         <LeftBar />
//       </div>
//       {/* ------------------MiddleSection------------------------------- */}
//       <div className="centerWrap">
//         {/* ----------------MainQuestion-------------------------------- */}
//         <div className="question-box">
//           {Questions.length > 0 ? (
//             <QuestionCard question={Questions[0]} />
//           ) : (
//             <p>No questions available</p>
//           )}
//         </div>
//         {/* ----------------Filter------------------------------------ */}
//         <div className="filter-add-comment">
//           <div className="comment-filter">
//             <label className="dropdown-filter">
//               Sort by:
//               <select className="select-box">
//                 {options.map((option) => (
//                   <option value={option.value}>{option.label}</option>
//                 ))}
//               </select>
//             </label>
//           </div>
//         </div>
//         {/* -----------------AddComment--------------------------------- */}
//         <div className="AddComment-box">
//           <textarea
//             rows="4"
//             cols="50"
//             // value={comment}
//             // onChange={handleCommentChange}
//             placeholder="Write your comment here..."
//           />
//           <br />
//           <button className="addComment-Btn"
//           // onClick={handlePostComment}
//           >
//             Post Comment
//           </button>
//         </div>
//         {/* ----------------AnswerCard------------------------------------ */}
//         <div className="answerCard-Box">
//           {Answers.length > 0 ? (
//             <AnswerCard answer={Answers[0]} />
//           ) : (
//             <p>No questions available</p>
//           )}

//         </div>

//       </div>
//       <div className="rightBar"></div>
//     </div>
//   );
// };
