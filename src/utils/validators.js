const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email) => EMAIL_REGEX.test(email);

const validatePassword = (password) => typeof password === 'string' && password.length >= 8;

module.exports = { validateEmail, validatePassword };
