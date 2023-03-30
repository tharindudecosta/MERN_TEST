import {createContext, useReducer} from 'react'

export const WorkoutsContext = createContext()

export const WorkoutsContextProvider = ({children})=>{
    
    const [state,dispatch] = useReducer(workoutsReducer,{
        workouts: null
    })
    
    return(
        <WorkoutsContext.Provider>
            {children}
        </WorkoutsContext.Provider>
    )
}