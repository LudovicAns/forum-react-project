export function userDto(user) {
    if (!user) return null;
    return {
        username: user.username,
        email: user.email,
        avatar: user.avatar ? "/avatars/" + user.avatar : null,
        description: user.description,
        id: user._id,
    }
}