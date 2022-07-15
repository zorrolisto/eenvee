<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let variables;
  let variablesAsText = "";
  transformVariablesToText();

  function transformVariablesToText() {
    variablesAsText = getTextFromVariables(variables);
  }
  function getTextFromVariables(variablesArray) {
    return variablesArray
      .map((v) => `${v.field} = ${v.value} \n`)
      .reduce((a, b) => a + b, "");
  }
  function updateTextFromVariable(text) {
    const linesExtractedFromText = text
      .split(/\n/)
      .filter((t) => t.trim() !== "");
    const envVariables = linesExtractedFromText.map((t) => {
      const [field, ...value] = t.split("=");
      return {
        field: field ? field.trim() : "",
        value: value || value.length ? value.join("=").trim() : "",
      };
    });
    for (const envVar of envVariables) {
      if (envVar.field === "" || /\s/.test(envVar.field)) {
        alert("Can't have white spaces the field of the env variables");
        return null;
      }
    }
    return envVariables;
  }

  function handleSubmit() {
    const envVariablesUpdated = updateTextFromVariable(variablesAsText);
    if (!envVariablesUpdated) return;
    dispatch("updateEnvVariables", { envVariablesUpdated });
  }
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="w-full"
  style="max-width: 1072px"
>
  <textarea
    bind:value={variablesAsText}
    rows="10"
    class="block break-all p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    placeholder="ENV_VARIABLE = VALUE..."
  />
  <div class="flex justify-center gap-2 pt-2">
    <button
      class="text-lg py-1 px-3 font-semibold rounded-md hover:bg-gray-100 border-2 "
      type="button"
      on:click={transformVariablesToText}>Reset</button
    >
    <button
      class="text-lg py-1 px-6 text-white font-semibold rounded-md bg-indigo-700 hover:bg-indigo-800 border-2 border-indigo-700"
      type="submit"
    >
      Save
    </button>
  </div>
</form>
