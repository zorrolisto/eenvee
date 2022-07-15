const projectsDefault = [
  {
    name: "Portal Project",
    variablesGroup: [
      {
        name: "Owl Solutions variables",
        variables: [
          { field: "BD_URL", value: "db:3665?password=123&user=admin" },
          { field: "NEXT_AUTH_URL", value: "http://localhost:3000" },
          { field: "GOOGLE_SECRET", value: "9J$4F5DI2)JXS4HE353J" },
        ],
      },
      {
        name: "Mercado variables",
        variables: [
          { field: "BD_URL", value: "db:3665?password=123&user=admin&MERCADO" },
          { field: "NEXT_AUTH_URL", value: "http://localhost:3000/MERCADO" },
          { field: "GOOGLE_SECRET", value: "9J$4F5DI2)JXS4HE353/MERCADO" },
        ],
      },
    ],
  },
  {
    name: "Admin Console Project",
    variablesGroup: [
      {
        name: "Owl Solutions variables",
        variables: [
          { field: "BD_URL", value: "db:3665?password=123&user=admin" },
          { field: "NEXT_AUTH_URL", value: "http://localhost:3000" },
          { field: "GOOGLE_SECRET", value: "9J$4F5DI2)JXS4HE353J" },
        ],
      },
    ],
  },
];
export default projectsDefault;
