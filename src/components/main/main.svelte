<script>
  import InputsGroup from "../inputsGroup/inputsGroup.svelte";
  import TextEditor from "../textEditor/textEditor.svelte";
  import { createEventDispatcher } from "svelte";

  export let selectedProject;
  export let selectedVariablesGroup;
  export let state;
  const dispatch = createEventDispatcher();
  let selectedTypeOfView = "AsInputs";
  let projectNameEdited = null;
  let variableGroupNameEdited = null;

  const selectViewAsInputs = () => (selectedTypeOfView = "AsInputs");
  const selectViewAsText = () => (selectedTypeOfView = "AsText");
  function updateEnvVariables({ detail: { envVariablesUpdated } }) {
    selectedVariablesGroup.variables = envVariablesUpdated;
    dispatch("updateEnvVariables", {
      projectId: selectedProject.id,
      variableGroupId: selectedVariablesGroup.id,
      envVariablesUpdated,
    });
    alert("New Env Variables saved");
  }
  function showEditInputForProjectName() {
    projectNameEdited = selectedProject.name;
  }
  function showEditInputForVariableGroupName() {
    variableGroupNameEdited = selectedVariablesGroup.name;
  }
  function verifyKeyForProj(e) {
    if (e.which === 13) saveProjectName();
  }
  function verifyKeyForVar(e) {
    if (e.which === 13) saveVariableGroupName();
  }
  function saveVariableGroupName() {
    selectedVariablesGroup.name = variableGroupNameEdited;
    dispatch("saveVariableGroupName", {
      projectId: selectedProject.id,
      variableGroupId: selectedVariablesGroup.id,
      variableGroupNameEdited,
    });
    resetVariables();
  }
  function saveProjectName() {
    selectedProject.name = projectNameEdited;
    dispatch("saveProjectName", {
      projectId: selectedProject.id,
      projectNameEdited,
    });
    resetVariables();
  }
  function copyTextFromVariables() {
    copyToClipbard(
      selectedVariablesGroup.variables
        .map((v) => `${v.field} = ${v.value} \n`)
        .reduce((a, b) => a + b)
    );
  }
  function copyToClipbard(text) {
    navigator.clipboard.writeText(text);
  }
  function resetVariables() {
    projectNameEdited = null;
    variableGroupNameEdited = null;
  }
</script>

<div class="main p-5 flex flex-col items-center space-y-3">
  {#if projectNameEdited === null}
    <div class="flex space-x-2 items-center">
      <h3 class="text-3xl font-bold">{selectedProject.name}</h3>
      <button
        class="rounded px-2 py-1 hover:text-indigo-700 border-2 hover:border-indigo-700"
        on:click={showEditInputForProjectName}
      >
        <i class="fa-solid fa-pen" />
      </button>
    </div>
  {:else}
    <input
      class="text-3xl border-indigo-700 text-bold my-2 p-1"
      autofocus
      type="text"
      bind:value={projectNameEdited}
      on:keypress={verifyKeyForProj}
      on:blur={saveProjectName}
    />
  {/if}
  {#if variableGroupNameEdited === null}
    <div class="flex space-x-2 items-center">
      <h4 class="text-2xl font-semibold">{selectedVariablesGroup.name}</h4>
      <button
        class="rounded px-2 py-1 hover:text-indigo-700 border-2 hover:border-indigo-700"
        on:click={showEditInputForVariableGroupName}
      >
        <i class="fa-solid fa-pen" />
      </button>
    </div>
  {:else}
    <input
      class="text-2xl border-indigo-700 text-bold my-2 p-1"
      autofocus
      type="text"
      bind:value={variableGroupNameEdited}
      on:keypress={verifyKeyForVar}
      on:blur={saveVariableGroupName}
    />
  {/if}
  <button
    class="flex items-center gap-2 w-min whitespace-nowrap py-2 px-3 font-semibold rounded-md text-white bg-indigo-700 border-2 border-indigo-700 hover:bg-indigo-800"
    on:click={copyTextFromVariables}
  >
    <i class="fa-solid fa-clipboard" />
    <p>Copy All Variables</p>
  </button>
  <div class="flex rounded-md shadow-sm" role="group">
    <button
      on:click={selectViewAsInputs}
      type="button"
      class={`py-2 px-3 font-semibold rounded-l-md border-2 border-indigo-700 ${
        selectedTypeOfView === "AsInputs"
          ? "bg-indigo-700 text-white hover:bg-indigo-800"
          : "text-indigo-700 hover:bg-gray-100"
      }`}
    >
      Show As Inputs
    </button>
    <button
      on:click={selectViewAsText}
      type="button"
      class={`py-2 px-3 font-semibold rounded-r-md border-2 border-indigo-700 ${
        selectedTypeOfView !== "AsInputs"
          ? "bg-indigo-700 text-white hover:bg-indigo-800"
          : "text-indigo-700 hover:bg-gray-100"
      }`}
    >
      Show As Text
    </button>
  </div>

  {#if state === "SUCCESS"}
    {#if selectedTypeOfView === "AsInputs"}
      <InputsGroup
        variables={selectedVariablesGroup.variables}
        on:updateEnvVariables={updateEnvVariables}
      />
    {:else}
      <TextEditor
        variables={selectedVariablesGroup.variables}
        on:updateEnvVariables={updateEnvVariables}
      />
    {/if}
  {/if}
</div>

<style>
  .main {
    min-height: 100vh;
    width: calc(100vw - 350px);
  }
</style>
