import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './sideMenus.css'
import { SearchBar } from '../Search Bar/searchBar';
import { useLoggedInUser } from '../../util/UseContext/loggedInUserContext';

export const RightMenu = () => {
    const navigateTo = useNavigate("")
    const [username, setUsername] = useState("21100419");
    const [fullName, setFullName] = useState("Eddie Sosera");
    const [isRightBarActive, setIsRightBarActive] = useState(false);
    const [isLoggenIn, setIsLoggedIn] = useState('false');
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
            title: "My Questions"
        },
        {
            icon: "comment",
            title: "My Answers"
        },
        {
            icon: "groups_3",
            title: "My Communities"
        },
    ]);

    const [sectionItems3, setsectionItems3] = useState([
        {
            icon: "bookmarks",
            title: "Saved Questions"
        },
        {
            icon: "bookmarks",
            title: "Saved Answers"
        },
    ]);

    // Init
    useEffect(() => {

    }, [])

    useEffect(() => {
        // !isLoggenIn && setIsLoggedIn(sessionStorage.getItem('loggedIn'))
        loggedInUser && loggedInUser?.username ? setIsLoggedIn("true") : setIsLoggedIn("false")
    }, [isRightBarActive, isLoggenIn, loggedInUser]);


    // Function to handle storage changes
    function handleStorageChange(event) {
        if (event.key === 'loggedIn') {
            // Do something with the new value, for example, update a state variable
            setIsLoggedIn(event.newValue)
        }
    }
    window.addEventListener('storage', handleStorageChange);


    const returnProfileIcon = () => {
        if (isLoggenIn === "true") {
            return (
                <div className='navBarRightItm-3-Container icon-button' onClick={e => setIsRightBarActive(true)}>
                    <span className="material-icons md-24 ">
                        person
                    </span>
                    <div className='text-normal'>
                        {username + 'is' + isLoggenIn}
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
                <div className='sideBarTopContainer '>
                    <div className='navBarLeftTextContainer'><div className='navBarRightItm-3-Container icon-button' onClick={e => setIsRightBarActive(true)}>
                        <span className="material-icons md-24 ">
                            person
                        </span>
                        <div className='rightBarUserDetailsContainer'>
                            <div className='text-sm'>
                                @{loggedInUser?.username}
                            </div>
                            <div className='text-sm'>
                                {fullName}
                            </div>
                        </div>
                    </div></div>
                    <span class="material-icons navBar-menu icon-button" onClick={e => setIsRightBarActive(false)}>
                        close
                    </span>
                </div>
                {/* <hr className='sideBarSectionTopDivider' /> */}
                <div className='sideBarSectionContainer'>
                    {
                        sectionItems.map((item) => {
                            return (
                                <div className='sideBarSectionItmContainer' onClick={item.function}>
                                    <span class="material-icons icon-button sideBarSectionIcon">
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
                    <button className='button-primary'>Ask Question</button>
                    <button className='button-secondary'>Create Community</button>
                </div>
                <hr className='sideBarSectionContentDivider' />
                <div className='sideBarSectionContainer'>
                    {
                        sectionItems2.map((item) => {
                            return (
                                <div className='sideBarSectionItmContainer'>
                                    <span class="material-icons icon-button sideBarSectionIcon">
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
                        sectionItems3.map((item) => {
                            return (
                                <div className='sideBarSectionItmContainer'>
                                    <span class="material-icons icon-button sideBarSectionIcon">
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
                        <span class="material-icons icon-button sideBarSectionIcon color-danger">
                            logout
                        </span>
                        <div className='sideBarSectionTitle font-heading color-danger'
                            onClick={e => { sessionStorage.setItem('loggedIn', 'false'); setIsRightBarActive(false) }}>Sign Out</div>
                    </div>
                </div>
            </div >
        )
    }

    return (
        isRightBarActive ? returnRightBar() : returnProfileIcon()
    )
}
