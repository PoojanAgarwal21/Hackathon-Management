const mongoose = require('mongoose');
const Hackathon = require('./models/Hackathon');
const ParticipantRegistration = require('./models/ParticipantRegistration');
const RoundSubmission = require('./models/RoundSubmission');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hackease', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function createTestData() {
    try {
        // Create a test hackathon with 3 rounds
        const hackathon = new Hackathon({
            title: 'AI Innovation Challenge 2025',
            location: 'Virtual',
            regStart: new Date('2025-01-01'),
            regEnd: new Date('2025-01-31'),
            prize1: '₹50,000',
            prize2: '₹30,000',
            prize3: '₹20,000',
            maxTeamSize: 4,
            description: 'A hackathon focused on AI and machine learning innovations',
            problem: ['Build an AI-powered solution', 'Create a machine learning model', 'Develop an intelligent application'],
            rounds: [
                {
                    name: 'Initial Screening',
                    description: 'Basic project submission and initial evaluation',
                    guidelines: 'Submit your project idea and basic implementation',
                    start: new Date('2025-02-01'),
                    end: new Date('2025-02-15'),
                    link: 'https://example.com/round1'
                },
                {
                    name: 'Development Phase',
                    description: 'Build and refine your solution',
                    guidelines: 'Develop your project with more features and improvements',
                    start: new Date('2025-02-16'),
                    end: new Date('2025-03-01'),
                    link: 'https://example.com/round2'
                },
                {
                    name: 'Final Presentation',
                    description: 'Present your final solution to judges',
                    guidelines: 'Prepare a comprehensive presentation and demo',
                    start: new Date('2025-03-02'),
                    end: new Date('2025-03-15'),
                    link: 'https://example.com/round3'
                }
            ],
            createdBy: 'test@example.com',
            organizerName: 'TechCorp Solutions',
            judgeEmails: ['judge@example.com'],
            isPublic: true
        });

        await hackathon.save();
        console.log('✅ Hackathon created:', hackathon._id);

        // Create test teams
        const teams = [
            {
                teamName: 'TechVision AI',
                leaderName: 'Arjun Sharma',
                leaderEmail: 'arjun@example.com',
                mobile: '9876543210',
                gender: 'Male',
                institute: 'IIT Delhi',
                teamMembers: [
                    { name: 'Priya Patel', email: 'priya@example.com', gender: 'Female' },
                    { name: 'Vikash Kumar', email: 'vikash@example.com', gender: 'Male' },
                    { name: 'Meera Singh', email: 'meera@example.com', gender: 'Female' }
                ],
                projectLink: 'https://demo.example.com/techvision',
                hackathonId: hackathon._id
            },
            {
                teamName: 'InnovatorsHub',
                leaderName: 'Rahul Gupta',
                leaderEmail: 'rahul@example.com',
                mobile: '9876543211',
                gender: 'Male',
                institute: 'BITS Pilani',
                teamMembers: [
                    { name: 'Anjali Verma', email: 'anjali@example.com', gender: 'Female' },
                    { name: 'Karan Joshi', email: 'karan@example.com', gender: 'Male' },
                    { name: 'Simran Kaur', email: 'simran@example.com', gender: 'Female' }
                ],
                projectLink: 'https://demo.example.com/innovatorshub',
                hackathonId: hackathon._id
            },
            {
                teamName: 'AI Pioneers',
                leaderName: 'Deepak Agarwal',
                leaderEmail: 'deepak@example.com',
                mobile: '9876543212',
                gender: 'Male',
                institute: 'NIT Trichy',
                teamMembers: [
                    { name: 'Nisha Reddy', email: 'nisha@example.com', gender: 'Female' },
                    { name: 'Rohit Malhotra', email: 'rohit@example.com', gender: 'Male' },
                    { name: 'Kavya Saxena', email: 'kavya@example.com', gender: 'Female' }
                ],
                projectLink: 'https://demo.example.com/aipioneers',
                hackathonId: hackathon._id
            }
        ];

        const savedTeams = [];
        for (const teamData of teams) {
            const team = new ParticipantRegistration(teamData);
            await team.save();
            savedTeams.push(team);
            console.log('✅ Team created:', team.teamName);
        }

        // Create round submissions for each team
        for (const team of savedTeams) {
            // Round 1 submissions
            const round1Submission = new RoundSubmission({
                hackathonId: hackathon._id,
                roundNumber: 1,
                teamId: team._id,
                projectTitle: `${team.teamName} - Initial Project`,
                submissionLink: team.projectLink,
                githubLink: `https://github.com/${team.teamName.toLowerCase().replace(/\s+/g, '')}`,
                techStack: ['Python', 'TensorFlow', 'React', 'Node.js'],
                category: 'AI/ML',
                notes: 'Initial project submission for Round 1',
                submittedAt: new Date('2025-02-10'),
                evaluated: true,
                selectedForNext: team.teamName !== 'AI Pioneers', // AI Pioneers don't make it to round 2
                evaluations: [{
                    judgeEmail: 'judge@example.com',
                    round: 1,
                    score: team.teamName !== 'AI Pioneers' ? 85 : 45, // Add actual scores
                    feedback: team.teamName !== 'AI Pioneers' 
                        ? `Great initial concept! Looking forward to seeing the development in the next round.`
                        : `Interesting idea but needs more technical depth and implementation details.`,
                    selectedForNext: team.teamName !== 'AI Pioneers',
                    evaluatedAt: new Date('2025-02-16')
                }]
            });
            await round1Submission.save();
            console.log('✅ Round 1 submission created for:', team.teamName);

            // Round 2 submissions (only for teams that would be selected)
            if (team.teamName !== 'AI Pioneers') { // Simulate one team not making it to round 2
                const round2Submission = new RoundSubmission({
                    hackathonId: hackathon._id,
                    roundNumber: 2,
                    teamId: team._id,
                    projectTitle: `${team.teamName} - Enhanced Project`,
                    submissionLink: team.projectLink,
                    githubLink: `https://github.com/${team.teamName.toLowerCase().replace(/\s+/g, '')}`,
                    techStack: ['Python', 'TensorFlow', 'React', 'Node.js', 'Docker', 'AWS'],
                    category: 'AI/ML',
                    notes: 'Enhanced project submission for Round 2',
                    submittedAt: new Date('2025-02-25'),
                    evaluated: true,
                    selectedForNext: true, // Both teams make it to final round
                    evaluations: [{
                        judgeEmail: 'judge@example.com',
                        round: 2,
                        score: 92, // Add actual score for round 2
                        feedback: `Excellent progress! The enhanced features and deployment setup show great technical advancement. Ready for the final round!`,
                        selectedForNext: true,
                        evaluatedAt: new Date('2025-03-02')
                    }]
                });
                await round2Submission.save();
                console.log('✅ Round 2 submission created for:', team.teamName);

                // Round 3 submissions (final round) with different scores
                const finalScore = team.teamName === 'TechVision AI' ? 94 : 87; // TechVision wins
                const round3Submission = new RoundSubmission({
                    hackathonId: hackathon._id,
                    roundNumber: 3,
                    teamId: team._id,
                    projectTitle: `${team.teamName} - Final Project`,
                    submissionLink: team.projectLink,
                    githubLink: `https://github.com/${team.teamName.toLowerCase().replace(/\s+/g, '')}`,
                    techStack: ['Python', 'TensorFlow', 'React', 'Node.js', 'Docker', 'AWS', 'Kubernetes'],
                    category: 'AI/ML',
                    notes: 'Final project submission for Round 3',
                    submittedAt: new Date('2025-03-10'),
                    evaluated: true,
                    selectedForNext: false, // Final round, no next round
                    finalScore: finalScore,
                    evaluations: [{
                        judgeEmail: 'judge@example.com',
                        round: 3,
                        score: finalScore,
                        feedback: team.teamName === 'TechVision AI' 
                            ? `Outstanding final presentation! Exceptional AI model with practical implementation, excellent technical architecture, and seamless demo. The innovation in approach and real-world applicability sets this project apart.`
                            : `Strong technical foundation with innovative approach to problem solving. Good implementation but could improve on scalability and user experience. Overall solid performance!`,
                        selectedForNext: false,
                        evaluatedAt: new Date('2025-03-16')
                    }]
                });
                await round3Submission.save();
                console.log('✅ Round 3 submission created for:', team.teamName, `(Score: ${finalScore})`);
            }
        }

        console.log('\n🎉 Test data created successfully!');
        console.log('📊 Summary:');
        console.log('- 1 Hackathon with 3 rounds');
        console.log('- 3 Teams');
        console.log('- 7 Round submissions (2 teams made it to final round)');
        console.log('- Final scores: TechVision AI (94), InnovatorsHub (87)');
        console.log('- AI Pioneers eliminated in Round 1');
        console.log('\n🔗 You can now test the evaluation system with this data.');
        console.log('\n👥 Test Participants:');
        console.log('- arjun@example.com (TechVision AI - 1st Place)');
        console.log('- rahul@example.com (InnovatorsHub - 2nd Place)');
        console.log('- deepak@example.com (AI Pioneers - Eliminated Round 1)');

    } catch (error) {
        console.error('❌ Error creating test data:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Run the script
createTestData(); 