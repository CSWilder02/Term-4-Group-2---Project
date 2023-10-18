import React, { useEffect, useState } from 'react';
import './cardOptions.css'

export const CardOptions = ({ questionId }) => {

    const [isOptionsVisible, setIsOptionsVisible] = useState(false)
    const options = [
        {
            icon: "share",
            title: "Share Link",
            function: () => { },
            optionType: "public"
        },
        {
            icon: "report",
            title: "Report",
            function: () => { },
            optionType: "public"
        },
        {
            icon: "edit",
            title: "Update Question",
            function: () => { },
            optionType: "public"
        },
        {
            icon: "delete",
            title: "Delete",
            function: () => { },
            optionType: "public"
        }

    ];

    const returnOptions = () => {
        if (isOptionsVisible) {
            return (
                <div className='cardOptionsWrap'>
                    {/* <div className='optionsOverlay'></div> */}
                    {
                        options?.map((option, i) => {
                            return (
                                <div className={"cardOption "} key={i} onClick={e => { option?.function(); setIsOptionsVisible(false) }}>
                                    <span className='material-icons material-icons.md-18'>
                                        {option?.icon}
                                    </span>
                                    <div className='optionTitle'>{option?.title}</div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (<span className="material-icons" onClick={e => { setIsOptionsVisible(true) }}>
                more_horiz
            </span>)
        }
    };

    useEffect(() => {

    }, [isOptionsVisible])
    return (
        returnOptions()
    )
}
