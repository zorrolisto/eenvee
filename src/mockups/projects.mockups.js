const projectsDefault = [
  {
    id: "1",
    name: "Dummy Project",
    variablesGroup: [
      {
        id: "1",
        name: "Dummy Base variables",
        variables: [
          { field: "DB_URL", value: "db:3665?password=123&user=admin" },
          { field: "URL", value: "http://localhost:3000" },
          { field: "GOOGLE_SECRET", value: "9J$4F5DI2)JXS4HE353J" },
        ],
      },
      {
        id: "2",
        name: "Dummy Other variables",
        variables: [
          { field: "DB_URL", value: "OTHERdb:3665?password=123&user=admin&" },
          { field: "URL", value: "http://localhost:3000/OTHER" },
          { field: "GOOGLE_SECRET", value: "OTHER9J$4F5DI2)JXS4HE353" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Unknown Project",
    variablesGroup: [
      {
        id: "3",
        name: "Unknown base variables",
        variables: [
          { field: "DB_URL", value: "db:3665?password=123&user=admin" },
          { field: "URL", value: "http://localhost:3000" },
          { field: "GOOGLE_SECRET", value: "9J$4F5DI2)JXS4HE353J" },
        ],
      },
    ],
  },
];
export default projectsDefault;
