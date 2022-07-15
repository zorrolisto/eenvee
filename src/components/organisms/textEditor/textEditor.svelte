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
      .reduce((a, b) => a + b);
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

<form on:submit|preventDefault={handleSubmit}>
  <textarea bind:value={variablesAsText} cols="50" rows="10" />
  <button type="button" on:click={transformVariablesToText}>Reset</button>
  <button type="submit">Save</button>
</form>
