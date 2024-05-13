import { createSlice } from '@reduxjs/toolkit'

const AddAgentSlice = createSlice({
  name: 'addAgent',
  initialState: { 
    ownerName: '',
    companyName:'',
    companyEmail:'',
    vehicleType:'',
    serviceArea:'',
    agentDoc:''
  },
  reducers: {
    AddAgentAction(state, action) {
      const agentData  = action.payload;
      console.log("state from Redux :",agentData)
      return {...state , ...agentData}
      // state[id] = agentData;
      
    },
  
  },
})

export const { AddAgentAction} = AddAgentSlice.actions
export default AddAgentSlice.reducer