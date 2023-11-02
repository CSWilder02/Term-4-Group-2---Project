import React, { useEffect } from 'react';
import './updateQuestion.css'
import { useToken } from '../../../../util/UseContext/loggedInUserContext';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../../elements/Form/form';
import requestDataOf from '../../../../util/DataRequests/fetchData';
import { useInteraction } from '../../../../util/UI/interactionListener';

export const UpdateQuestion = ({ }) => {
    const { token } = useToken();
    const navigateTo = useNavigate();
    let question = JSON.parse(sessionStorage?.getItem("update-question"))

    const fields = [
        { title: "Update Question" },
        { description: "Make changes to the question" },
        { name: 'images', label: 'Images', type: 'file', multiple: true },
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'descriptionOfIssue', label: 'Description', type: 'paragraph' },
        { name: 'topics', label: 'Topics', type: 'arrayOfStrings' },
        {
            submitLabel: "Ask Question",
            cancelLabel: "Cancel"
        }
    ];

    let initialValues = {
        title: question?.title,
        descriptionOfIssue: question?.descriptionOfIssue,

    }

    const updateQuestion = async (formValues) => {
        requestDataOf.request("patch", `updateQuestion/${question?._id}`, token, formValues).
            then(() => {
                alert("Update Successful"); navigateTo('-1')
            }).
            catch(err => console.log(err))

    };
    const cancelQuestion = async (formValues) => {
        navigateTo('/')
    };

    useEffect(() => {

    }, [useInteraction(), question])

    return (
        <div>
            <Form fields={fields} initialValues={initialValues} onSubmit={updateQuestion} onCancel={cancelQuestion} />
        </div>
    )
}
