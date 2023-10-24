import React, { useEffect, useState } from 'react';
import './sideBars.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const LeftBar = () => {
    const menu = [
        {
            menuCategories: "First Year",
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
        {
            menuCategories: "Second Year",
            subMenus: [
                {
                    subMenuTitle: "DV200",
                    codeMenu: "dv200"
                },
                {
                    subMenuTitle: "DV201",
                    codeMenu: "dv201"
                }
                ,
                {
                    subMenuTitle: "DV202",
                    codeMenu: "dv202"
                }
                ,
                {
                    subMenuTitle: "DV203",
                    codeMenu: "dv203"
                }
                ,
                {
                    subMenuTitle: "DV204",
                    codeMenu: "dv204"
                }
            ]

        },
        {
            menuCategories: "Third Year",
            subMenus: [
                {
                    subMenuTitle: "DV300",
                    codeMenu: "dv300"
                },
                {
                    subMenuTitle: "DV301",
                    codeMenu: "dv301"
                }
                ,
                {
                    subMenuTitle: "DV302",
                    codeMenu: "dv302"
                }
                ,
                {
                    subMenuTitle: "DV303",
                    codeMenu: "dv303"
                }
                ,
                {
                    subMenuTitle: "DV304",
                    codeMenu: "dv304"
                }
            ]

        },
        {
            menuCategories: "Trending Topics",
            subMenus: [
                {
                    subMenuTitle: "React",
                    codeMenu: "react"
                },
                {
                    subMenuTitle: "Phython",
                    codeMenu: "phython"
                },
                {
                    subMenuTitle: "State Management",
                    codeMenu: "state management"
                },
            ]

        },
    ];

    const [selectedPage, setSelectedPage] = useState("dv100");

    useEffect(() => {

    }, [selectedPage])


    return (
        <Sidebar className='sideBarWrap' style={{ marginLeft: '48px', border: '0px' }}>
            <Menu style={{ backgroundColor: '#18191B', color: '#A3A6B5', transition: 'background-color 0.3s', padding: '10px', textAlign: 'left' }}>
                <MenuItem style={{ borderBottom: 'solid 1px #' }} > Home </MenuItem>
                <MenuItem style={{ borderBottom: 'solid 1px #4B4D55' }} > New </MenuItem>
                {
                    menu?.map((menuItem, i) => {
                        return (
                            <SubMenu key={i} style={{ borderBottom: 'solid 1px #4B4D55' }} label={menuItem?.menuCategories}>
                                {
                                    menuItem?.subMenus?.map((submenu, i) => {
                                        return (
                                            <MenuItem key={i} onClick={e => setSelectedPage(submenu?.codeMenu)} style={{ backgroundColor: selectedPage === submenu?.codeMenu ? "red" : '#18191B' }} > {submenu?.subMenuTitle} </MenuItem>
                                        )
                                    })
                                }
                            </SubMenu>
                        )
                    })
                }
            </Menu>
        </Sidebar>
    );
};

export default LeftBar;
