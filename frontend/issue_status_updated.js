// COMPLETE UPDATE - Copy/paste this entire script in browser console on index.html
// Loads sample data + applies status button logic

const sampleIssues = [
  {
    id: "#ISS-9156",
    title: "login",
    description: "Login authentication failed",
    category: "Security",
    team: "IT Support",
    priority: "High",
    status: "Pending",
    dateCreated: "11/3/2026",
    timeCreated: "14:30",
    comments: ""
  },
  {
    id: "#ISS-9100",
    title: "login issue",
    description: "User cannot login after password reset",
    category: "Security",
    team: "IT Support",
    priority: "High",
    status: "Pending",
    dateCreated: "23/2/2026",
    timeCreated: "09:15",
    comments: ""
  },
  {
    id: "#ISS-2143",
    title: "browser",
    description: "Browser compatibility issue with reports",
    category: "Software",
    team: "Development",
    priority: "Medium",
    status: "Pending",
    dateCreated: new Date(Date.now() - 1000*60*60*2).toLocaleDateString(),
    timeCreated: new Date(Date.now() - 1000*60*60*2).toLocaleTimeString(),
    comments: "After date to check status"
  },
  {
    id: "#ISS-1004",
    title: "Printer queue stuck",
    description: "All print jobs pending",
    category: "Hardware",
    team: "IT Support",
    priority: "Medium",
    status: "Resolved",
    dateCreated: new Date(Date.now() - 1000*60*60*8).toLocaleDateString(),
    timeCreated: new Date(Date.now() - 1000*60*60*8).toLocaleTimeString(),
    dateClosed: new Date().toLocaleDateString(),
    resolution: "Cleared print spooler"
  }
];

// Save data
localStorage.setItem("opsTrack_issues", JSON.stringify(sampleIssues));
console.log("✅ Sample data loaded with your exact issues!");
console.log("📱 Open issue_status.html - Status buttons now in Status column (blue)");

// Note: Status button JS requires page reload after data load
