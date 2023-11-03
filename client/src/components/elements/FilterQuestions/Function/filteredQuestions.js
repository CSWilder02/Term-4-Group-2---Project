export const returnFilteredQuestions = (filter, sort, questions) => {

    let filteredQuestions = [];

    if (filter === "latest") {
        if (sort === "top") {
            filteredQuestions = questions?.sort((a, b) => b.upVotes.length - a.upVotes.length);
            return filteredQuestions;
        } else if (sort === "low") {
            filteredQuestions = questions?.sort((a, b) => a.upVotes.length - b.upVotes.length);
            return filteredQuestions
        } else if (sort === "reset") {
            filteredQuestions = (questions?.sort((a, b) => new Date(b["dateAsked"]) - new Date(a["dateAsked"])))
            return questions;
        }
    } else if (filter === "most") {
        let mostQuestions = questions?.sort((a, b) => b.answers.length - a.answers.length);

        if (sort === "top") {
            filteredQuestions = mostQuestions?.sort((a, b) => b.upVotes.length - a.upVotes.length);
            return filteredQuestions
        } else if (sort === "low") {
            filteredQuestions = mostQuestions?.sort((a, b) => a.upVotes.length - b.upVotes.length);
            return filteredQuestions
        } else if (sort === "reset") {
            return mostQuestions
        }
    }
}