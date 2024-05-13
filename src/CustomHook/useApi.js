import { useEffect ,useState} from "react";
import axios from "axios";

const useApi= (url, requestBody )=>{
  const [data, setData] = useState(null);


  useEffect(()=>{
    const fetchData = async()=>{
      
        try{

          const response = await axios.post(url)
          const res = response.data;
          console.log("API :",res);
          setData(res)
          
         
        }
        catch(err){
          
          console.log("Error :",err)

        }
        
    }
    fetchData()
  },[url , requestBody])
  return { data};
}
export default useApi