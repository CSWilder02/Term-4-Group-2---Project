import React, { useEffect, useState } from 'react'

export const Form = ({ fields, initialValues, onSubmit }) => {
    const [formValues, setFormValues] = useState(initialValues || {});

    function readAndConvertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result.split(',')[1]);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }

    const handleInputChange = async (e, fieldName, fieldType) => {
        let inputValue = e?.target?.type === 'file' ? e?.target?.files : e?.target?.value;

        if (fieldType === 'number') {
            inputValue = parseInt(inputValue, 10);
        } else if (fieldType === 'arrayOfStrings') {
            inputValue = inputValue.split(',').map(item => item.trim());
        } else if (fieldType === 'file') {
            const files = e.target.files;
            const base64Promises = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                base64Promises.push(readAndConvertFileToBase64(file));
            }

            try {
                const base64Array = await Promise.all(base64Promises);
                // Push each image to an array
                inputValue = base64Array;
            } catch (error) {
                console.error('Error converting files to base64:', error);
                inputValue = [];
            }
        } else if (fieldType === 'checkbox') {
            inputValue = e.target.checked;
        }

        setFormValues(prevState => ({
            ...prevState,
            [fieldName]: inputValue,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(formValues);
    };

    useEffect(() => {
        console.log(formValues)
    }, [formValues]);

    return (
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
            {fields.map(field => (
                <div key={field.name}>
                    <label>{field.label}</label>
                    {field.type === 'text' && (
                        <input
                            type="text"
                            value={formValues[field.name] || ''}
                            onChange={e => handleInputChange(e, field.name, 'string')}
                        />
                    )}
                    {field.type === 'number' && (
                        <input
                            type="number"
                            value={formValues[field.name] || ''}
                            onChange={e => handleInputChange(e, field.name, 'number')}
                        />
                    )}
                    {field.type === 'arrayOfStrings' && (
                        <input
                            type="text"
                            placeholder="item1, item2, item3, ..."
                            value={formValues[field.name] ? formValues[field.name].join(', ') : ''}
                            onChange={e => handleInputChange(e, field.name, 'arrayOfStrings')}
                        />
                    )}
                    {field.type === 'file' && (
                        <input
                            name={field?.name}
                            type="file"
                            accept=".png, .jpeg, .jpg, .gif"
                            multiple={field.multiple}
                            onChange={e => handleInputChange(e, field.name, 'file')}
                        />
                    )}
                    {field.type === 'checkbox' && (
                        <input
                            type="checkbox"
                            checked={formValues[field.name] || false}
                            onChange={e => handleInputChange(e, field.name, 'checkbox')}
                        />
                    )}
                </div>
            ))}
            <button className='button-primary' type="submit">Submit</button>
        </form>
    )
}
