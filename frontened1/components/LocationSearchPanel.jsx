import React from 'react'

const LocationSearchPanel = (props) => {

    // sample array for location
    const location = [
        "24B, Near Kapoor's cafe, Sheriyans Coding School, Bhopal",
        "22C, Near Malhotra's cafe, Sheriyans Coding School, Bhopal",
        "20B, Near Singhania's cafe, Sheriyans Coding School, Bhopal",
        "18A, Near Sharma's cafe, Sheriyans Coding School, Bhopal"
    ]

  return (
    <div>
        {/* this is just a sample data */}
        {
            location.map(function(elem, idx){
                return <div key={idx} onClick={() => {
                    props.setVehiclePanel(true)
                    props.setPanelOpen(false)
                }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full '><i className="ri-map-pin-fill"> </i></h2> 
                <h4>24B, Near Kapoor's cafe, Sheriyans Coding School, Bhopal </h4>
            </div>
            })
        }


  
      
    </div>
  )
}

export default LocationSearchPanel


// import React from 'react'

// const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

//     const handleSuggestionClick = (suggestion) => {
//         if (activeField === 'pickup') {
//             setPickup(suggestion)
//         } else if (activeField === 'destination') {
//             setDestination(suggestion)
//         }
//         // setVehiclePanel(true)
//         // setPanelOpen(false)
//     }

//     return (
//         <div>
//             {/* Display fetched suggestions */}
//             {
//                 suggestions.map((elem, idx) => (
//                     <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
//                         <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
//                         <h4 className='font-medium'>{elem}</h4>
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

// export default LocationSearchPanel