<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let variables;
  let variablesAux = [];
  copyByValueParam();

  function copyByValueParam() {
    variables.forEach((i) => variablesAux.push({ ...i }));
  }
  function handleSubmit() {
    dispatch("updateEnvVariables", { envVariablesUpdated: variablesAux });
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  {#each variablesAux as variableAux}
    <p>{variableAux.field}</p>
    <input bind:value={variableAux.value} placeholder="Secret variable" />
  {/each}
  <button type="button" on:click={copyByValueParam}>Reset</button>
  <button type="submit">Save</button>
</form>
