import React, { useState } from 'react';
import ServiceClass from './ServiceClass';
import Pickup from './Pickup';
import PaymentCard from './Payment';
// import Home from "../components/Home" ;
// import serviceClass from "../components/ServiceClass";
// import pickup from "../components/Pickup" ;
// import payment from "../components/Payment";

const CommonData = () => {
    const [formData, setFormData] = useState({
        page1Data: {},
        page2Data: {},
        page3Data: {},
        page4Data: {}
      });
      const updateFormData = (page, data) => {
        setFormData(prevData => ({
          ...prevData,
          [page]: data
        }));
      };
      const handleSubmit = () => {
        // Submit formData to server
      };
  return (
    <div>
        <ServiceClass/>
        <Pickup/>
        <PaymentCard/>
    </div>
  )
}

export default CommonData





//   return (
//     <div>
     
    
//       {currentPage === 1 && (
//         <Page1 formData={formData.page1Data} updateFormData={(data) => updateFormData('page1Data', data)} />
//       )}
//       {currentPage === 2 && (
//         <Page2 formData={formData.page2Data} updateFormData={(data) => updateFormData('page2Data', data)} />
//       )}
//       {currentPage === 3 && (
//         <Page3 formData={formData.page3Data} updateFormData={(data) => updateFormData('page3Data', data)} />
//       )}
//       {currentPage === 4 && (
//         <Page4 formData={formData.page4Data} updateFormData={(data) => updateFormData('page4Data', data)} />
//       )}
      
//       <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
//       <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default MultiPageForm;
