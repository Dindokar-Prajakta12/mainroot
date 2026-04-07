import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "data.json");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const loadData = () => {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    } catch (error) {
        return {
            users: [],
            managerTeam: [],
            userTasks: [],
            adminStats: {},
        };
    }
};

const saveData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
};

const createAuthToken = (user) => {
    const payload = {
        name: user.name,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };
    return `fake.${Buffer.from(JSON.stringify(payload)).toString("base64")}.token`;
};

const decodeAuthToken = (token) => {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    try {
        return JSON.parse(Buffer.from(parts[1], "base64").toString("utf8"));
    } catch (error) {
        return null;
    }
};

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
    const decoded = decodeAuthToken(token);

    if (!decoded || decoded.exp <= Math.floor(Date.now() / 1000)) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }

    req.user = decoded;
    next();
};

const authorize = (role) => (req, res, next) => {
    if (!req.user || req.user.role !== role) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const data = loadData();
    const user = data.users.find(
        (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = createAuthToken(user);
    return res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
});

app.post("/api/auth/register", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const data = loadData();
    const existingUser = data.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return res.status(409).json({ message: "This email is already registered." });
    }

    const newUser = {
        name,
        email,
        password,
        role: "user",
    };
    data.users.push(newUser);
    saveData(data);

    return res.status(201).json({ message: "Registration successful." });
});

app.get("/api/auth/me", authenticate, (req, res) => {
    res.json({ user: req.user });
});

app.get("/api/admin/users", authenticate, authorize("admin"), (req, res) => {
    const data = loadData();
    const users = data.users.map((user) => ({ name: user.name, email: user.email, role: user.role }));
    res.json({ users });
});

app.get("/api/dashboard/summary", authenticate, (req, res) => {
    const data = loadData();
    const role = req.user.role;

    if (role === "admin") {
        return res.json({ summary: data.adminStats });
    }

    if (role === "manager") {
        return res.json({ summary: { teamSize: data.managerTeam.length, pendingApprovals: 7, projects: 4 } });
    }

    if (role === "user") {
        return res.json({ summary: { tasks: data.userTasks.length, completed: data.userTasks.filter((task) => task.completed).length } });
    }

    return res.status(403).json({ message: "Unauthorized role." });
});

app.get("/api/manager/team", authenticate, authorize("manager"), (req, res) => {
    const data = loadData();
    res.json({ team: data.managerTeam });
});

app.get("/api/user/tasks", authenticate, authorize("user"), (req, res) => {
    const data = loadData();
    res.json({ tasks: data.userTasks });
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend server running on http://localhost:${PORT}`);
});
