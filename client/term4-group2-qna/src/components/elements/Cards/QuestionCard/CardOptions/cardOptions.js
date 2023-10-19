import React, { useEffect, useLayoutEffect, useState } from 'react';
import './cardOptions.css'
import { useInteraction } from '../../../../util/UI/interactionListener';


export const CardOptions = ({ questionId }) => {
    let interactionState = useInteraction();
    const [interaction, setInteraction] = useState('idle');
    const [isOptionsVisible, setIsOptionsVisible] = useState(false)
    const options = [
        {
            icon: "share",
            title: "Share",
            function: () => { },
            optionType: "public",
            code: 'normal'
        },
        {
            icon: "report",
            title: "Report",
            function: () => { },
            optionType: "public",
            code: 'normal'
        },
        {
            icon: "edit",
            title: "Update",
            function: () => { },
            optionType: "private",
            code: 'action'
        },
        {
            icon: "delete",
            title: "Delete",
            function: () => { },
            optionType: "private",
            code: 'danger'
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
                                <div className={`cardOption ${option?.code === "danger" ? "danger" : option?.code === "action" && "action"}`} key={i} onClick={e => { option?.function(); setIsOptionsVisible(false) }}>
                                    <span className={`material-icons material-icons.md-18 optionIcon ${option?.code === "danger" ? "danger" : option?.code === "action" && "action"}`}>
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
        setInteraction(interactionState)
        interaction?.interactionState === "scroll" && setIsOptionsVisible(false)

    }, [isOptionsVisible, useInteraction()]);


    return (
        returnOptions()
    )
}
