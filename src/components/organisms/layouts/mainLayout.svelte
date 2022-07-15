<script>
  import { createEventDispatcher } from "svelte";

  export let projects;
  const dispatch = createEventDispatcher();
  let newProjectName = null;
  let projectId = null;
  let newVariableGroupName = null;

  function selectProject(project) {
    dispatch("selectProject", { project });
  }
  function selectVariablesGroup(variablesGroup, project) {
    dispatch("selectVariablesGroup", { variablesGroup, project });
  }
  function showProjectInput() {
    newProjectName = "";
  }
  function showInputToAddGroupVariables(id) {
    projectId = id;
    newVariableGroupName = "";
  }
  function verifyKeyForProj(e) {
    if (e.which === 13) saveProject();
  }
  function verifyKeyForVar(e) {
    if (e.which === 13) saveVariableGroup();
  }
  function saveVariableGroup() {
    if (newVariableGroupName.trim() === "") return resetVariables();
    dispatch("addNewVariablesGroup", { newVariableGroupName, projectId });
    resetVariables();
  }
  function saveProject() {
    if (newProjectName.trim() === "") return resetVariables();
    dispatch("addNewProject", { newProjectName });
    resetVariables();
  }
  function removeProjectByID(id) {
    dispatch("removeProjectByID", { id });
  }
  function removeVariableGroupByID(id, projectId) {
    dispatch("removeVariableGroupByID", { id, projectId });
  }
  function resetVariables() {
    newProjectName = null;
    projectId = null;
    newVariableGroupName = null;
  }
</script>

<div class="sidebar">
  <h2>Eenvee</h2>
  <ul>
    <li>
      Projects
      <button on:click|capture={showProjectInput}>Add</button>
      <ul>
        {#each projects as project}
          <li on:click|stopPropagation={selectProject(project)}>
            {project.name}
            <button
              on:click|capture|stopPropagation={() =>
                showInputToAddGroupVariables(project.id)}
            >
              Add
            </button>
            <button
              on:click|capture|stopPropagation={() =>
                removeProjectByID(project.id)}
            >
              Remove
            </button>
            <ul>
              {#each project.variablesGroup as variableGroup}
                <li
                  on:click|stopPropagation={selectVariablesGroup(
                    variableGroup,
                    project
                  )}
                >
                  {variableGroup.name}
                  <button
                    on:click|capture|stopPropagation={() =>
                      removeVariableGroupByID(variableGroup.id, project.id)}
                  >
                    Remove
                  </button>
                </li>
              {/each}
              {#if newVariableGroupName !== null && projectId === project.id}
                <li>
                  <input
                    autofocus
                    type="text"
                    bind:value={newVariableGroupName}
                    on:keypress={verifyKeyForVar}
                    on:blur={saveVariableGroup}
                  />
                </li>
              {/if}
            </ul>
          </li>
        {/each}
        {#if newProjectName !== null}
          <li>
            <input
              autofocus
              type="text"
              bind:value={newProjectName}
              on:keypress={verifyKeyForProj}
              on:blur={saveProject}
            />
          </li>
        {/if}
      </ul>
    </li>
  </ul>
</div>

<style>
  .sidebar {
    min-height: 100vh;
    width: 500px;
    background-color: blue;
  }
</style>
