import React, { useEffect, useState } from 'react';
import "./searchBar.css";

export const SearchBar = () => {
    const [searchBarWrap_active, setSearchBarWrap_active] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const [searchedQuestions, setSearchedQuestions] = useState([
        { question: "Why is the sky blue?" },
        { question: "Why am I human?" },
        { question: "How can you read this?" },
    ]);
    const [searchedCommunities, setSearchedCommunities] = useState([
        "DV 100", "DV 200", "DV 300", "General"
    ]);
    const [searchedTopics, setSearchedTopics] = useState([
        "mongodb", "expressjs", "error500", "redux-debug"
    ]);
    // con
    // const[i, setI] = useState(false);


    useEffect(() => {

    }, [searchBarWrap_active, searchValue])
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

            <div className={searchBarWrap_active ? 'searchBarOverlay-active' : 'searchBarOverlay-deactive'}>
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
                    <div className='searchBarSearchWrap' onClick={e => setSearchBarWrap_active(false)}>
                        <div className='searchBarSearchLeftContainer'>
                            <span className="material-icons">
                                search
                            </span>
                            <div className='text-sm'>{"Search: " + searchValue}</div>
                        </div>
                        <div className='text-sm'>All results</div>
                    </div>
                    <hr />
                    <div className='searchBarQuestionResultsContainer'>
                        <div className='questionResultsHeader result-header'>Questions</div>
                        <ul className='questionResults results-container'>
                            {
                                searchedQuestions.map((searchedQuestion, i) => {
                                    return (
                                        <li key={i} className='result-item text-normal'
                                            onClick={e => {
                                                setSearchValue(searchedQuestion.question);
                                                setSearchBarWrap_active(false);
                                            }}>
                                            <span className="material-icons icon searchBarClose-active">
                                                forum
                                            </span>
                                            {searchedQuestion.question}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <hr />
                    <div className='searchBarCommunitiesResultsContainer'>
                        <div className='communitiesResultsHeader result-header'>Communities</div>
                        <ul className='communitiesResults results-container'>
                            {
                                searchedCommunities.map((searchedCommunity, i) => {
                                    return (
                                        <li key={i} className='result-item text-sm'
                                            onClick={e => {
                                                setSearchValue(searchedCommunity);
                                                setSearchBarWrap_active(false);
                                            }}>
                                            <span className="material-icons icon searchBarClose-active">
                                                groups_3
                                            </span>
                                            {searchedCommunity}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <hr />
                    <div className='searchBarTopicsResultsContainer'>
                        <div className='topicsResultsHeader result-header'>Topics</div>
                        <ul className='topicsResults results-container'>
                            {
                                searchedTopics.map((searchedTopic, i) => {
                                    return (
                                        <li key={i} className='result-item text-sm'
                                            onClick={e => {
                                                setSearchValue(searchedTopic);
                                                setSearchBarWrap_active(false);
                                            }}>
                                            <span className="material-icons icon searchBarClose-active">
                                                tag
                                            </span>
                                            {searchedTopic}
                                        </li>
                                    )
                                })
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
