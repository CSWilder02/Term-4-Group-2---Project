import React, { useEffect, useState } from 'react';
import './sideMenus.css'
import { SearchBar } from '../Search Bar/searchBar';
import { useNavigate } from 'react-router-dom';

export const LeftMenu = ({ visibility }) => {
    const navigateTo = useNavigate("");
    const [isLeftBarActive, setIsLeftBarActive] = useState(false);

    const [sectionItems, setsectionItems] = useState([
        {
            icon: "home",
            title: "Home"
        },
        {
            icon: "electric_bolt",
            title: "New"
        }
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

    }, [isLeftBarActive]);

    const returnMenuIcon = () => {
        return (
            <span className="material-icons navBar-menu icon-button" onClick={e => setIsLeftBarActive(true)}>
                menu
            </span>
        )
    }

    const returnLeftBar = () => {
        return (
            <div className='sideBarContainer leftSideBarContainer'>
                <div className='sideBarTopContainer '>
                    <div className='navBarLeftTextContainer'>More Options</div>
                    <span className="material-icons navBar-menu icon-button" onClick={e => setIsLeftBarActive(false)}>
                        close
                    </span>
                </div>
                {/* <hr className='sideBarSectionTopDivider' /> */}
                <div className='sideBarSectionContainer'>
                    {
                        sectionItems.map((item, i) => {
                            return (
                                <div key={i} className='sideBarSectionItmContainer'>
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
                {
                    sectionCommunities.map((community, i) => {
                        return (
                            <div key={i}>
                                {i > 0 && <hr className='sideBarSectionContentDivider' />}
                                <div className='sideBarSectionContainer'>
                                    <div className={siderBarSelectedDropDown === community.category ?
                                        'siderBarSectionDropDown icon-button dropdown-active' :
                                        'siderBarSectionDropDown icon-button dropdown-deactive'}
                                        onClick={e => {
                                            if (siderBarSelectedDropDown !== community.category) {
                                                setSiderBarSelectedDropDown(community.category)
                                            } else {
                                                setSiderBarSelectedDropDown("")
                                            }
                                        }}>
                                        <div className={siderBarSelectedDropDown === community.category ?
                                            'sideBarSectionCategory dropdown-active' :
                                            'sideBarSectionCategory dropdown-deactive'}>{community.category}</div>
                                        <span className="material-icons">
                                            {siderBarSelectedDropDown === community.category ?
                                                'keyboard_arrow_up' :
                                                'expand_more'}
                                        </span>
                                    </div>

                                    <div className={
                                        siderBarSelectedDropDown === community.category ?
                                            'sideBarItemsContainer itemContainerActive' :
                                            'sideBarItemsContainer itemContainerDeactive '}>
                                        {
                                            community.communities.map((comm, i) => {
                                                return (
                                                    <div key={i} className='sideBarSectionItmContainer itemInList' onClick={e => { navigateTo("/community" + comm?.to); setIsLeftBarActive(false) }}>
                                                        <span className="material-icons icon-button sideBarSectionIcon">
                                                            groups_3
                                                        </span>
                                                        <div className='sideBarSectionTitle'>{comm.title}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <hr className='sideBarSectionContentDivider' />
                <SearchBar />
                {/* <div className={isLeftBarActive ? "backgroundOverlay" : "backgroundOverlay-deactive"}
                    onClick={e => setIsLeftBarActive(false)}>
                </div> */}
            </div>
        )
    }

    return (
        isLeftBarActive ? returnLeftBar() : returnMenuIcon()
    )
}
