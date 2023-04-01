import {WorkoutsContext} from '../context/WorkoutContext'
import { useContext } from 'react'

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext)

  if (!context){
    throw Error('useWorkoutContext must beused inside an WorkoutsContextProvider')
  }

  return context
}
