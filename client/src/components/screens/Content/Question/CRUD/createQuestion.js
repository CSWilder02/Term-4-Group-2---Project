import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../../elements/Form/form';
import requestDataOf from '../../../../util/DataRequests/fetchData';
import { useLoggedInUser, useToken } from '../../../../util/UseContext/loggedInUserContext';

export const CreateQuestion = () => {
    const { loggedInUser } = useLoggedInUser();
    const { token } = useToken();
    const navigateTo = useNavigate();

    const fields = [
        { title: "Ask Question" },
        { description: "Ask fellow developers a question you need assistance with." },
        { name: 'images', label: 'Images', type: 'file', multiple: true },
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'descriptionOfIssue', label: 'Description', type: 'paragraph' },
        { name: 'topics', label: 'Topics', type: 'arrayOfStrings' },
        // {
        //     name: 'gender', label: 'Gender', type: 'select', options: [
        //         { value: 'male', label: 'Male' },
        //         { value: 'female', label: 'Female' },
        //     ]
        // },
        // { name: 'subscribe', label: 'Subscribe to Newsletter', type: 'checkbox' },
        {
            submitLabel: "Ask Question",
            cancelLabel: "Cancel"
        }
    ];

    const initialValues = {
        // title: "Test"
        // Set initial values for other fields as needed
    };

    const createQuestion = async (formValues) => {
        requestDataOf.request("post", "createQuestion", token, formValues).
            then(() => {
                alert("Posted"); navigateTo('/')
            }).
            catch(err => console.log(err))

    };
    const cancelQuestion = async (formValues) => {
        navigateTo('/')
    };

    return (
        <div>
            <Form fields={fields} initialValues={initialValues} onSubmit={createQuestion} onCancel={cancelQuestion} />
        </div>
    )
}
