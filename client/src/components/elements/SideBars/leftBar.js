import React, { useEffect, useState } from 'react';
import './sideBars.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useTopics } from '../../util/UseContext/topicsContext';
import { useNavigate } from 'react-router-dom';

const LeftBar = () => {
    const navigateTo = useNavigate();
    let { topics } = useTopics();
    const reducedTopics = topics?.slice(0, 10);
    const menu = [
        {
            menuCategories: "Trending Topics",
            subMenus: [
                {
                    subMenuTitle: "DV100",
                    codeMenu: "dv100"
                },
                {
                    subMenuTitle: "DV101",
                    codeMenu: "dv101"
                }
                ,
                {
                    subMenuTitle: "DV102",
                    codeMenu: "dv102"
                }
                ,
                {
                    subMenuTitle: "DV103",
                    codeMenu: "dv103"
                }
                ,
                {
                    subMenuTitle: "DV104",
                    codeMenu: "dv104"
                }
            ]

        },
        // {
        //     menuCategories: "Second Year",
        //     subMenus: [
        //         {
        //             subMenuTitle: "DV200",
        //             codeMenu: "dv200"
        //         },
        //         {
        //             subMenuTitle: "DV201",
        //             codeMenu: "dv201"
        //         }
        //         ,
        //         {
        //             subMenuTitle: "DV202",
        //             codeMenu: "dv202"
        //         }
        //         ,
        //         {
        //             subMenuTitle: "DV203",
        //             codeMenu: "dv203"
        //         }
        //         ,
        //         {
        //             subMenuTitle: "DV204",
        //             codeMenu: "dv204"
        //         }
        //     ]

        // },
        // {
        //     menuCategories: "Third Year",
        //     subMenus: [
        //         {
        //             subMenuTitle: "DV300",
        //             codeMenu: "dv300"
        //         },
        //         {
        //             subMenuTitle: "DV301",
        //             codeMenu: "dv301"
        //         }
        //         ,
        //         {
        //             subMenuTitle: "DV302",
        //             codeMenu: "dv302"
        //         }
        //         ,
        //         {
        //             subMenuTitle: "DV303",
        //             codeMenu: "dv303"
        //         }
        //         ,
        //         {
        //             subMenuTitle: "DV304",
        //             codeMenu: "dv304"
        //         }
        //     ]

        // },
        // {
        //     menuCategories: "Trending Topics",
        //     subMenus: [
        //         {
        //             subMenuTitle: "React",
        //             codeMenu: "react"
        //         },
        //         {
        //             subMenuTitle: "Phython",
        //             codeMenu: "phython"
        //         },
        //         {
        //             subMenuTitle: "State Management",
        //             codeMenu: "state management"
        //         },
        //     ]

        // },
    ];

    const [selectedPage, setSelectedPage] = useState("");

    useEffect(() => {
        // console.log("reduced topic", topics)
    }, [selectedPage, topics])


    return (
        <Sidebar className='sideBarWrap' style={{ marginLeft: '48px', border: '0px', borderRadius: '10px !important', position: 'sticky', top: '85px', fontFamily: 'Kanit' }}>
            <Menu style={{ backgroundColor: '#18191b', color: '#A3A6B5', transition: 'background-color 0.3s', padding: '10px', textAlign: 'left', borderRadius: '10px !important' }}>
                <MenuItem style={{ borderBottom: 'solid 1px #', background: '#18191b' }} > Home </MenuItem>
                {/* <MenuItem style={{ borderBottom: 'solid 1px #4B4D55' }} > New </MenuItem> */}
                {
                    menu?.map((menuItem, i) => {
                        let lngth = menu?.length - 1
                        return (
                            <SubMenu key={i} style={{ background: '#18191b', borderBottom: i !== lngth && 'solid 1px #4B4D55' }} label={menuItem?.menuCategories}>
                                {
                                    // menuItem?.subMenus?.map((submenu, i) => {
                                    reducedTopics?.map((topic, i) => {
                                        return (
                                            <MenuItem key={i} onClick={e => { setSelectedPage(topic?.title); navigateTo('/search/topic' + topic?.title) }} style={{ backgroundColor: selectedPage === topic ? "#26282c" : '#18191b' }} > {topic?.title} </MenuItem>
                                        )
                                    })
                                }
                            </SubMenu>
                        )
                    })
                }
            </Menu>
        </Sidebar >
    );
};

export default LeftBar;
