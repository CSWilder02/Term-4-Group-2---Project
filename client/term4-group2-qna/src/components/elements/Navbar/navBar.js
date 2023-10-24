import React, { useEffect, useState } from 'react';
import './navbar.css';
import { Container, Row, Col } from 'react-bootstrap';
import { SearchBar } from '../Search Bar/searchBar'
import { LeftMenu } from '../Menus/leftMenu';
import { RightMenu } from '../Menus/rightMenu';
import { useNavigate, useParams } from 'react-router-dom';
import { useInteraction } from '../../util/UI/interactionListener';

export const NavBar = ({ user, users }) => {
    const navigatTo = useNavigate();
    const { id } = useParams();
    const [username, setUsername] = useState("Eddie");
    const [loggenIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn"));
    const [currentPage, setCurrentPage] = useState('/');
    const [leftBarVisibilityTgl, setLeftBarVisibilityTgl] = useState(false)

    const changePage = (page) => {
        if (id === page) {
            return "button-nav-active"
        } else {
            return "button-nav-deactive"
        }
    }

    useEffect(() => {
        setLoggedIn(sessionStorage.getItem("loggedIn"));
        // console.log(id)
    }, [sessionStorage.getItem("loggedIn"), useInteraction()]);


    return (
        <Row xs={1} sm={1} md={1} lg={1} xl={3} xxl={3} className='navBarWrap'>
            <Col className='navBarLeftContainer'>
                <LeftMenu />
                <div className='navBarLeftLogoContainer' onClick={e => { navigatTo('/') }}>CodeGenius{id}</div>
                {/* RightMenu for mobile view */}
                <div className='navBarLeftProfileContainer-mobile'>
                    <RightMenu />
                </div>
            </Col>
            <Col className='navBarMidContainer'>
                <SearchBar />
            </Col>
            <Col className='navBarRightContainer'>
                <div className={changePage("trending")} onClick={e => {
                    setCurrentPage("trending");
                    navigatTo('/questions/trending')
                }}>
                    <span className="material-icons md-24">local_fire_department</span>
                    <div className='navBarRightContainerItmTxt'>Trending</div>
                </div>
                <div className={changePage("notification")} onClick={e => {
                    setCurrentPage("notification");
                    navigatTo('/notification')
                }}>
                    <span className="material-icons md-24 ">notifications</span>
                    <div className='navBarRightContainerItmTxt'>Notifications</div>
                </div>
                <div className='navBarRightItm-3-Container'>
                    <RightMenu />
                </div>
            </Col>

        </Row>
    )
}
