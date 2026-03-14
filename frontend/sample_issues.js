// Sample issues for demo - run this in browser console on index.html to populate localStorage
const sampleIssues = [
  {
    id: "#ISS-1001",
    title: "Network latency during peak hours",
    description: "Users experiencing slow response times after 2PM",
    category: "Network",
    team: "Operations",
    priority: "High",
    status: "Pending",
    dateCreated: new Date(Date.now() - 1000*60*60*1).toLocaleDateString(),
    timeCreated: new Date(Date.now() - 1000*60*60*1).toLocaleTimeString(),
    comments: ""
  },
  {
    id: "#ISS-1002",
    title: "Email notifications not sending",
    description: "SMTP service down since morning",
    category: "Software",
    team: "IT Support",
    priority: "Medium",
    status: "Pending",
    dateCreated: new Date(Date.now() - 1000*60*60*3).toLocaleDateString(),
    timeCreated: new Date(Date.now() - 1000*60*60*3).toLocaleTimeString(),
    comments: ""
  },
  {
    id: "#ISS-1003",
    title: "Dashboard chart rendering error",
    description: "Charts fail to load on refresh",
    category: "Software",
    team: "Development",
    priority: "Low",
    status: "Resolved",
    dateCreated: new Date(Date.now() - 1000*60*60*5).toLocaleDateString(),
    timeCreated: new Date(Date.now() - 1000*60*60*5).toLocaleTimeString(),
    dateClosed: new Date().toLocaleDateString(),
    resolution: "Fixed canvas rendering bug",
    comments: ""
  },
  {
    id: "#ISS-1004",
    title: "Printer queue stuck",
    description: "All print jobs pending since yesterday",
    category: "Hardware",
    team: "IT Support",
    priority: "Medium",
    status: "Resolved",
    dateCreated: new Date(Date.now() - 1000*60*60*8).toLocaleDateString(),
    timeCreated: new Date(Date.now() - 1000*60*60*8).toLocaleTimeString(),
    dateClosed: new Date().toLocaleDateString(),
    resolution: "Cleared print spooler",
    comments: ""
  },
  {
    id: "#ISS-1005",
    title: "VPN connection drops randomly",
    description: "Users disconnected every 30min",
    category: "Network",
    team: "Operations",
    priority: "High",
    status: "Resolved",
    dateCreated: new Date(Date.now() - 1000*60*60*12).toLocaleDateString(),
    timeCreated: new Date(Date.now() - 1000*60*60*12).toLocaleTimeString(),
    dateClosed: new Date().toLocaleDateString(),
    resolution: "Updated VPN firmware",
    comments: ""
  },
  {
    id: "#ISS-1006",
    title: "Backup job failed last night",
    description: "Daily backup incomplete",
    category: "Operations",
    team: "Operations",
    priority: "High",
    status: "Resolved",
    dateCreated: new Date(Date.now() - 1000*60*60*18).toLocaleDateString(),
    timeCreated: new Date(Date.now() - 1000*60*60*18).toLocaleTimeString(),
    dateClosed: new Date().toLocaleDateString(),
    resolution: "Storage quota increased",
    comments: ""
  },
  {
    id: "#ISS-1007",
    title: "User account sync issue",
    description: "AD sync not updating emails",
    category: "Security",
    team: "IT Support",
    priority: "Medium",
    status: "Pending",
    dateCreated: new Date(Date.now() - 1000*60*60*0.5).toLocaleDateString(),
    timeCreated: new Date(Date.now() - 1000*60*60*0.5).toLocaleTimeString(),
    comments: ""
  }
];

localStorage.setItem("opsTrack_issues", JSON.stringify(sampleIssues));
console.log("Sample issues loaded! Check issue_status.html");
