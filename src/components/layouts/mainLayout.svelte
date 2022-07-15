<script>
  import { createEventDispatcher } from "svelte";

  export let projects;
  const dispatch = createEventDispatcher();
  let newProjectName = null;
  let projectId = null;
  let newVariableGroupName = null;

  function selectVariableGroup(variableGroup, project) {
    dispatch("selectVariableGroup", { variableGroup, project });
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
  function duplicateVariableGroup(variableGroup, projectId) {
    dispatch("duplicateVariableGroup", { variableGroup, projectId });
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

<div class="sidebar bg-indigo-700 text-white p-5">
  <h2 class="text-4xl font-semibold">Eenvee</h2>
  <ul>
    <li class="text-2xl py-3 font-semibold">
      <div class="flex space-x-2">
        <p class="p-2 cursor-default">Projects</p>
        <button
          on:click|capture={showProjectInput}
          class="hover:text-green-500 rounded px-2 py-1 hover:bg-indigo-800"
        >
          <i class="fa-solid fa-plus" />
        </button>
      </div>
      <ul>
        {#each projects as project}
          <li class="text-lg my-2 py-2 rounded-lg border-2 border-indigo-800">
            <div class="flex space-x-2">
              <p class="rounded cursor-default p-2 ml-2">
                {project.name}
              </p>
              <button
                on:click|capture|stopPropagation={() =>
                  showInputToAddGroupVariables(project.id)}
                class="hover:text-green-500 rounded px-2 py-1 hover:bg-indigo-800"
              >
                <i class="fa-solid fa-plus" />
              </button>
              <button
                on:click|capture|stopPropagation={() =>
                  removeProjectByID(project.id)}
                class="hover:text-red-500 rounded px-2 py-1 hover:bg-indigo-800"
              >
                <i class="fa-solid fa-trash-can" />
              </button>
            </div>
            <ul>
              {#each project.variablesGroup as variableGroup}
                <li
                  class="text-base rounded mx-2 my-1 px-2 flex space-x-1"
                  on:click|stopPropagation={selectVariableGroup(
                    variableGroup,
                    project
                  )}
                >
                  <p class="rounded cursor-pointer p-2 hover:bg-indigo-800">
                    {variableGroup.name}
                  </p>
                  <button
                    on:click|capture|stopPropagation={() =>
                      duplicateVariableGroup(variableGroup, project.id)}
                    class="hover:text-yellow-500 rounded px-2 py-1 hover:bg-indigo-800"
                  >
                    <i class="fa-solid fa-clone" />
                  </button>
                  <button
                    on:click|capture|stopPropagation={() =>
                      removeVariableGroupByID(variableGroup.id, project.id)}
                    class="hover:text-red-500 rounded px-2 py-1 hover:bg-indigo-800"
                  >
                    <i class="fa-solid fa-trash-can" />
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
    width: 350px;
  }
</style>
