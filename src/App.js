import React, {useState} from 'react';
import axios from 'axios';
import './index.css';
import Clock from 'react-live-clock';



function App() {

  
  const [listOfData, setListOfData] = useState([])
  const [location,setLocation] = useState('')

  const api =`https://api.openweathermap.org/data/2.5/weather?q=${location}&&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

  


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

  let emoji = null;

  if(typeof listOfData.main != "undefined"){
    if(listOfData.weather[0].main === "Clouds"){
      emoji = "fa-cloud"
      // console.log(emoji)
    }
    else if (listOfData.weather[0].main === "Thunderstorm"){
      emoji = "fa-bolt"
      // console.log(emoji)
    }
    else if (listOfData.weather[0].main === "Drizzle"){
      emoji = "fa-cloud-rain"
      // console.log(emoji)
    }
    else if (listOfData.weather[0].main === "Rain"){
      emoji = "fa-cloud-shower-heavy"
      // console.log(emoji)
    }
    else if (listOfData.weather[0].main === "Snow"){
      emoji = "fa-snow-flake"
      // console.log(emoji)
    }
    else{
      emoji = "fa-smog"
      // console.log(emoji)
    }
  }



    return (
      <div className="app">
        <h1 className='title'>Real-time Weather API</h1>

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
                {listOfData.main ? <h1>{listOfData.main.temp.toFixed()}°C</h1> : null}
              </div>


              <i className={`fas ${emoji} fa-4x`}></i>

              {/* '{fas ${emoji} fa-4x}'          {'fas ${emoji} fa-4x'} */}


              <div className='description'>
               {listOfData.main ? <p>{listOfData.weather[0].main}</p> :null}
              </div>
            </div>
            
          {listOfData.name !== undefined &&
            <div className='bottom'>
              <div className='realfeel'>
              {listOfData.main ? <p className='bold'>{listOfData.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
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
          <div className='timer1'> 
          <Clock
            format={'DD MMMM YYYY, dddd, h:mm A '}
            timezone={'America/Chicago'}
            ticking={true}/>
           (US)
          </div>
        
          <div className='timer2'>           
            <Clock
              format={'DD MMMM YYYY, dddd, h:mm A '}
              ticking={true}/>
            (MY)
          </div>

          <div className='projectname'>
            © Tao project 2022
          </div>    
      </div>


    );
  }

export default App;
