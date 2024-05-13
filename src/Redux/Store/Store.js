import { configureStore } from '@reduxjs/toolkit';
import AddAgentReducer  from '../Reducer/AddAgent_Reducers';


export const Store = configureStore({
  reducer: {
    Add_Agent: AddAgentReducer,
 
  },
})  