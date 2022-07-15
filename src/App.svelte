<script>
  import MainLayout from "./components/organisms/layouts/mainLayout.svelte";
  import Main from "./components/organisms/main/main.svelte";
  import projectsDefault from "./mockups/projects.mockups";

  let projects = projectsDefault;

  let selectedProject = projects[0];
  let selectedVariablesGroup = selectedProject.variablesGroup[0];

  function handleSelectProject({ detail: { project } }) {
    alert(project.name);
  }
  function handleSelectVariablesGroup({ detail: { variablesGroup } }) {
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
</script>

<div class="container">
  <MainLayout
    {projects}
    on:selectProject={handleSelectProject}
    on:selectVariablesGroup={handleSelectVariablesGroup}
    on:addNewProject={addNewProject}
    on:addNewVariablesGroup={addNewVariablesGroup}
    on:removeProjectByID={removeProjectByID}
    on:removeVariableGroupByID={removeVariableGroupByID}
  />
  <Main {selectedProject} {selectedVariablesGroup} />
</div>

<style>
  .container {
    display: flex;
  }
</style>
