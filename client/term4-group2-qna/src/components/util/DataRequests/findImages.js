import React, { useState } from 'react';
import { useImages } from '../UseContext/imagesContext';

const FindImages = ({ imagesOnQuestion }) => {
    const { images } = useImages();
    const [imageList, setImageList] = useState(images)
    let filteredImages = [];

    if (imagesOnQuestion?.length > 0) {
        for (const image of imagesOnQuestion) {
            for (let i = 0; i < imageList?.length; i++) {
                if (image === imageList[i]?._id) {
                    filteredImages.push(imageList[i]?.data);
                }
                console.log(imageList[i]?.data)
            }
            console.log(imageList)
        }
    }
    return filteredImages; // Return the filteredImages array
};

export default FindImages;
