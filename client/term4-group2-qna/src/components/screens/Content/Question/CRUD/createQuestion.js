import React from 'react'
import { Form } from '../../../../elements/Form/form'
import requestDataOf from '../../../../util/DataRequests/fetchData';
import { useLoggedInUser, useToken } from '../../../../util/UseContext/loggedInUserContext';

export const CreateQuestion = () => {
    const { loggedInUser } = useLoggedInUser();
    const { token } = useToken();

    const fields = [
        { name: 'images', label: 'Images', type: 'file', multiple: true },
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'descriptionOfIssue', label: 'Description', type: 'text' },
        { name: 'topics', label: 'Topics', type: 'arrayOfStrings' },
        // {
        //     name: 'gender', label: 'Gender', type: 'select', options: [
        //         { value: 'male', label: 'Male' },
        //         { value: 'female', label: 'Female' },
        //     ]
        // },
        // { name: 'subscribe', label: 'Subscribe to Newsletter', type: 'checkbox' },
    ];

    const initialValues = {
        title: "Test"
        // Set initial values for other fields as needed
    };

    const createQuestion = async (formValues) => {
        requestDataOf.request("post", "createQuestion", token, formValues).then(() => { alert("Posted") })

    };

    return (
        <div>
            <Form fields={fields} initialValues={initialValues} onSubmit={createQuestion} />
        </div>
    )
}
