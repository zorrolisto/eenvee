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
  function updateTextFromVariable(value) {
    const arrayFromTexts = value.split(/\n/);
    const arrayFiltered = arrayFromTexts.filter((t) => t.trim() !== "");
    const arrayExtracted = arrayFiltered.map((t) => {
      const [field, ...value] = t.split("=");
      return {
        field: field ? field.trim() : "",
        value: value || value.length ? value.join("=").trim() : "",
      };
    });
    const haveAllFields = arrayExtracted
      .map((v) => v.field)
      .equals(variables.map((v) => v.field));
    return { haveAllFields, arrayExtracted };
  }
  function handleSubmit() {
    const { haveAllFields, arrayExtracted } =
      updateTextFromVariable(variablesAsText);
    if (haveAllFields) {
      dispatch("updateEnvVariables", { envVariablesUpdated: arrayExtracted });
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <textarea bind:value={variablesAsText} />
  <button type="button" on:click={transformVariablesToText}>Reset</button>
  <button type="submit">Save</button>
</form>
