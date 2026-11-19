const prefix = "/customer";

export const customerRoutes = [
  {
    title: "Service",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Submit Service Request",
        url: `${prefix}/submit-request`,
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
