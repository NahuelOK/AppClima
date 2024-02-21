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

    async function loadInfo(city = "Cordoba") {
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
             <div>{weather?.location.country + ", " + weather?.location.region + ", " + weather?.location.name  || "No hay datos disponibles"}</div>
            <img src={weather?.current.condition.icon}></img>
            <div>{"Temperatura: "+ weather?.current.temp_c + "°"|| "No hay datos disponibles"}</div>
            <div>{"Humedad: "+ weather?.current.humidity + "%"|| "No hay datos disponibles"}</div>
            <div>{"Clima: "+weather?.current.condition.text|| "No hay datos disponibles"}</div>
            <div>
            <iframe src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13695.982562246683!2d${weather?.location.lon}5!3d${weather?.location.lat}4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1708527676579!5m2!1ses-419!2sar`} title="mapa" width="400" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <WeatherForm onChangeCity={handleChangeCity}/>
        </div>
    )
}

export default CardClima;
