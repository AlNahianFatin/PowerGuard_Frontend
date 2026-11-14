const prefix = "/technician";

export const technicianRoutes = [
  {
    title: "Schedule",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Create Schedule",
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
        isActive: true,
      },
    ],
  },
];
