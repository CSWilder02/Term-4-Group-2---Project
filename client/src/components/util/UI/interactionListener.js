import React, { createContext, useContext, useState, useEffect } from 'react';

const InteractionContext = createContext();

export const InteractionProvider = ({ children }) => {
    const [interactionState, setInteractionState] = useState('click'); // Set initial state to 'Click'
    const [eventInfo, setEventInfo] = useState(null);

    useEffect(() => {
        function handleInteraction(event) {
            const interactionType = event.type === 'click' ? 'click' : 'scroll';
            setInteractionState(interactionType);
            setEventInfo(event);

            // Reset to 'Idle' state after 100 milliseconds
            setTimeout(() => {
                setInteractionState('idle');
                setEventInfo(null);
            }, 100);
        }

        document.body.addEventListener('click', handleInteraction);
        // window.addEventListener('scroll', handleInteraction);

        return () => {
            document.body.removeEventListener('click', handleInteraction);
            // window.removeEventListener('scroll', handleInteraction);
        };
    }, []);

    return (
        <InteractionContext.Provider value={{ interactionState, eventInfo }}>
            {children}
        </InteractionContext.Provider>
    );
};

export const useInteraction = () => {
    const context = useContext(InteractionContext);
    if (context === undefined) {
        throw new Error('useInteraction must be used within an InteractionProvider');
    }
    return context;
};
