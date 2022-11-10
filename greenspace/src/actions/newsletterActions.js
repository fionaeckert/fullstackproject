export const addUser = (first_name, last_name, email, interests, availability) => {
    return{
        type:"ADD_USER",
        data: {
            first_name, last_name, email, interests, availability
        }
    }
}