import React, { useEffect, useState, useContext, createContext, } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import PrivateRoute from './components/util/Routes/privateRoute';
import getDataOf from './components/util/DataRequests/fetchData';

import './App.css';
import './css/colors.css';
import './css/components.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';

// require('dotenv/config');

// Use Context Providers
import { NavBar } from './components/elements/Navbar/navBar';
import { Home } from './components/screens/Home/home';
import { LoggedInUserProvider, TokenProvider, useLoggedInUser, useToken } from './components/util/UseContext/loggedInUserContext';
import { UsersProvider, useUsers } from './components/util/UseContext/usersContext';
import { QuestionsProvider, useQuestions } from './components/util/UseContext/questionsContext';
import { AnswersProvider, useAnswers } from './components/util/UseContext/answersContext';
import { RepliesProvider, useReplies } from './components/util/UseContext/repliesContext';
import { OnBoarding } from './components/screens/Entitities/OnBoarding/onboarding';
import { Questions } from './components/screens/Content/Questions/questions';
import { UserProfile } from './components/screens/Entitities/User/Profile/userProfile';
import { UserAccount } from './components/screens/Entitities/User/Account/userAccount';
import { Answers } from './components/screens/Content/Answers/answers';
import { Question } from './components/screens/Content/Question/question';
import { Topics } from './components/screens/Content/Topics/topics';
import { Search } from './components/screens/Content/Search/search';
import { Notifications } from './components/screens/Content/Notifications/notifications';
import { Error404 } from './components/screens/404/error404';
import { useTopics } from './components/util/UseContext/topicsContext';
import { useCommunities } from './components/util/UseContext/communitiesContext';
import { ClickInteractionProvider, InteractionProvider } from './components/util/UI/interactionListener';
import { Landing } from './components/screens/Landing/landing';
import { ImagesProvider } from './components/util/UseContext/imagesContext';


function App() {
  return (
    // Data Provider
    <InteractionProvider>
      <TokenProvider>
        <LoggedInUserProvider>
          <UsersProvider>
            <QuestionsProvider>
              <AnswersProvider>
                <RepliesProvider>
                  <ImagesProvider>

                    {/* UI Provider*/}

                    <AppContent />


                  </ImagesProvider>
                </RepliesProvider>
              </AnswersProvider>
            </QuestionsProvider>
          </UsersProvider>
        </LoggedInUserProvider>
      </TokenProvider>
    </InteractionProvider>
  );
}

const AppContent = () => {

  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  const { token } = useToken();
  const { users, setUsers } = useUsers();
  const { communities, setCommunities } = useCommunities();
  const { questions, setQuestions } = useQuestions();
  const { answers, setAnswers } = useAnswers();
  const { replies, setReplies } = useReplies();
  const { topics, setTopics } = useTopics();

  useEffect(() => {
  }, [users])

  return (
    <div className="App">
      <NavBar user={loggedInUser} users={users} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/#' element={<Landing />} />
        <Route path='/questions/:id' element={<Questions />} />
        <Route path='/onboarding' element={<OnBoarding />} />
        <Route path='/profile/:type/:id' element={<UserProfile />} />
        <Route path='/account/:type/:id' element={<UserAccount />} />
        <Route path='/question/:id' element={<Question />} />
        <Route path='/answer/:id' element={<Answers />} />
        <Route path='/topic/:id' element={<Topics />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/notification' element={<Notifications />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App;
