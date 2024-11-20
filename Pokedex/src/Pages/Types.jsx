import { useLocation } from "react-router-dom";
import TypeService from "../Services/TypeService";
import { useEffect, useState } from "react";


const TypePage = () => {
    const location = useLocation ();

    const fetchAllPokemonByType = async () => {
        try {
            const response = await TypeService.getTypePokemon(location.state)
            console.log(response);
        } catch (error) {
            
        }
    }
 
useEffect(() => {
    fetchAllPokemonByType();
  }, []);

}  
export default TypePage;