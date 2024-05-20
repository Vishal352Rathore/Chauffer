import { useState , useEffect , useContext } from "react"
import { NetworkContext } from "./Network-Context";

export const NetworkProvider = ({children})=>{

    const [isOnline, setOnline] = useState(()=> {
            return navigator.onLine
        })

    const [showPopup, setShowPopup] = useState(false);  


        useEffect(()=>{
            window.addEventListener('online', ()=> {setOnline(true);setShowPopup(false)})
            window.addEventListener('offline', ()=> setOnline(false) )
    
            return ()=>{
                window.removeEventListener('online', ()=> setOnline(true))
                window.removeEventListener('offline', ()=> {setOnline(false);setShowPopup(true)})
            }
        })
    
        return <NetworkContext.Provider value={{isOnline , showPopup , setShowPopup}} >{children}</NetworkContext.Provider>


}

export const useNetworkCheck = ()=>{
    const context = useContext(NetworkContext);
    if (!context) {
        throw new Error("useNetworkCheck must be used within a NetworkProvider");
      }

    return context;
}    