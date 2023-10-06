import React, { useEffect, useState } from 'react';
import './navbar.css';
import { Container, Row, Col } from 'react-bootstrap';
import { SearchBar } from '../Search Bar/searchBar'

export const NavBar = () => {
    const [username, setUsername] = useState("Eddie");
    const [loggenIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn"));
    const [currentPage, setCurrentPage] = useState('/')

    const changePage = (page) => {
        if (currentPage === page) {
            return "button-nav-active"
        } else {
            return "button-nav-deactive"
        }
    };

    const returnUserBtn = () => {
        if (loggenIn === "true") {
            return (
                <div className='navBarRightItm-3-Container'>
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
                    <button className='button-primary'>Sign In</button>
                </div>
            )

        }
    }

    useEffect(() => {
        setLoggedIn(sessionStorage.getItem("loggedIn"))
    }, [sessionStorage.getItem("loggedIn")]);


    return (
        <Row xs={1} sm={1} md={1} lg={1} xl={3} xxl={3} className='navBarWrap'>
            <Col className='navBarLeftContainer'>
                CodeGenius
            </Col>
            <Col className='navBarMidContainer'>
                <SearchBar />
            </Col>
            <Col className='navBarRightContainer'>
                <div className={changePage("trending")} onClick={e => setCurrentPage("trending")}>
                    <span className="material-icons md-24">local_fire_department</span>
                    Trending
                </div>
                <div className={changePage("notification")} onClick={e => setCurrentPage("notification")}>
                    <span className="material-icons md-24 ">notifications</span>
                    Notifications
                </div>
                {returnUserBtn()}
            </Col>
        </Row>
        // <Container>
        //     <Row>
        //         <Col xs={12} sm={6} md={4} lg={3}>
        //             {/* Content for Extra Small (xs), Small (sm), Medium (md), and Large (lg) screens */}
        //             <div className="box">Box 1</div>
        //         </Col>
        //         <Col xs={12} sm={6} md={4} lg={3}>
        //             {/* Content for Extra Small (xs), Small (sm), Medium (md), and Large (lg) screens */}
        //             <div className="box">Box 2</div>
        //         </Col>
        //         <Col xs={12} sm={6} md={4} lg={3}>
        //             {/* Content for Extra Small (xs), Small (sm), Medium (md), and Large (lg) screens */}
        //             <div className="box">Box 3</div>
        //         </Col>
        //         <Col xs={12} sm={6} md={4} lg={3}>
        //             {/* Content for Extra Small (xs), Small (sm), Medium (md), and Large (lg) screens */}
        //             <div className="box">Box 4</div>
        //         </Col>
        //     </Row>
        // </Container>
    )
}
