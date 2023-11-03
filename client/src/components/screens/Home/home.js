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
import { AskQuestionWidget } from '../../elements/AskQuestion/askQuestionWidget';
import { FilterQuestionsWidget } from '../../elements/FilterQuestions/filterQuestionsWidget';
import { returnFilteredQuestions } from '../../elements/FilterQuestions/Function/filteredQuestions';
import HomeBanner from '../../assets/images/util/home_banner.jpg'
import RightBar from '../../elements/SideBars/rightBar';
import { SearchTest } from '../../elements/Search Bar/searchTest';

export const Home = () => {
  const { user } = useLoggedInUser();
  const { token } = useToken();
  const { users } = useUsers();
  const { questions } = useQuestions();
  const { topics } = useTopics();

  // Retrieving and sending filter states
  const [filterState, setFilterState] = useState("latest");
  const [sortState, setSortState] = useState("reset");
  const [filteredQuestions, setFilteredQuestions] = useState(returnFilteredQuestions(filterState, sortState, questions))

  const getFilter = (val) => {
    setFilterState(val)
  };
  const getSort = (val) => {
    setSortState(val)
  }

  useEffect(() => {
    setFilteredQuestions(returnFilteredQuestions(filterState, sortState, questions))
    // console.log("tkn: ", token)
  }, [user, users, questions, topics, useInteraction(), filteredQuestions]);

  useEffect(() => {
    setFilteredQuestions(returnFilteredQuestions(filterState, sortState, questions))
    // console.log(filteredQuestions)
    // console.log(filterState)
    // console.log(sortState)
  }, [filterState, sortState, filteredQuestions]);



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
        <img src={HomeBanner} alt='Home Banner: Make Coding Easier' style={{ width: '100%', maxWidth: '800px', borderRadius: '10px' }} />
        <AskQuestionWidget />
        <hr className='home-hr' />
        <FilterQuestionsWidget getFilter={getFilter} getSort={getSort} />
        <div className='homeMidQuestions'>
          {
            filteredQuestions?.map((question, i) => {
              return (
                <QuestionCard key={i} question={question} scope={"public"} index={i} />
              )
            })
          }
        </div>
      </div>

      <div className='homeRightWrap'>
        {/* <SearchTest /> */}
        <RightBar />
      </div>

    </div>
  );
};