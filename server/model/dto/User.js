export function userDto(user) {
    return {
        username: user.username,
        email: user.email,
        id: user._id,
    }
}