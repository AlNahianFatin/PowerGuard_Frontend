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
        title: "My Service Requests",
        url: `${prefix}/my-service-requests`,
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
