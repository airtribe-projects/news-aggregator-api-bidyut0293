// In-memory user model for demonstration purposes
const users = new Map();

let userIdCounter = 1;
const generateUserId = () => `user${userIdCounter++}`;

const createUser = async (userData) => {
    const { name, email, password, preferences = [] } = userData;
    const normalizedEmail = email.toLowerCase();

    if (users.has(normalizedEmail)) {
        const err = new Error('User already exists');
        err.code = 'USER_EXISTS';
        throw err;
    }

    const id = generateUserId();
    const user = { id, name, email: normalizedEmail, password, preferences, createdAt: new Date().toISOString() };
    users.set(normalizedEmail, user);
    return user;
};

const findUserByEmail = async (email) => {
    return users.get(email.toLowerCase()) || null;
};

const findUserById = (id) => {
    for (const user of users.values()) {
        if (user.id === id) return user;
    }
    return null;
};

const updateUserPreferences = (email, newPreferences) => {
    const normalizedEmail = email.toLowerCase();
    const user = users.get(normalizedEmail);
    if (user) {
        user.preferences = newPreferences;
        users.set(normalizedEmail, user);
        return user;
    }
    return null;
};

module.exports = { createUser, findUserByEmail, findUserById, updateUserPreferences };
