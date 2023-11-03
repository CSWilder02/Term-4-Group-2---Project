export const findImages = (imagesOnQuestion, images) => {

    let filteredImages = []

    if (imagesOnQuestion?.length > 0) {
        for (const image of imagesOnQuestion) {
            for (let i = 0; i < images?.length; i++) {
                if (image === images[i]?._id) {
                    filteredImages.push(images[i]?.data);
                }
                // console.log(images[i]?.data)
            }
            // console.log(image)
        }
    }
    return filteredImages; // Return the filteredImages array
}
