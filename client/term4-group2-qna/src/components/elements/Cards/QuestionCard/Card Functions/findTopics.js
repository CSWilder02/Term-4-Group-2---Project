export const findTopics = (topicsOnQuestion, topics) => {

    let filteredTopics = []

    if (topicsOnQuestion?.length > 0) {
        for (const topic of topicsOnQuestion) {
            for (let i = 0; i < topics?.length; i++) {
                if (topic === topics[i]?._id) {
                    filteredTopics.push(topics[i]?.title);
                }
                // console.log("tooopic", topics[i]?.title)
            }
            // console.log("tooopic", topics)
        }
        // console.log("tooopicsss", topics)
    }
    return filteredTopics; // Return the filteredImages array
}
