import React, { useEffect, useState } from 'react';
import './navbar.css';
import { Container, Row, Col } from 'react-bootstrap';
import { SearchBar } from '../Search Bar/searchBar'
import { LeftBar } from '../SideBars/leftBar';
import { RightBar } from '../SideBars/rightBar';

export const NavBar = () => {
    const [username, setUsername] = useState("Eddie");
    const [loggenIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn"));
    const [currentPage, setCurrentPage] = useState('/');
    const [leftBarVisibilityTgl, setLeftBarVisibilityTgl] = useState(false)

    const changePage = (page) => {
        if (currentPage === page) {
            return "button-nav-active"
        } else {
            return "button-nav-deactive"
        }
    }

    useEffect(() => {
        setLoggedIn(sessionStorage.getItem("loggedIn"))
    }, [sessionStorage.getItem("loggedIn")]);


    return (
        <Row xs={1} sm={1} md={1} lg={1} xl={3} xxl={3} className='navBarWrap'>
            <Col className='navBarLeftContainer'>
                <LeftBar />
                <div className='navBarLeftLogoContainer'>CodeGenius</div>
                {/* RightBar for mobile view */}
                <div className='navBarLeftProfileContainer-mobile'>
                    <RightBar />
                </div>
            </Col>
            <Col className='navBarMidContainer'>
                <SearchBar />
            </Col>
            <Col className='navBarRightContainer'>
                <div className={changePage("trending")} onClick={e => setCurrentPage("trending")}>
                    <span className="material-icons md-24">local_fire_department</span>
                    <div className='navBarRightContainerItmTxt'>Trending</div>
                </div>
                <div className={changePage("notification")} onClick={e => setCurrentPage("notification")}>
                    <span className="material-icons md-24 ">notifications</span>
                    <div className='navBarRightContainerItmTxt'>Notifications</div>
                </div>
                <div className='navBarRightItm-3-Container'>
                    <RightBar />
                </div>
            </Col>

        </Row>
    )
}
