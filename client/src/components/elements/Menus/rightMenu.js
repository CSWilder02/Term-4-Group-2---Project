import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './sideMenus.css'
import { SearchBar } from '../Search Bar/searchBar';
import { useLoggedIn, useLoggedInUser } from '../../util/UseContext/loggedInUserContext';
import { useInteraction } from '../../util/UI/interactionListener';

export const RightMenu = () => {
    const navigateTo = useNavigate("");
    const [isRightBarActive, setIsRightBarActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("loggedIn"));
    const { loggedInUser, setLoggedInUser } = useLoggedInUser();

    const [sectionItems, setsectionItems] = useState([
        {
            icon: "person",
            title: "View Profile",
            function: () => { navigateTo('/profile/user/me'); setIsRightBarActive(false) }
        },
    ]);
    const [sectionItems2, setsectionItems2] = useState([
        {
            icon: "forum",
            title: "My Questions",
            function: () => { navigateTo('/profile/user/my-questions'); setIsRightBarActive(false) }
        },
        {
            icon: "comment",
            title: "My Answers",
            function: () => { navigateTo('/profile/user/my-answers'); setIsRightBarActive(false) }
        },
        {
            icon: "groups_3",
            title: "My Communities"
        },
    ]);
    const [sectionItems3, setsectionItems3] = useState([
        {
            icon: "bookmarks",
            title: "Saved Questions",
            function: () => { navigateTo('/profile/user/saved-questions'); setIsRightBarActive(false) }
        },
        {
            icon: "bookmarks",
            title: "Saved Answers",
            function: () => { navigateTo('/profile/user/saved-bookmarks'); setIsRightBarActive(false) }
        },
    ]);

    useEffect(() => {
        // console.log(isLoggedIn)
        setIsLoggedIn(sessionStorage.getItem('loggedIn'));
        // console.log(loggedInUser)
        // loggedInUser && loggedInUser?.username ? setIsLoggedIn("true") : setIsLoggedIn("false")
    }, [isRightBarActive, isLoggedIn, useInteraction(), loggedInUser]);


    const returnProfileIcon = () => {
        if (isLoggedIn === "true") {
            return (
                <div className='navBarRightItmWrap icon-button' onClick={e => setIsRightBarActive(true)}>
                    <span className="material-icons md-24 ">
                        person
                    </span>
                    <div className='text-normal'>
                        {loggedInUser?.username}
                    </div>
                    <span className="material-icons md-24">
                        expand_more
                    </span>
                </div>
            )
        } else {
            return (
                <div className='navBarRightItm-3-Container'>
                    <button className='button-primary'
                        onClick={e => navigateTo("/onboarding")}
                    // onClick={e => setIsRightBarActive(true)}
                    >Sign In
                        {/* {isLoggenIn} */}
                    </button>
                </div>
            )

        }
    }
    const returnRightBar = () => {
        return (
            <div className='sideBarContainer rightSideBarContainer'>
                {/* {loggedInUser} */}
                <div className='sideBarTopContainer '>
                    <div className='navBarLeftTextContainer'>
                        <div className='navBarRightItm-3-Container icon-button' onClick={e => setIsRightBarActive(true)}>
                            <div className='rightBarUserDetailsContainer'>
                                <span className="material-icons md-24 ">
                                    person
                                </span>
                                <div className='text-sm'>
                                    @{loggedInUser?.username}
                                </div>
                            </div>
                            {
                                loggedInUser?.questions &&
                                (<div className='text-sm rightBarQuestiondsAsked'>
                                    <b>{loggedInUser?.questions?.length}</b>  {" questions asked."}
                                </div>)
                            }
                        </div>
                    </div>
                    <span className="material-icons navBar-menu icon-button" onClick={e => setIsRightBarActive(false)}>
                        close
                    </span>
                </div>
                {/* <hr className='sideBarSectionTopDivider' /> */}
                <div className='sideBarSectionContainer'>
                    {
                        sectionItems.map((item, i) => {
                            return (
                                <div key={i} className='sideBarSectionItmContainer' onClick={item.function}>
                                    <span className="material-icons icon-button sideBarSectionIcon">
                                        {item.icon}
                                    </span>
                                    <div className='sideBarSectionTitle'>{item.title}</div>
                                </div>
                            )
                        })
                    }

                </div>
                <hr className='sideBarSectionContentDivider' />
                <div className='sideBarSectionContainer'>
                    <button onClick={e => navigateTo('/question/create')} className='button-primary'>Ask Question</button>
                    <button onClick={e => navigateTo('/comminity/create')} className='button-secondary'>Create Community</button>
                </div>
                <hr className='sideBarSectionContentDivider' />
                <div className='sideBarSectionContainer'>
                    {
                        sectionItems2.map((item, i) => {
                            return (
                                <div key={i} className='sideBarSectionItmContainer' onClick={item?.function}>
                                    <span className="material-icons icon-button sideBarSectionIcon">
                                        {item.icon}
                                    </span>
                                    <div className='sideBarSectionTitle'>{item.title}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <hr className='sideBarSectionContentDivider' />
                <div className='sideBarSectionContainer'>
                    {
                        sectionItems3.map((item, i) => {
                            return (
                                <div key={i} className='sideBarSectionItmContainer' onClick={item?.function}>
                                    <span className="material-icons icon-button sideBarSectionIcon">
                                        {item.icon}
                                    </span>
                                    <div className='sideBarSectionTitle'>{item.title}</div>
                                </div>
                            )
                        })
                    }

                </div>
                <hr className='sideBarSectionContentDivider' />
                <div className='sideBarSectionContainer'>
                    <div className='sideBarSectionItmContainer'>
                        <span className="material-icons icon-button sideBarSectionIcon color-danger">
                            logout
                        </span>
                        <div className='sideBarSectionTitle font-heading color-danger'
                            onClick={e => {
                                sessionStorage.setItem('loggedIn', 'false');
                                sessionStorage.setItem('user', '');
                                sessionStorage.setItem('token', '');
                                // setIsLoggedIn("false");
                                setLoggedInUser({})
                                setIsRightBarActive(false);
                                navigateTo('/onboarding')
                            }}>Sign Out</div>
                    </div>
                </div>
            </div >
        )
    }

    return (
        isRightBarActive ? returnRightBar() : returnProfileIcon()
    )
}
