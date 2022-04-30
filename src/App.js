import React, {useState} from 'react';
import axios from 'axios';
import './index.css';



function App() {

  
  const [listOfData, setListOfData] = useState([])
  const [location,setLocation] = useState('')

  const api =`https://api.openweathermap.org/data/2.5/weather?q=${location}&&units=imperial&appid=186c64c43d22e510069bb84e0f12ee36`


  const searchLocation =(event) => {
    if (event.key === 'Enter') {
      axios.get(api).then(
        (response) => {
          console.log(response.data)
          setListOfData(response.data)
          
        }
      )
      setLocation('')
    }
  }

    return (
      <div className="app">
        <h1 className='title'>Weather API</h1>

          <div className='search-box'>
            <input 
              type='text' 
              className='search-bar' 
              placeholder='Search for country'
              value={location}   /* value of this input get is location */
              onChange={event => setLocation(event.target.value)}
              onKeyPress={searchLocation} /* press enter then do xxx */
              />
          </div>

          <div className='container'>
            <div className='top'>
              <div className='city'>
                <p>{listOfData.name}</p>
              </div>

              <div className='temp'>
                {listOfData.main ? <h1>{listOfData.main.temp.toFixed()}°F</h1> : null}
              </div>

              <div className='description'>
               {listOfData.main ? <p>{listOfData.weather[0].main}</p> :null}
              </div>
            </div>
            
          {listOfData.name !== undefined &&
            <div className='bottom'>
              <div className='realfeel'>
                {listOfData.main ? <p className='bold'>{listOfData.main.feels_like.toFixed()}°F</p> :null}
                <p>Real Feels</p>
              </div>
              
              <div className='humidity'>
                {listOfData.main ? <p className='bold'>{listOfData.main.humidity}</p> :null}
                <p>Humidity</p>
              </div>

              <div className='wind'>
                {listOfData.wind? <p className='bold'>{listOfData.wind.speed.toFixed()}MPH</p> :null}
                <p>Wind Speed</p>
              </div>

            </div>
          }           

          </div>

      </div>
    );
  }

export default App;
