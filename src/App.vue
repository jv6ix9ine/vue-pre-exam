<template>
  <main>
    <TaskList >
      <template #header>
        Lista de tareas
      </template>
    </TaskList>
  </main>
</template>

<script setup lang="ts">
import TaskList from './components/tasks/TaskList.vue';


</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>