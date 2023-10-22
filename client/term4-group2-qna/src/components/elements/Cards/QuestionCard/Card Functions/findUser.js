export const findUser = (userOnQuestion, users) => {

    let filteredUser

    if (userOnQuestion !== "") {

        for (let i = 0; i < users?.length; i++) {
            if (userOnQuestion === users[i]?._id) {
                filteredUser = users[i]
                // console.log("USERRR", userOnQuestion)
            }
        }
    }
    return filteredUser;
}
