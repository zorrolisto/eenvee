<script>
  export let projects;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function selectProject(project) {
    dispatch("selectProject", { project });
  }
  function selectVariablesGroup(variablesGroup, project) {
    dispatch("selectVariablesGroup", { variablesGroup, project });
  }
</script>

<div class="sidebar">
  <h2>Eenvee</h2>
  <ul>
    <li>
      Projects
      <button>Add</button>
      <ul>
        {#each projects as project}
          <li on:click={selectProject(project)}>
            {project.name} <button>Add</button>
            <ul>
              {#each project.variablesGroup as variableGroup}
                <li
                  on:click|capture|stopPropagation={selectVariablesGroup(
                    variableGroup,
                    project
                  )}
                >
                  {variableGroup.name}
                </li>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
    </li>
  </ul>
</div>

<style>
  .sidebar {
    min-height: 100vh;
    width: 300px;
    background-color: blue;
  }
</style>
