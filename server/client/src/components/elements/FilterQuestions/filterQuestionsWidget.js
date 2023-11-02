import React, { useEffect, useState } from 'react';
import './filterQuestionsWidget.css';

export const FilterQuestionsWidget = ({ getFilter, getSort }) => {
    const [filterState, setFilterState] = useState("latest");
    const [sortState, setSortState] = useState("reset")

    const filters = [
        {
            label: "Latest",
            name: "latest",
            icon: "electric_bolt"
        },
        {
            label: "Most",
            name: "most",
            icon: "trending_up"
        },
        // {
        //     label: "Rising",
        //     name: "rising",
        //     icon: "trending_up"
        // }
    ];

    const sortings = [
        {
            name: "top",
            icon: "arrow_upward"
        },
        {
            name: "low",
            icon: "arrow_downward"
        },
        {
            name: "reset",
            icon: "restart_alt"
        },
    ];

    useEffect(() => {
        getFilter(filterState);
        getSort(sortState)

    }, [filterState, sortState]);


    return (
        <div className='filteredQuestionsWidgetWrap'>
            <div className='filteredQuestionsFilters'>
                {
                    filters?.map((filter, i) => {
                        return (
                            <div key={i}
                                className={`questionsFilterItem  ${filter?.name === filterState && `questionsFilterItem-active`}`}
                                onClick={e => { setFilterState(filter?.name) }}
                            >
                                <span className={
                                    `material-icons md-20 icon-button questionsFilterItemIcon`
                                }>
                                    {filter?.icon}
                                </span>
                                <div className='questionsFilterItemLabel' style={{ display: filter?.name === filterState ? "block" : "none" }}>
                                    {filter?.label}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='filteredQuestionsSortings'>
                {
                    sortings?.map((sort, i) => {
                        return (
                            <div key={i} onClick={e => { setSortState(sort.name) }}
                                className={`questionsSortItem ${sort?.name === sortState && `sortItem-active`}`}
                                style={{
                                    display: sort?.name === "reset" && sortState === "reset" ? "none" : "flex"
                                }}
                            >
                                <span className='material-icons md-20'>
                                    {sort?.icon}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
