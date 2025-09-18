import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "https://lead-management-backend-q5vr.onrender.com";


    const contextValue = {
        url
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
