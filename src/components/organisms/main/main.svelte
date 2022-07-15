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

<div class="main">
  {#if projectNameEdited === null}
    <div>
      <h3>{selectedProject.name}</h3>
      <button on:click={showEditInputForProjectName}>Edit</button>
    </div>
  {:else}
    <input
      autofocus
      type="text"
      bind:value={projectNameEdited}
      on:keypress={verifyKeyForProj}
      on:blur={saveProjectName}
    />
  {/if}
  <br />
  {#if variableGroupNameEdited === null}
    <div>
      <h4>{selectedVariablesGroup.name}</h4>
      <button on:click={showEditInputForVariableGroupName}>Edit</button>
    </div>
  {:else}
    <input
      autofocus
      type="text"
      bind:value={variableGroupNameEdited}
      on:keypress={verifyKeyForVar}
      on:blur={saveVariableGroupName}
    />
  {/if}
  <br />
  <div>
    <button on:click={selectViewAsInputs}>Show As Inputs</button>
    <button on:click={selectViewAsText}>Show As Text</button>
  </div>
  <button on:click={copyTextFromVariables}>Copy all</button>

  {#if state === "SUCCESS"}
    {#if selectedTypeOfView === "AsInputs"}
      <div>As Inputs</div>
      <InputsGroup
        variables={selectedVariablesGroup.variables}
        on:updateEnvVariables={updateEnvVariables}
      />
    {:else}
      <div>As Texts</div>
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
    width: calc(100vw - 500px);
  }
</style>
