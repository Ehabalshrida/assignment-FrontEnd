import React, { useEffect, useState } from 'react'


export const SettingsContext=React.createContext()
function Settings(props) {

    const [display,setDisplay]=useState(false)
    const [numOfItems,setNumOfItems]=useState(2)
    const [defaultSort,setDefaultSort]=useState('you have to do this')
   const state ={
    display ,
    numOfItems,
    defaultSort,
   setDisplay,
    setNumOfItems,
    setDefaultSort,
   }
useEffect(()=>{
    let stringArray =localStorage.getItem('SettingForm');
    let objectArray= JSON.parse(stringArray);
    
    if(objectArray){
        setDisplay(objectArray.display)

        setNumOfItems(Number(objectArray.numberOfItem))
    }
    //localStorage.clear()
   

},[])
 



    return (
        <>
           < SettingsContext.Provider value={state}>
                {props.children}
            </SettingsContext.Provider>
        </>
    )
}

export default Settings