import React, { useEffect, useLayoutEffect, useState } from 'react';
import './form.css'

export const Form = ({ fields, initialValues, onSubmit, onCancel }) => {

    const [formValues, setFormValues] = useState(initialValues || {});
    const [hover, setHover] = useState(false);
    const [listOfImages, setListOfImages] = useState([]);
    const btnIndex = 6

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
    };

    const returnButtonWithCancel = () => {
        if (fields[btnIndex]?.cancelLabel) {
            if (fields[btnIndex]?.cancelLabel !== "") {
                return (
                    <div style={{ display: "flex", gap: "20px" }}>
                        <div style={{ width: "100%" }}>
                            <button style={{ width: "100%" }} className='button-primary form-btn' type="submit">{fields[btnIndex]?.submitLabel}</button>
                        </div>
                        <div style={{ width: "" }}>
                            <button style={{ width: "fit-content" }} className='button-secondary form-btn' onClick={onCancel}>{fields[btnIndex]?.cancelLabel}</button>
                        </div>
                    </div>
                )
            }

        } else {
            return (
                <div style={{ display: "flex", gap: "20px" }}>
                    <button style={{ width: "100%" }} className='button-primary form-btn' type="submit">{fields[btnIndex]?.submitLabel}</button>
                </div>
            )
        }
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

                // Update the listOfImages state with the base64 strings
                setListOfImages(prevImages => [...prevImages, ...base64Array]);
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
        console.log(fields?.cancelLabel)
        console.log(formValues)
    }, [formValues, hover, listOfImages]);


    return (
        <form className='formWrap' onSubmit={handleSubmit} enctype="multipart/form-data">
            <div>
                <div className='formHeader'>{fields[0]?.title}</div>
                <div className='formDescription'>{fields[1]?.description}</div>
                <hr className='formTophr' />
            </div>
            <div className='formInputs'>
                {fields.map(field => (
                    <>
                        {/* <label>{field.label}</label> */}
                        {field.type === 'text' && (
                            <input
                                placeholder={field?.label}
                                className='text'
                                type="text"
                                value={formValues[field.name] || ''}
                                onChange={e => handleInputChange(e, field.name, 'string')}
                            />
                        )}
                        {field.type === 'number' && (
                            <input
                                placeholder={field?.label}
                                type="number"
                                value={formValues[field.name] || ''}
                                onChange={e => handleInputChange(e, field.name, 'number')}
                            />
                        )}
                        {field.type === 'paragraph' && (
                            <textarea
                                placeholder={field?.label}
                                value={formValues[field.name] || ''}
                                onChange={e => handleInputChange(e, field.name, 'paragraph')}
                            ></textarea>
                        )}
                        {field.type === 'arrayOfStrings' && (
                            <input
                                placeholder={field?.label}
                                className='text'
                                type="text"
                                // placeholder="item1, item2, item3, ..."
                                value={formValues[field.name] ? formValues[field.name].join(', ') : ''}
                                onChange={e => handleInputChange(e, field.name, 'arrayOfStrings')}
                            />
                        )}
                        {field.type === 'file' && (
                            <div className='imageListWrap' onMouseOver={e => setHover(true)}>
                                {
                                    listOfImages?.map((image, i) => {
                                        return (
                                            <img key={i} className="imageUploaded" src={"data:image/png;base64," + image} alt='Uploaded Image' />
                                        )
                                    })
                                }
                                <input
                                    id="fileInput"
                                    name={field?.name}
                                    type="file"
                                    accept=".png, .jpeg, .jpg, .gif"
                                    multiple={field.multiple}
                                    onChange={e => { handleInputChange(e, field.name, 'file'); }}
                                />
                                <label for="fileInput" id="customUploadButton">
                                    <i className="ri-add-line"></i>
                                    <div className='uploadBtnLabel'> Image</div>
                                </label>
                            </div>
                        )}
                        {field.type === 'checkbox' && (
                            <input
                                placeholder={field?.label}
                                type="checkbox"
                                checked={formValues[field.name] || false}
                                onChange={e => handleInputChange(e, field.name, 'checkbox')}
                            />
                        )}
                    </>
                ))}
            </div>

            <div>
                <hr className='formBtmhr' />
                {
                    returnButtonWithCancel()

                }
            </div>
        </form>
    )
}
