import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './sideBars.css'
import { SearchBar } from '../Search Bar/searchBar';

export const RightBar = () => {
    const navigateTo = useNavigate("")
    const [username, setUsername] = useState("21100419");
    const [fullName, setFullName] = useState("Eddie Sosera");
    const [isRightBarActive, setIsRightBarActive] = useState(false);
    const [loggenIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn"));

    const [sectionItems, setsectionItems] = useState([
        {
            icon: "person",
            title: "View Profile"
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

    const [sectionCommunities, setSectionCommunities] = useState([
        {
            category: "First Year",
            communities: [
                { title: "DV100", to: "/dv100" },
                { title: "XD100", to: "/xd100" },
                { title: "ID100", to: "/id100" }
            ]
        },
        {
            category: "Second Year",
            communities: [
                { title: "DV200", to: "/dv200" },
                { title: "XD200", to: "/xd200" },
                { title: "ID200", to: "/id200" }
            ]
        },
        {
            category: "Third Year",
            communities: [
                { title: "DV300", to: "/dv300" },
                { title: "XD300", to: "/xd300" },
                { title: "ID300", to: "/id300" }
            ]
        }
    ]);

    const [siderBarSelectedDropDown, setSiderBarSelectedDropDown] = useState(sectionCommunities[0].category);

    useEffect(() => {
        setLoggedIn(sessionStorage.getItem("loggedIn"))
    }, [isRightBarActive]);

    const returnProfileIcon = () => {
        if (loggenIn === "true") {
            return (
                <div className='navBarRightItm-3-Container icon-button' onClick={e => setIsRightBarActive(true)}>
                    <span className="material-icons md-24 ">
                        person
                    </span>
                    <div className='text-normal'>
                        {username}
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
                        // onClick={e => navigateTo("/boarding")}
                        onClick={e => setIsRightBarActive(true)}
                    >Sign In</button>
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
                                @{username}
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
                        <div className='font-heading color-danger'>Sign Out</div>
                    </div>
                </div>
            </div >
        )
    }

    return (
        isRightBarActive ? returnRightBar() : returnProfileIcon()
    )
}
