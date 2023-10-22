import React, { useEffect, useLayoutEffect, useState } from 'react';
import './cardOptions.css'
import { useInteraction } from '../../../../util/UI/interactionListener';


export const CardOptions = ({ questionId, scope }) => {
    let interactionState = useInteraction();
    const [interaction, setInteraction] = useState('idle');
    const [isOptionsVisible, setIsOptionsVisible] = useState(false)
    const options = [
        {
            icon: "ios_share",
            title: "Share",
            function: () => { },
            optionType: "public",
            code: 'normal',
            scope: "public"
        },
        {
            icon: "flag",
            title: "Report",
            function: () => { },
            optionType: "public",
            code: 'normal',
            scope: "public"
        },
        {
            icon: "edit_note",
            title: "Update",
            function: () => { },
            optionType: "private",
            code: 'action',
            scope: "private"
        },
        {
            icon: "delete",
            title: "Delete",
            function: () => { },
            optionType: "private",
            code: 'danger',
            scope: "private"
        }

    ];

    const returnOptions = () => {
        if (isOptionsVisible) {
            return (
                <div className='cardOptionsWrap'>
                    {/* <div className='optionsOverlay'></div> */}
                    {
                        options?.map((option, i) => {
                            if (scope === "private" || scope === option?.scope) {
                                return (
                                    <div key={i} className={`cardOption ${option?.code === "danger" ? "danger" : option?.code === "action" && "action"}`} onClick={e => { option?.function(); setIsOptionsVisible(false) }}>
                                        <span key={i} className={`material-icons material-icons.md-18 optionIcon ${option?.code === "danger" ? "dangerIcon" : option?.code === "action" && "actionIcon"}`}>
                                            {option?.icon}
                                        </span>
                                        <div className='optionTitle'>{option?.title}</div>
                                    </div>
                                )
                            }
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
