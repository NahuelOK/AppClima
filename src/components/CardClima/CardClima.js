import { useState, useEffect } from "react"
import WeatherForm from "../Form/Form.js";

function CardClima(){
    const [weather, setWeather] = useState(null)

    useEffect(()=>{
        loadInfo();
    },[])
    useEffect(()=>{
        document.title = `AppClima | ${weather?.location.name ?? "Argentina"}`
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
        <div className="card-clima">
            <WeatherForm onChangeCity={handleChangeCity}/>
            <div className="card-clima-propiedades">
                <h1>{weather?.location.country + ", " + weather?.location.region + ", " + weather?.location.name  || "No hay datos disponibles"}</h1>
                <h2>{"Last Updated: "+ weather?.current.last_updated|| "No hay datos disponibles"}</h2>
                <div className="parte-de-arriba">
                    <div className="contenedor-datos-1">
                        <div className="temperatura">
                            <img src={weather?.current.condition.icon}></img>
                            <h2>{weather?.current.temp_c + "°"|| "No hay datos disponibles"}</h2>
                        </div>
                        <h2>{weather?.current.condition.text|| "No hay datos disponibles"}</h2>
                    </div>
                    <div className="contenedor-datos-2">
                        <h2>{"Wind From: "+ weather?.current.wind_dir|| "No hay datos disponibles"}</h2>
                        <div className="viento">
                            <h2>{weather?.current.wind_kph|| "No hay datos disponibles"}</h2>
                            <h3>km/h</h3>
                        </div>
                    </div>           
                </div>
                <div className="mapa">
                    <iframe src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11516.394832126083!2d${weather?.location.lon}!3d${weather?.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1708543600390!5m2!1ses-419!2sar`} title="mapa" width="500" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    )
}

export default CardClima;
