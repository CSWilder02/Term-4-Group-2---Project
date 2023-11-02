import React from 'react';
import './updateQuestion.css'
import { useToken } from '../../../../util/UseContext/loggedInUserContext';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../../elements/Form/form';
import requestDataOf from '../../../../util/DataRequests/fetchData';

export const UpdateQuestion = ({ initialValues, question }) => {
    const { token } = useToken();
    const navigateTo = useNavigate();

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

    const updateQuestion = async (formValues) => {
        requestDataOf.request("patch", `updateQuestion/${question?._id}`, token, formValues).
            then(() => {
                alert("Posted"); navigateTo('-1')
            }).
            catch(err => console.log(err))

    };
    const cancelQuestion = async (formValues) => {
        navigateTo('/')
    };

    return (
        <div>
            <Form fields={fields} initialValues={initialValues} onSubmit={updateQuestion} onCancel={cancelQuestion} />
        </div>
    )
}
