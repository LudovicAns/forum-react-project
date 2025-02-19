export function userDto(user) {
    return {
        username: user.username,
        email: user.email,
        description: user.description,
        id: user._id,
    }
}