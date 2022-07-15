<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let variables;
  let variablesAux = [];
  let newField = "";
  copyByValueParam();

  function copyByValueParam() {
    variablesAux = [];
    variables.forEach((i) => variablesAux.push({ ...i }));
  }
  function handleSubmit() {
    dispatch("updateEnvVariables", { envVariablesUpdated: variablesAux });
  }
  function addNewField() {
    if (newField.trim() === "") return;
    variablesAux = [...variablesAux, { field: newField, value: "" }];
    newField = "";
  }
  function deleteField(field) {
    variablesAux = variablesAux.filter((v) => v.field !== field);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    {#each variablesAux as variableAux}
      <p>{variableAux.field}</p>
      <input bind:value={variableAux.value} placeholder="Secret variable" />
      <button type="button" on:click={() => deleteField(variableAux.field)}>
        delete field</button
      >
    {/each}
  </div>
  <hr />
  <div>
    <input bind:value={newField} placeholder="New field" />
    <button type="button" on:click={addNewField}>Add</button>
  </div>
  <hr />
  <button type="button" on:click={copyByValueParam}>Reset</button>
  <button type="submit">Save</button>
</form>
