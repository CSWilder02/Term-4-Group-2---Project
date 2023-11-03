import React, { createContext, useContext, useState, useEffect } from 'react';
import requestDataOf from '../DataRequests/fetchData';
import { useToken } from './loggedInUserContext';

const ImagesContext = createContext([]);

export const ImagesProvider = ({ children }) => {
    const { token } = useToken();
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Initialize images from session storage
        const storedImages = []
        requestDataOf
            .request("get", "images", token, "")
            .then((response) => {
                const newImages = response?.data;
                sessionStorage.setItem('images', JSON.stringify(newImages));
                setImages(newImages);
            });
    }, [token]); // Make sure to include dependencies that trigger the initialization

    return (
        <ImagesContext.Provider value={{ images, setImages }}>
            {children}
        </ImagesContext.Provider>
    );
};

export const useImages = () => {
    return useContext(ImagesContext);
};


