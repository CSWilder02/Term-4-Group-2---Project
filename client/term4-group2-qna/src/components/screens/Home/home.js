import React, { useState, useEffect, useRef } from 'react'
import './home.css';
import { QuestionCard } from '../../elements/Cards/QuestionCard/questionCard';
import questionsDemoData from '../../../test_data/question.data';
import LeftBar from '../../elements/SideBars/leftBar';
import { useUsers } from '../../util/UseContext/usersContext';
import { useQuestions } from '../../util/UseContext/questionsContext';
import { useTopics } from '../../util/UseContext/topicsContext';
import { useLoggedInUser, useToken } from '../../util/UseContext/loggedInUserContext';
import { useInteraction } from '../../util/UI/interactionListener';

export const Home = () => {
  const { user } = useLoggedInUser();
  const { token } = useToken();
  const { users } = useUsers();
  const { questions } = useQuestions();
  const { topics } = useTopics();

  useEffect(() => {
    // console.log("tkn: ", token)
  }, [user, users, questions, topics, useInteraction()])

  return (
    <div className="homeWrap">


      {/* <div className="filter" role="group" aria-label="Basic example">
        <Col className="navBarRightContainerHome">
          <div style={{ height: '45px', marginBottom: '8px', marginTop: '12px' }} 
          className={changePage("most asked")} 
          onClick={e => setCurrentGroupName("most asked")}>
            <span className="material-icons md-24">local_fire_department</span>
            Most Asked
          </div>
          <div style={{ height: '45px', marginBottom: '8px', marginTop: '12px' }} 
          className={changePage("rising")} 
          onClick={e => setCurrentGroupName("rising")}>
            <span className="material-icons md-24">notifications</span>
            Rising
          </div>
          <div style={{ height: '45px', marginBottom: '8px', marginTop: '12px' }} 
          className={changePage("new")} 
          onClick={e => setCurrentGroupName("new")}>
            <span className="material-icons md-24">notifications</span>
            New
          </div>
        </Col>
      </div> */}

      <div className='homeLeftWrap'>
        <LeftBar />
      </div>

      <div className='homeMidWrap'>
        <div className='homeMidQuestions'>
          {
            questions?.map((question, i) => {
              return (
                <QuestionCard key={i} question={question} scope={"public"} index={i} />
              )
            })
          }
        </div>
      </div>

      <div className='homeRightWrap'>
      </div>

    </div>
  );
};