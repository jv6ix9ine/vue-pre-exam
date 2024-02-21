<template>
  <section class="container-main">
    <slot name="header"></slot>
    <form @submit.prevent="addTaks">
      <input :class="{'border-red': error}" v-model="newTask" placeholder="Necesito hacer..." type="text" @input="validationRequired">
      <select v-model="priority">
        <option value="alto" >Alto</option>
        <option value="medio" >Medio</option>
        <option value="bajo" selected>Bajo</option>
      </select>
    </form>
    <div class="container-tasks">
      <TaskItem @complete-task="handleCompleteTask" @delete-task="handleDeleteTask" v-for="task in tasks" v-bind="task" :key="task.id" />
    </div>
    <div style="padding: 8px 8px;">
      <p v-if="!!totalTask">{{ taskCompleted }} / {{ totalTask }} tareas completadas</p>
      <p v-else>No tienes ninguna tarea</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ITask } from '@/interfaces/ITask';
import TaskItem from './TaskItem.vue';

const newTask = ref('')
const error = ref(false)
const priority = ref<'alto' | 'medio' | 'bajo'>('bajo')

const tasks = ref<ITask[]>([
  {
    id: 1,
    title: 'Estudiar para el examen',
    completed: false,
    priority: 'alto',
    date: new Date('2023-03-20')
  },
  {
    id: 2,
    title: 'Jugar Terraria',
    completed: false,
    priority: 'medio',
    date: new Date('2024-01-10')
  }
])

const taskCompleted = computed(() => {
  let countTaskCompleted = 0
  for(let task of tasks.value) {
    if(task.completed) countTaskCompleted++
  }
  return countTaskCompleted
}) 

const totalTask = computed(() => {
  return tasks.value.length
})

const handleCompleteTask = (value: boolean, id: number) => {
  const index = tasks.value.findIndex((task) => task.id === id)
  if(index !== -1){
    tasks.value[index].completed = value
  }
}

const addTaks = () => {
  validationRequired()

  if(error.value) return
  const newId = tasks.value.length === 0 ? 0 : tasks.value[tasks.value.length - 1].id + 1
  const dataTask: ITask = {
    id: newId,
    title: newTask.value,
    completed: false,
    priority: priority.value || 'bajo',
    date: new Date()
  }
  tasks.value.push(dataTask)
  newTask.value = ''
  error.value = false
}

const handleDeleteTask = (id: number) => {
  const index = tasks.value.findIndex((task) => task.id === id)
  if(index !== -1){
    tasks.value.splice(index, 1)
  }
}

const validationRequired = () => {
  if(newTask.value.trim() === ''){
    error.value = true
    return
  }

  error.value = false
}
</script>

<style scoped>
.container-main {
  width: 450px;
  height: 400px;
  border: solid 1px #bdbdbd;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.container-tasks {
  flex-grow: 1;
  overflow: auto;
}

.container-main form {
  display: flex;
}

form input {
  flex-grow: 1;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 8px 12px;
  border-top: 1px #bdbdbd solid;
  border-bottom: 1px #bdbdbd solid;
  font-size: 14px;
  color: rgb(31, 31, 31);
}

.border-red {
  border-bottom-color: red;
}

select {
  width: 80px;
  background-color: transparent;
  border: 1px #bdbdbd solid;
  border-right: none;
  color: rgb(31, 31, 31);
}
</style>