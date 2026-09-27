export const DEFAULT_ADMIN = {
    name: "Admin",
    email: "admin@rbap.in",
    password: "adminPassword@rbap123!",
    role: "admin",
};

export const getUsers = () => {
    try {
        return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
        return [];
    }
};

export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};

export const ensureDefaultAdmin = () => {
    const users = getUsers();
    const hasAdmin = users.some((user) => user.email === DEFAULT_ADMIN.email);

    if (!hasAdmin) {
        users.unshift(DEFAULT_ADMIN);
        saveUsers(users);
    }

    if (!localStorage.getItem("appInitialized")) {
        localStorage.setItem("appInitialized", "true");
    }

    return users;
};

export const findUserByEmail = (email) => {
    return getUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());
};

export const addUser = (newUser) => {
    const users = getUsers();
    users.push(newUser);
    saveUsers(users);
};

export const createAuthToken = (user) => {
    const payload = {
        email: user.email,
        role: user.role,
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };

    return `fake.${window.btoa(JSON.stringify(payload))}.token`;
};
