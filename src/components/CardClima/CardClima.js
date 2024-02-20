import { useState, useEffect } from "react"
import WeatherForm from "../Form/Form.js";


function CardClima(){
    const [weather, setWeather] = useState(null)

    useEffect(()=>{
        loadInfo();
    },[])
    useEffect(()=>{
        document.title = `Clima | ${weather?.location.name ?? "Argentina"}`
    },[weather])

    async function loadInfo(city = "Argentina") {
        try {
            const request = await fetch(
                `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_API_KEY}&q=${city}&aqi=no`
            );
            if (!request.ok) {
                throw new Error(`¡Error HTTP! Estado: ${request.status}`);
            }
            const json = await request.json();
            setWeather(json);
        } catch (error) {
            console.error("Error al obtener datos meteorológicos:", error);
        }
    }
    
    function handleChangeCity(city){
        setWeather(null) 
        loadInfo(city);
    }

    return(
        <div>
             <div>{weather?.location.country + ", " + weather?.location.name  || "No hay datos disponibles"}</div>
            <img src={weather?.current.condition.icon}></img>
            <div>{"Temperatura: "+ weather?.current.temp_c + "°"|| "No hay datos disponibles"}</div>
            <div>{"Humedad: "+ weather?.current.humidity + "%"|| "No hay datos disponibles"}</div>
            <div>{"Clima: "+weather?.current.condition.text|| "No hay datos disponibles"}</div>
            
            <WeatherForm onChangeCity={handleChangeCity}/>
        </div>
    )
}

export default CardClima;
