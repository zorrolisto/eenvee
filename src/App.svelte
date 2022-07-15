<script>
  import MainLayout from "./components/organisms/layouts/mainLayout.svelte";
  import Main from "./components/organisms/main/main.svelte";
  import projectsDefault from "./mockups/projects.mockups";

  let projects = projectsDefault;

  let selectedProject = projects[0];
  let selectedVariablesGroup = selectedProject.variablesGroup[0];

  function handleSelectVariablesGroup({ detail: { variablesGroup, project } }) {
    selectedProject = project;
    selectedVariablesGroup = variablesGroup;
    alert(variablesGroup.name);
  }
  function addNewProject({ detail: { newProjectName } }) {
    const newProjectObj = {
      id: Math.floor(Math.random() * 10000),
      name: newProjectName,
      variablesGroup: [],
    };
    projects = [...projects, newProjectObj];
  }
  function addNewVariablesGroup({
    detail: { newVariableGroupName, projectId },
  }) {
    const newVariablesGroupObj = {
      id: Math.floor(Math.random() * 10000),
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
  }
  function duplicateVariableGroup({ detail: { variableGroup, projectId } }) {
    const newVariablesGroupObj = {
      ...variableGroup,
      id: Math.floor(Math.random() * 10000),
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
  }
  function removeProjectByID({ detail: { id } }) {
    projects = projects.filter((p) => p.id !== id);
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
  }
</script>

<div class="container">
  <MainLayout
    {projects}
    on:selectVariablesGroup={handleSelectVariablesGroup}
    on:addNewProject={addNewProject}
    on:addNewVariablesGroup={addNewVariablesGroup}
    on:removeProjectByID={removeProjectByID}
    on:removeVariableGroupByID={removeVariableGroupByID}
    on:duplicateVariableGroup={duplicateVariableGroup}
  />
  <Main
    {selectedProject}
    {selectedVariablesGroup}
    on:saveVariableGroupName={saveVariableGroupName}
    on:saveProjectName={saveProjectName}
    on:updateEnvVariables={updateEnvVariables}
  />
</div>

<style>
  .container {
    display: flex;
  }
</style>
