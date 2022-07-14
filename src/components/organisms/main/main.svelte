<script>
  import InputsGroup from "../inputsGroup/inputsGroup.svelte";
  import TextEditor from "../textEditor/textEditor.svelte";

  export let selectedProject;
  export let selectedVariablesGroup;

  let selectedTypeOfView = "AsInputs";
  const selectViewAsInputs = () => (selectedTypeOfView = "AsInputs");
  const selectViewAsText = () => (selectedTypeOfView = "AsText");
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
    <InputsGroup />
  {:else}
    <div>As texts</div>
    <TextEditor />
  {/if}
</div>

<style>
  .main {
    min-height: 100vh;
    width: calc(100vw - 300px);
  }
</style>
