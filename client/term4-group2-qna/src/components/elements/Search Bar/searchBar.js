import React, { useEffect, useState } from 'react';
import "./searchBar.css";
import requestDataOf from '../../util/DataRequests/fetchData';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
    const navigateTo = useNavigate()
    const [searchBarWrap_active, setSearchBarWrap_active] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const [searchedQuestions, setSearchedQuestions] = useState([
        { title: "Why is the sky blue?" },
        { title: "Why am I human?" },
        { title: "How can you read this?" },
    ]);
    const [searchedUsers, setSearchedUsers] = useState([
        { username: "bladen" },
        { username: "cs" },
        { username: "eddie" },
        { username: "marine" },
    ]);
    const [searchedTopics, setSearchedTopics] = useState([
        { title: "nodejs" },
        { title: "cors" },
        { title: "axios-network-error" },
    ]);
    // con
    // const[i, setI] = useState(false);


    useEffect(() => {
        if (searchValue !== "" && searchValue !== " ") {
            requestDataOf.request("get", `search/${searchValue}`, "", "")
                .then((res) => {
                    const searchResults = res?.data
                    console.log(searchResults);

                    setSearchedQuestions(searchResults?.questions);
                    setSearchedUsers(searchResults?.users);
                    setSearchedTopics(searchResults?.topics)
                })
        }
    }, [
        searchValue,
        // searchedQuestions,
        // searchedUsers,
        // searchedTopics
    ]);

    useEffect(() => {

    }, [searchedQuestions, searchedUsers, searchedTopics])


    return (
        <div>
            <div className={searchBarWrap_active ? 'searchBarWrap' : 'searchBarWrap'}>
                <div className='searchBarLeftContainer'>
                    <span className="material-icons">
                        search
                    </span>
                    <input className='searchBarInput text-normal' type='text' placeholder='Search'
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        onFocus={e => setSearchBarWrap_active(true)}
                    // onBlur={e => setSearchBarWrap_active(false)} 
                    />
                </div>
                <span className={searchBarWrap_active ? "material-icons icon searchBarClose-active" : "material-icons icon searchBarClose-deactive"}
                    onClick={e => { setSearchBarWrap_active(false); setSearchValue("") }}>
                    cancel
                </span>
            </div>

            <div className={searchBarWrap_active && searchValue !== " " ? 'searchBarOverlay-active' : 'searchBarOverlay-deactive'}>
                <div className={searchBarWrap_active ? 'searchBarWrap searchBarWrap-active' : 'searchBarWrap'}>
                    <div className='searchBarLeftContainer'>
                        <span className="material-icons">
                            search
                        </span>
                        <input className='searchBarInput text-normal' type='text' placeholder='Search'
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            onFocus={e => setSearchBarWrap_active(true)}
                        // onBlur={e => setSearchBarWrap_active(false)} 
                        />
                    </div>
                    <span className={searchBarWrap_active ? "material-icons icon searchBarClose-active" : "material-icons icon searchBarClose-deactive"}
                        onClick={e => { setSearchBarWrap_active(false); setSearchValue("") }}>
                        cancel
                    </span>
                </div>
                <div className='searchBarResultsWrap'>
                    <div className='searchBarSearchWrap' onClick=
                        {
                            e => {
                                setSearchBarWrap_active(false);
                                navigateTo('/search/question/' + searchValue);
                                setSearchValue("");
                            }
                        }>
                        <div className='searchBarSearchLeftContainer'>
                            <span className="material-icons">
                                search
                            </span>
                            <div className='text-sm searchBarQueryText'>{"Search: " + searchValue}</div>
                        </div>
                        <div className='text-sm'>All</div>
                    </div>
                    <hr />
                    <div className='searchBarQuestionResultsContainer'>
                        <div className='questionResultsHeader result-header'>Questions</div>
                        <ul className='questionResults results-container'>
                            {
                                searchedQuestions?.length > 0 ?
                                    searchedQuestions.map((searchedQuestion, i) => {
                                        return (
                                            <li key={i} className='result-item text-normal'
                                                onClick={e => {
                                                    setSearchValue(searchedQuestion?.title);
                                                    setSearchBarWrap_active(false);
                                                    navigateTo('/question/' + searchedQuestion?._id);
                                                    setSearchValue("");
                                                }}>
                                                <span className="material-icons icon searchBarClose-active">
                                                    forum
                                                </span>
                                                {searchedQuestion?.title}
                                            </li>
                                        )
                                    }) :
                                    <div className='no-results-found text-sm'>No Topics found...</div>
                            }
                        </ul>
                    </div>
                    <hr />
                    <div className='searchBarUsersResultsContainer'>
                        <div className='usersResultsHeader result-header'>Users</div>
                        <ul className='usersResults results-container'>
                            {
                                searchedUsers?.length > 0 ?
                                    searchedUsers.map((searchedUser, i) => {
                                        return (
                                            <li key={i} className='result-item text-sm'
                                                onClick={e => {
                                                    setSearchValue(searchedUser);
                                                    setSearchBarWrap_active(false);
                                                    navigateTo('/search/user/' + searchedUser?.username);
                                                    setSearchValue("");
                                                }}>
                                                <span className="material-icons icon searchBarClose-active">
                                                    groups_3
                                                </span>
                                                @{searchedUser?.username}
                                            </li>
                                        )
                                    }) :
                                    <div className='no-results-found text-sm'>No Users found...</div>
                            }
                        </ul>
                    </div>
                    <hr />
                    <div className='searchBarTopicsResultsContainer'>
                        <div className='topicsResultsHeader result-header'>Topics</div>
                        <ul className='topicsResults results-container'>
                            {
                                searchedTopics?.length > 0 ?
                                    searchedTopics.map((searchedTopic, i) => {
                                        return (
                                            <li key={i} className='result-item text-sm'
                                                onClick={e => {
                                                    setSearchValue(searchedTopic);
                                                    setSearchBarWrap_active(false);
                                                    navigateTo('/search/topic/' + searchedTopic?.title);
                                                    setSearchValue("");
                                                }}>
                                                <span className="material-icons icon searchBarClose-active">
                                                    tag
                                                </span>
                                                {searchedTopic?.title}
                                            </li>
                                        )
                                    }) :
                                    <div className='no-results-found text-sm'>No Topics found...</div>
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className={searchBarWrap_active ? "searchBackgroundOps" : "searchBackgroundOps-deactive"}
                onClick={e => setSearchBarWrap_active(false)}>
            </div>
        </div >
    )
}
