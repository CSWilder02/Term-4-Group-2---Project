// QUESTIONS:
// - question?.title
//     - question?.descriptionOfIssue
//     - question?.tags

// ANSWERS:
// - answer?.title
//     - answer?.descriptionOfIssue
//     - answer?.tags

// USERS:
// - user?.fullName
//     - user?.username
//     - user?.bio

// TOPICS:
// - topic?.title


function SearchEngine(query, items) {
    // Convert query to lowercase for case-insensitive matching
    const lowercaseQuery = query?.toLowerCase();

    // Split the query into individual keywords
    const keywords = lowercaseQuery?.split(/\s+/);

    // Perform filtering and scoring based on individual keywords
    const results = items.filter(item => {
        // Calculate a score for the item based on matching keywords
        const score = keywords.reduce((totalScore, keyword) => {
            if (item?.name?.toLowerCase().includes(keyword)) {
                totalScore += 3; // Higher score for matching in the name
            }
            if (item?.description?.toLowerCase().includes(keyword)) {
                totalScore += 2; // Moderate score for matching in the description
            }
            if (item?.tags?.some(tag => tag.toLowerCase().includes(keyword))) {
                totalScore += 1; // Lower score for matching in the tags
            }
            return totalScore;
        }, 0);

        // Filter items with non-zero score (at least one keyword matched)
        return score > 0;
    });

    // Sort the results based on score in descending order
    const sortedResults = results?.sort((a, b) => {
        const scoreA = calculateScore(a, keywords);
        const scoreB = calculateScore(b, keywords);
        return scoreB - scoreA;
    });

    // console.log(sortedResults)
    return sortedResults;
}
// Function to calculate the score of an item based on keywords
function calculateScore(item, keywords) {
    return keywords?.reduce((totalScore, keyword) => {
        if (item?.name?.toLowerCase().includes(keyword)) {
            totalScore += 3; // Higher score for matching in the name
        }
        if (item?.description?.toLowerCase().includes(keyword)) {
            totalScore += 2; // Moderate score for matching in the description
        }
        if (item?.tags?.some(tag => tag.toLowerCase().includes(keyword))) {
            totalScore += 1; // Lower score for matching in the tags
        }
        return totalScore;
    }, 0);
}

export default SearchEngine;


// Example usage
// const userQuery = 'laptop ssd tech'; // Try with different queries
// const searchResults = searchItems(userQuery);

// console.log('Search Results:', searchResults);
