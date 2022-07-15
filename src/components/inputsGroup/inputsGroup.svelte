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
    if (/\s/.test(newField)) {
      alert("Can't have white spaces the field of the env variables");
      return;
    }
    variablesAux = [...variablesAux, { field: newField, value: "" }];
    newField = "";
  }
  function deleteField(field) {
    variablesAux = variablesAux.filter((v) => v.field !== field);
  }
  function copyValue(text) {
    copyToClipbard(text);
  }
  function copyToClipbard(text) {
    navigator.clipboard.writeText(text);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  {#if variablesAux.length}
    <div
      class="flex flex-wrap py-5"
      style="max-height: 52.5vh; overflow: auto; min-width: 50vw"
    >
      {#each variablesAux as variableAux}
        <div class="w-full lg:w-1/2 mb-2 p-2">
          <div class="flex items-end justify-between mb-1">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for={variableAux.field}
            >
              {variableAux.field}
            </label>
            <div class="space-x-1">
              <button
                class="rounded px-2 py-1 hover:text-indigo-700 border-2 hover:border-indigo-700"
                type="button"
                on:click={() => deleteField(variableAux.field)}
              >
                <i class="text-red-500 fa-solid fa-trash-can" />
              </button>
              <button
                class="rounded px-2 py-1 hover:text-indigo-700 border-2 hover:border-indigo-700"
                type="button"
                on:click={() => copyValue(variableAux.value)}
              >
                <i class="text-yellow-500 fa-solid fa-copy" />
              </button>
            </div>
          </div>
          <input
            id={variableAux.field}
            placeholder="Secret variable"
            class="shadow appearance-none border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            bind:value={variableAux.value}
          />
        </div>
      {/each}
    </div>
  {/if}
  <p class="text-center mb-2 py-5">Aún no tienes env variables, agrega algunas.</p>
  <div class="flex justify-center gap-2 pt-2">
    <button
      class="text-lg py-1 px-3 font-semibold rounded-md hover:bg-gray-100 border-2 "
      type="button"
      on:click={copyByValueParam}>Reset</button
    >
    <button
      class="text-lg py-1 px-6 text-white font-semibold rounded-md bg-indigo-700 hover:bg-indigo-800 border-2 border-indigo-700"
      type="submit"
    >
      Save
    </button>
  </div>
</form>
<form
  on:submit|preventDefault={addNewField}
  class="w-full"
  style="max-width: 1072px"
>
  <div class="flex justify-center py-5">
    <div class="w-full mb-2 p-2">
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="newVariableField"
      >
        NEW VARIABLE
      </label>
      <input
        id="newVariableField"
        placeholder="New Env Variable"
        class="shadow appearance-none border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        bind:value={newField}
      />
      <div class="flex justify-end mt-2">
        <button
          class="font-bold rounded-md px-6 py-1 text-white bg-indigo-700 hover:bg-indigo-800 border-2 border-indigo-700"
          type="submit"
        >
          Add
          <i class="fa-solid fa-plus" />
        </button>
      </div>
    </div>
  </div>
</form>
