import { useState } from "react";

function WeatherForm({onChangeCity}){
    const [city, setCity] = useState("")

    function onChange(e){
        const inputvalue = e.target.value;
        if(inputvalue !== ""){
            setCity(inputvalue)
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        onChangeCity(city)
    }

    return(
       <form onSubmit={handleSubmit}>
            <input className="buscador" type="text" placeholder="Write a Ubication..." onChange={onChange}/>
       </form>
    )


}


export default WeatherForm;