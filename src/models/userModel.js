// In-memory user model for demonstration purposes
const users = new Map();

// Generate a unique ID for the user
let userIdCounter = 1;
const generateUserId = () => `user${userIdCounter++}`;

// Create a new user
const createUser = async (userData) => {
    const {name, email, password, preferences = []} = userData;

    // Check if user already exists
    if (users.has(email)) {
        return {error: 'User already exists'};
    }

    const id = generateUserId();
    const user = {id, name, email, password, preferences, createdAt: new Date().toISOString()};

    users.set(email, user);
    return user;
};

// Find a user by email
const findUserByEmail = (email) => {
    return users.get(email) || null;
};

// Find a user by ID
const findUserById = (id) => {
    for (const user of users.values()) {
        if (user.id === id) {
            return user;
        }
    }
    return null;
};

// Update user preferences
const updateUserPreferences = (email, newPreferences) => {
    const user = users.get(email);
    if (user) {
        user.preferences = newPreferences;
        users.set(email, user);
        return user;
    }
    return null;
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUserPreferences
};
