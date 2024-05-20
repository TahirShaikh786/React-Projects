import "./App.css";
import { useState } from "react";

function App() {
  let [city, setCity] = useState("");
  let [wDetails,setWdetails] = useState();
  let [isLoading,setIsLoading] = useState(false);

  let getData = (event) =>{
    setIsLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ff5de96c501a303ae59f8c0a682da3c3&units=metric`)
    .then((res) => res.json())
    .then((finalRes) => {
      if(finalRes.cod=="404"){
        setWdetails(undefined)
      }
      else{
        setWdetails(finalRes)
        console.log(finalRes)
      }
      setIsLoading(false)
    })

    setCity('');
    event.preventDefault();
  }


  return (
    <div className="container-fluid m-0 p-0 mainContainer">
      <div className="row m-0 p-0 innerContainer">
        <h1>Weather App</h1>
        <form onSubmit={getData}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name"
          />
          <button>Search</button>
        </form>

        <div className="weatherInfo">
          <img src='https://i.gifer.com/ZKZg.gif' className={`posi-absolute ${isLoading ? '' : 'disp-hidden'}`} />
          {wDetails!==undefined 
          ?
          <>
            <h3>
              {wDetails.name} <span>{wDetails.sys.country}</span>
            </h3>
            <h2>{wDetails.main.temp}<sup> o</sup>c</h2>
            <img src={`https://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} />
            <p>{wDetails.weather[0].description}</p>
          </>
          :
            <h3>No Data Found</h3>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
