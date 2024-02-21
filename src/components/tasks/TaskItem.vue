<template>
  <article>
    <input :value="props.completed" @change="emits('completeTask', ($event.target as HTMLInputElement).checked, props.id)" type="checkbox" name="" id="">
    <div>
      <p>{{ props.title }}</p>
      <p>{{ props.date.toLocaleDateString() }}</p>
      <p>{{ props.priority }}</p>
    </div>
    <button @click="emits('deleteTask', $props.id)">
      x
    </button>
  </article>
</template>

<script setup lang="ts">
import type { ITask } from '@/interfaces/ITask';

const props = defineProps<ITask>()
const emits = defineEmits(['completeTask', 'deleteTask'])
</script>

<style scoped>
article {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 16px;
  min-height: 48px;
  align-items: center;
  border-bottom: 1px #bdbdbd solid;
}

article > div {
  flex-grow: 1;
  margin-bottom: 2px;
}
</style>