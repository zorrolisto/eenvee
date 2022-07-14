<script>
  import MainLayout from "./components/organisms/layouts/mainLayout.svelte";
  import Main from "./components/organisms/main/main.svelte";
  import projectsDefault from "./mockups/projects.mockups";

  let projects = projectsDefault;

  let selectedProject = projects[0];
  let selectedVariablesGroup = selectedProject.variablesGroup[0];

  function handleSelectProject(event) {
    alert(event.detail.project.name);
  }
  function handleSelectVariablesGroup(event) {
    alert(event.detail.variablesGroup.name);
  }
</script>

<div class="container">
  <MainLayout
    {projects}
    on:selectProject={handleSelectProject}
    on:selectVariablesGroup={handleSelectVariablesGroup}
  />
  <Main {selectedProject} {selectedVariablesGroup} />
</div>

<style>
  .container {
    display: flex;
  }
</style>
