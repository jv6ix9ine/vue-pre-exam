export interface ITask {
  id: number
  title: string
  completed: boolean
  date: Date
  priority: 'alto' | 'medio' | 'bajo' 
}