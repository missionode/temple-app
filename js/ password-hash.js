/* password-hash.js */

// Example using a simple hashing function (for demonstration purposes only)
// In a real-world application, use a robust library like bcrypt or scrypt.

function hashPassword(password) {
    // Simple hashing function (replace with a secure hashing algorithm)
    let hash = 0;
    if (password.length === 0) {
        return hash;
    }
    for (let i = 0; i < password.length; i++) {
        let char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
}

function verifyPassword(password, hashedPassword) {
    // Verify password against hashed password
    return hashPassword(password) === hashedPassword;
}

// Example usage (replace with your actual implementation)
// const password = "mysecretpassword";
// const hashedPassword = hashPassword(password);
// console.log("Hashed password:", hashedPassword);

// const passwordToVerify = "mysecretpassword";
// const isPasswordCorrect = verifyPassword(passwordToVerify, hashedPassword);
// console.log("Password correct:", isPasswordCorrect);

// In a real application you would use a secure library like bcrypt.
// Example using bcrypt (assuming bcrypt is included in your project):
// async function hashPasswordBcrypt(password) {
//     const saltRounds = 10; // Adjust salt rounds as needed
//     return await bcrypt.hash(password, saltRounds);
// }

// async function verifyPasswordBcrypt(password, hashedPassword) {
//     return await bcrypt.compare(password, hashedPassword);
// }

// Example usage with bcrypt
// async function exampleBcrypt() {
//   const password = "mysecretpassword";
//   const hashedPassword = await hashPasswordBcrypt(password);
//   console.log("bcrypt Hashed password:", hashedPassword);

//   const passwordToVerify = "mysecretpassword";
//   const isPasswordCorrect = await verifyPasswordBcrypt(passwordToVerify, hashedPassword);
//   console.log("bcrypt Password correct:", isPasswordCorrect);
// }

// exampleBcrypt();