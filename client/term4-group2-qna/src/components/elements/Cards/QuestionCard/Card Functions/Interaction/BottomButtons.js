import React, { useEffect, useState } from 'react'
import requestDataOf from '../../../../../util/DataRequests/fetchData';
import { useInteraction } from '../../../../../util/UI/interactionListener';
import { useNavigate } from 'react-router-dom';
import { useLoggedInUser, useToken } from '../../../../../util/UseContext/loggedInUserContext';

export const BottomButtons = ({ question, index }) => {

    const navigatTo = useNavigate();
    const [upVote, setUpVote] = useState(false);
    const [downVote, setDownVote] = useState(false);
    const [saved, setSaved] = useState(false);
    const { token } = useToken();
    const { loggedInUser } = useLoggedInUser();

    useEffect(() => {
        // index && console.log(index);

        // Upvote State Check
        for (let i = 0; i < question?.topics?.length; i++) {
            if (question?.upVotes[i] === loggedInUser?._id) {
                setUpVote(prevUpVote => {
                    // Use a callback function to get the previous state and update it
                    // console.log(`UpVoteState: ${index}`, prevUpVote); // Log the updated value
                    return true; // Update the state to the opposite value
                });
                // break;
            }
        }
    }, [useInteraction()])

    // Button Functions
    const handleUpvote = () => {
        if (upVote) {
            // Remove the upvote
            const updatedUpVotes = question.upVotes.filter(userId => userId !== loggedInUser?._id);
            const upVotePayload = { upVotes: updatedUpVotes };
            updateUpVotes(upVotePayload);
        } else {
            // Add the upvote
            const updatedUpVotes = [...question.upVotes, loggedInUser?._id];
            const upVotePayload = { upVotes: updatedUpVotes };
            updateUpVotes(upVotePayload);
        }
    };

    const updateUpVotes = (upVotePayload) => {
        // Check if the user has already upvoted the question
        const userUpvotedIndex = question?.upVotes.indexOf(loggedInUser?._id);

        if (userUpvotedIndex !== -1) {
            // If the user has already upvoted, remove their upvote
            const updatedUpVotes = [...question.upVotes.slice(0, userUpvotedIndex), ...question.upVotes.slice(userUpvotedIndex + 1)];
            const upVotePayload = { upVotes: updatedUpVotes };

            // Update the question with the new upvotes array
            requestDataOf
                .request("patch", `updateQuestion/${question?._id}`, token, upVotePayload)
                .then((response) => {
                    setUpVote(false)
                    // Handle the response if necessary
                    alert("Upvote removed");
                })
                .catch((error) => {
                    // Handle the error if necessary
                    console.error(error);
                });
        } else {
            setUpVote(true)
            // If the user hasn't upvoted, add their upvote
            const updatedUpVotes = [...question.upVotes, loggedInUser?._id];
            const upVotePayload = { upVotes: updatedUpVotes };

            // Update the question with the new upvotes array
            requestDataOf
                .request("patch", `updateQuestion/${question?._id}`, token, upVotePayload)
                .then((response) => {
                    setUpVote(true)
                    // Handle the response if necessary
                    alert("Upvoted");
                })
                .catch((error) => {
                    // Handle the error if necessary
                    console.error(error);
                });
        }
    };

    const updateDownVotes = () => {
        // Check if the user has already downvoted the question
        const userDownvotedIndex = question?.downVotes.indexOf(loggedInUser?._id);

        if (userDownvotedIndex !== -1) {
            // If the user has already downvoted, remove their downvote
            const updatedDownVotes = [
                ...question.downVotes.slice(0, userDownvotedIndex),
                ...question.downVotes.slice(userDownvotedIndex + 1)
            ];

            const downVotePayload = { downVotes: updatedDownVotes };

            // Update the question with the new downvotes array
            requestDataOf
                .request("patch", `updateQuestion/${question?._id}`, token, downVotePayload)
                .then((response) => {
                    setDownVote(false);
                    // Handle the response if necessary
                    alert("Downvote removed");
                })
                .catch((error) => {
                    // Handle the error if necessary
                    console.error(error);
                });
        } else {
            setDownVote(true);
            // If the user hasn't downvoted, add their downvote
            const updatedDownVotes = [...question.downVotes, loggedInUser?._id];
            const downVotePayload = { downVotes: updatedDownVotes };

            // Update the question with the new downvotes array
            requestDataOf
                .request("patch", `updateQuestion/${question?._id}`, token, downVotePayload)
                .then((response) => {
                    setDownVote(true);
                    // Handle the response if necessary
                    alert("Downvoted");
                })
                .catch((error) => {
                    // Handle the error if necessary
                    console.error(error);
                });
        }
    };

    const updateSaved = () => {
        const userSavedQuestions = loggedInUser?.saved?.questions || [];
        const userSavedIndex = userSavedQuestions.indexOf(question?._id);

        if (userSavedIndex !== -1) {
            // If the user has already saved the question, remove it from saved
            userSavedQuestions.splice(userSavedIndex, 1);

            const userPayload = { saved: { questions: userSavedQuestions } };
            console.log('Remove Payload:', userPayload); // Add this line for debugging

            // Update the user object with the new saved array
            requestDataOf
                .request("patch", `updateUser/${loggedInUser._id}`, token, userPayload)
                .then((response) => {
                    const user = response?.data?.user;
                    console.log('Updated User:', user); // Add this line for debugging
                    sessionStorage.setItem('user', JSON.stringify(user));
                    alert("Question removed from saved");
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // If the user hasn't saved the question, add it to saved
            const updatedSaved = [...userSavedQuestions, question?._id];
            const userPayload = { saved: { questions: updatedSaved } };
            console.log('Add Payload:', userPayload); // Add this line for debugging

            // Update the user object with the new saved array
            requestDataOf
                .request("patch", `updateUser/${loggedInUser._id}`, token, userPayload)
                .then((response) => {
                    const user = response?.data?.user;
                    console.log('Updated User:', user); // Add this line for debugging
                    sessionStorage.setItem('user', JSON.stringify(user));
                    alert("Question saved");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };


    // Card Bottom Interactions
    const cardBtmInteractions = [
        {
            name: 'upVote',
            icon: "arrow_circle_up",
            interactionCount: question?.upVotes?.length,
            upVote: upVote,
            action: updateUpVotes
        },
        {
            name: 'downVote',
            icon: "arrow_circle_down",
            interactionCount: question?.downVotes?.length,
            downVote: downVote,
            action: updateDownVotes
        },
        {
            name: 'comment',
            icon: "mode_comment",
            interactionCount: question?.answers?.length,
            action: () => { navigatTo(`/question/${question?._id}`) }
        }
    ]

    return (
        <div className='questionBtmInteractionsWrap'>
            <ul className='questionBtmRightInteraction'>
                {
                    cardBtmInteractions?.map((interaction, i) => {
                        return (
                            <li key={i} className='questionBtmRightInteractionItem'
                                onClick={interaction?.action}>
                                <span className={
                                    upVote && interaction?.name === "upvote" ? 'material-icons material-icons.md-36 icon cardIconUpVoted' :
                                        'material-icons material-icons.md-36 icon cardIcon'}>
                                    {interaction?.icon}
                                </span>
                                <div className='questionBtmRightInteraction-metrics text-normal'>
                                    {interaction?.name === "downVote" && interaction?.interactionCount > 0 && "-"}
                                    {interaction?.name === "comment" && "Answer ("}
                                    <b>{interaction?.interactionCount}</b>
                                    {interaction?.name === "comment" && ")"}
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <div className='questionBtmRightInteractionItem'
                onClick={updateSaved}>
                <span className='material-icons material-icons.md-36 icon'>
                    {saved ? "bookmark_added" : "bookmark_add"}
                </span>
            </div>
        </div>
    )
}
