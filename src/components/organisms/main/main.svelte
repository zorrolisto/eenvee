<script>
  import InputsGroup from "../inputsGroup/inputsGroup.svelte";
  import TextEditor from "../textEditor/textEditor.svelte";

  export let selectedProject;
  export let selectedVariablesGroup;
  let selectedTypeOfView = "AsInputs";

  const selectViewAsInputs = () => (selectedTypeOfView = "AsInputs");
  const selectViewAsText = () => (selectedTypeOfView = "AsText");
  function updateEnvVariables({ detail: { envVariablesUpdated } }) {
    selectedVariablesGroup.variables = envVariablesUpdated;
  }
</script>

<div class="main">
  <h3>{selectedProject.name}</h3>
  <h4>{selectedVariablesGroup.name}</h4>
  <div>
    <button on:click={selectViewAsInputs}>Show As Inputs</button>
    <button on:click={selectViewAsText}>Show As Text</button>
  </div>

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
</div>

<style>
  .main {
    min-height: 100vh;
    width: calc(100vw - 300px);
  }
</style>
