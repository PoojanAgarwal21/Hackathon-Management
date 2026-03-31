const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Hackease", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));

async function createTestUser() {
  try {
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    
    if (existingUser) {
      console.log("✅ Test user already exists:", existingUser.email);
      return;
    }

    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const testUser = new User({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'participant'
    });

    await testUser.save();
    console.log("✅ Test user created successfully:", testUser.email);
    console.log("📧 Email: test@example.com");
    console.log("🔑 Password: password123");
    console.log("👤 Role: participant");

  } catch (error) {
    console.error("❌ Error creating test user:", error.message);
  } finally {
    mongoose.connection.close();
  }
}

createTestUser(); 