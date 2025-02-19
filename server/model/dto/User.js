export function userDto(user) {
    return {
        username: user.username,
        email: user.email,
        avatar: user.avatar ? "/avatars/" + user.avatar : null,
        description: user.description,
        id: user._id,
    }
}