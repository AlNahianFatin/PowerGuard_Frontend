const prefix = "/operator";

export const operatorRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "All Technicians",
        url: `${prefix}/approve-technician`,
      },
      {
        title: "All Schedules",
        url: `${prefix}/schedules`,
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
