import bcrypt from "bcrypt";

// Fake users (demo only)
const users = [
  {
    id: "user_123",
    email: "user@example.com",
    passwordHash: bcrypt.hashSync("password123", 10),
  },
];

export function findUserByEmail(email) {
  return users.find((u) => u.email === email);
}
