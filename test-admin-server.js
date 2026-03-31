const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Mock data
let mockHackathons = [
    {
        _id: "1",
        title: "AI Innovation Challenge 2025",
        location: "Virtual",
        regStart: "2025-01-01T00:00:00.000Z",
        regEnd: "2025-02-01T00:00:00.000Z",
        description: "Build innovative AI solutions",
        createdBy: "admin@hackease.com",
        judgeEmails: ["judge1@example.com", "judge2@example.com"]
    },
    {
        _id: "2", 
        title: "Web Development Hackathon",
        location: "San Francisco",
        regStart: "2025-01-15T00:00:00.000Z",
        regEnd: "2025-02-15T00:00:00.000Z",
        description: "Create amazing web applications",
        createdBy: "admin@hackease.com",
        judgeEmails: ["judge3@example.com"]
    }
];

let mockUsers = [
    {
        _id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        role: "participant",
        college: "MIT",
        createdAt: "2024-12-01T00:00:00.000Z"
    },
    {
        _id: "2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        role: "organizer",
        company: "Tech Corp",
        createdAt: "2024-12-02T00:00:00.000Z"
    },
    {
        _id: "3",
        firstName: "Dr. Bob",
        lastName: "Johnson",
        email: "judge1@example.com",
        role: "judge",
        company: "University of Tech",
        createdAt: "2024-12-03T00:00:00.000Z"
    }
];

let mockRegistrations = [
    {
        _id: "1",
        teamName: "Team CodeCrafters",
        hackathonId: { title: "AI Innovation Challenge 2025" },
        members: ["john@example.com", "alice@example.com"],
        registeredAt: "2024-12-10T00:00:00.000Z",
        status: "accepted"
    },
    {
        _id: "2",
        teamName: "Web Warriors",
        hackathonId: { title: "Web Development Hackathon" },
        members: ["bob@example.com"],
        registeredAt: "2024-12-12T00:00:00.000Z",
        status: "pending"
    }
];

let mockSubmissions = [
    {
        _id: "1",
        teamName: "Team CodeCrafters",
        hackathonId: { title: "AI Innovation Challenge 2025" },
        projectTitle: "AI-Powered Chatbot",
        submittedAt: "2024-12-20T00:00:00.000Z",
        status: "evaluated",
        score: 85
    },
    {
        _id: "2",
        teamName: "Web Warriors",
        hackathonId: { title: "Web Development Hackathon" },
        projectTitle: "E-commerce Platform",
        submittedAt: "2024-12-22T00:00:00.000Z",
        status: "pending",
        score: null
    }
];

// Admin authentication middleware
const adminAuthMiddleware = (req, res, next) => {
    const adminEmail = req.headers['admin-email'];
    const adminToken = req.headers['admin-token'];
    
    if (adminEmail === 'admin@hackease.com' && adminToken === 'admin-session-token') {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized admin access' });
    }
};

// Admin routes
app.use('/api/admin', adminAuthMiddleware);

// Get dashboard statistics
app.get('/api/admin/stats', (req, res) => {
    res.json({
        users: mockUsers.length,
        hackathons: mockHackathons.length,
        registrations: mockRegistrations.length,
        submissions: mockSubmissions.length,
        queries: 5
    });
});

// Get all users
app.get('/api/admin/users', (req, res) => {
    res.json(mockUsers);
});

// Get users by role
app.get('/api/admin/users/role/:role', (req, res) => {
    const users = mockUsers.filter(user => user.role === req.params.role);
    res.json(users);
});

// Get all hackathons
app.get('/api/admin/hackathons', (req, res) => {
    res.json(mockHackathons);
});

// Create hackathon
app.post('/api/admin/hackathons', (req, res) => {
    const newHackathon = {
        _id: Date.now().toString(),
        ...req.body,
        createdBy: 'admin@hackease.com',
        judgeEmails: []
    };
    mockHackathons.push(newHackathon);
    res.status(201).json({ message: "Hackathon created successfully", hackathon: newHackathon });
});

// Add judge to hackathon
app.post('/api/admin/hackathons/:id/judges', (req, res) => {
    const hackathon = mockHackathons.find(h => h._id === req.params.id);
    if (!hackathon) {
        return res.status(404).json({ message: "Hackathon not found" });
    }
    
    const { judgeEmail } = req.body;
    if (!hackathon.judgeEmails.includes(judgeEmail)) {
        hackathon.judgeEmails.push(judgeEmail);
    }
    
    res.json({ message: "Judge added successfully", hackathon });
});

// Get all registrations
app.get('/api/admin/registrations', (req, res) => {
    res.json(mockRegistrations);
});

// Get registrations by status
app.get('/api/admin/registrations/status/:status', (req, res) => {
    const registrations = mockRegistrations.filter(reg => reg.status === req.params.status);
    res.json(registrations);
});

// Get all submissions
app.get('/api/admin/submissions', (req, res) => {
    res.json(mockSubmissions);
});

// Get submissions by status
app.get('/api/admin/submissions/status/:status', (req, res) => {
    const submissions = mockSubmissions.filter(sub => sub.status === req.params.status);
    res.json(submissions);
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: "Test server is running!", timestamp: new Date().toISOString() });
});

// Start server
app.listen(5001, () => {
    console.log("🚀 Test server running at http://localhost:5001");
    console.log("📊 Admin panel is fully connected!");
    console.log("🔐 Admin credentials: admin@hackease.com / admin123");
    console.log("🌐 Access admin panel at: http://localhost:5001/frontend/admin-login.html");
}); 