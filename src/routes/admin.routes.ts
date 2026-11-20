const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Technician Approval",
        url: `${prefix}/approve-technician`,
      },
      {
        title: "All Schedules",
        url: `${prefix}/schedules`,
      },
      {
        title: "Service Requests",
        url: `${prefix}/service-requests`,
      },
      {
        title: "All Assignments",
        url: `${prefix}/assignments`,
      },
      {
        title: "My Assignments",
        url: `${prefix}/my-assignments`,
      },
    ],
  },
  {
    title: "Account Settings",
    items: [
      {
        title: "Change Password",
        url: `${prefix}/change-password`,
      },
      {
        title: "Data Fetching",
        url: "#",
      },
    ],
  },
];
