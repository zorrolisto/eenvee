<script>
  import MainLayout from "./components/layouts/mainLayout.svelte";
  import Main from "./components/main/main.svelte";
  import projectsDefault from "./mockups/projects.mockups";

  let projects =
    JSON.parse(localStorage.getItem("projects")) || projectsDefault;
  let state = "SUCCESS";
  const idLastProj = JSON.parse(
    localStorage.getItem("lastIdOfProjectSelected")
  );
  let selectedProject = idLastProj
    ? projects.find((p) => p.id === idLastProj)
    : projects[0];
  const idLastVarGroup = JSON.parse(
    localStorage.getItem("lastIdOfVariableGroupSelected")
  );
  let selectedVariablesGroup = idLastVarGroup
    ? selectedProject.variablesGroup.find((v) => v.id === idLastVarGroup)
    : selectedProject.variablesGroup[0];

  function setProjectsToLocalStorage() {
    localStorage.removeItem("projects");
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  function handleSelectVariableGroup({ detail: { variableGroup, project } }) {
    state = "IDLE";
    selectedProject = project;
    selectedVariablesGroup = variableGroup;
    localStorage.setItem("lastIdOfProjectSelected", JSON.stringify(project.id));
    localStorage.setItem(
      "lastIdOfVariableGroupSelected",
      JSON.stringify(variableGroup.id)
    );
    setTimeout(() => (state = "SUCCESS"), 0);
  }
  function addNewProject({ detail: { newProjectName } }) {
    const newProjectObj = {
      id: getRandomId(),
      name: newProjectName,
      variablesGroup: [],
    };
    projects = [...projects, newProjectObj];
    setProjectsToLocalStorage();
  }
  function getRandomId() {
    return Math.floor(Math.random() * 10000000);
  }
  function addNewVariablesGroup({
    detail: { newVariableGroupName, projectId },
  }) {
    const newVariablesGroupObj = {
      id: getRandomId(),
      name: newVariableGroupName,
      variables: [],
    };
    projects = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          variablesGroup: [...p.variablesGroup, newVariablesGroupObj],
        };
      }
      return p;
    });
    setProjectsToLocalStorage();
  }
  function duplicateVariableGroup({ detail: { variableGroup, projectId } }) {
    const newVariablesGroupObj = {
      ...variableGroup,
      name: `${variableGroup.name} (copy)`,
      id: getRandomId(),
    };
    projects = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          variablesGroup: [...p.variablesGroup, newVariablesGroupObj],
        };
      }
      return p;
    });
    setProjectsToLocalStorage();
  }
  function removeProjectByID({ detail: { id } }) {
    projects = projects.filter((p) => p.id !== id);
    setProjectsToLocalStorage();
  }
  function removeVariableGroupByID({ detail: { id, projectId } }) {
    projects = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          variablesGroup: p.variablesGroup.filter((v) => v.id !== id),
        };
      }
      return p;
    });

    setProjectsToLocalStorage();
  }
  function saveProjectName({ detail: { projectId, projectNameEdited } }) {
    projects = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          name: projectNameEdited,
        };
      }
      return p;
    });
    setProjectsToLocalStorage();
  }
  function saveVariableGroupName({
    detail: { projectId, variableGroupId, variableGroupNameEdited },
  }) {
    projects = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          variablesGroup: p.variablesGroup.map((v) =>
            v.id === variableGroupId
              ? { ...v, name: variableGroupNameEdited }
              : v
          ),
        };
      }
      return p;
    });
    setProjectsToLocalStorage();
  }
  function updateEnvVariables({
    detail: { projectId, variableGroupId, envVariablesUpdated },
  }) {
    projects = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          variablesGroup: p.variablesGroup.map((v) =>
            v.id === variableGroupId
              ? { ...v, variables: envVariablesUpdated }
              : v
          ),
        };
      }
      return p;
    });
    setProjectsToLocalStorage();
  }
</script>

<div class="flex">
  <MainLayout
    {projects}
    on:selectVariableGroup={handleSelectVariableGroup}
    on:addNewProject={addNewProject}
    on:addNewVariablesGroup={addNewVariablesGroup}
    on:removeProjectByID={removeProjectByID}
    on:removeVariableGroupByID={removeVariableGroupByID}
    on:duplicateVariableGroup={duplicateVariableGroup}
  />
  <Main
    {selectedProject}
    {selectedVariablesGroup}
    {state}
    on:saveVariableGroupName={saveVariableGroupName}
    on:saveProjectName={saveProjectName}
    on:updateEnvVariables={updateEnvVariables}
  />
</div>

<style>
  .c-flex {
    display: flex;
  }
</style>
