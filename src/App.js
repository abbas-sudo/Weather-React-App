import { useEffect, useState } from 'react';
import axios from 'axios'
import './SASS/style.css'

function App() {
  const key = '273ea6c9087c4da3890202900211903';
  const [name,setName] = useState([]);
  const [typing,setTyping] = useState((""));
  const [full,setFull] = useState((""));

  const inputEvent = (event) => {
    setTyping(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setFull(typing);
  }
  

  useEffect(()=>{
    async function getData(){
      const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${full}&days=1&aqi=no&alerts=no`);
      setName(res.data);      
      console.log(res.data)
    }
    getData();
  },[full])

  

  return (
 
       <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12 col-xs-12 Box">
            <form>
              <input type="text" placeholder="Search" onChange={inputEvent}/>
              <button onClick={onSubmit}>Search</button>
              </form>
              {(typeof  name.location != "undefined")  ? (
                <div>
              <h3>{name.location.name} , {name.location.country}</h3>
              <h5>{name.location.localtime}</h5>
              <div className="degree"><h1>{name.current.temp_c}°C</h1></div>
              <h4>{name.current.condition.text}</h4>
              </div>
              ) : ( <p className="nofound">No Data Found</p>
              )}
      </div>
      </div>
    </div>
  );
}

export default App;
