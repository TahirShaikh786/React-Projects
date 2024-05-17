import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-notifications/lib/notifications.css';
import { useState } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Col, Container, Row } from "react-bootstrap";
import { LC, NC, SC, UC } from "./data/PassChar";

function App() {
  let [upperCase,setUpperCase] = useState(false);
  let [lowerCase,setLowerCase] = useState(false);
  let [number,setNumber] = useState(false);
  let [symbol,setSymbol] = useState(false);
  let [passwordlen,setPasswordlen] = useState(10);
  let [fpass,setFpass] = useState('');
  
  let createPass=()=>{
    let finalPass='';
    let charSet = '';
    if(upperCase||lowerCase||number||symbol){
      if(upperCase) charSet+=UC;
      if(lowerCase) charSet+=LC;
      if(number) charSet+=NC;
      if(symbol) charSet+=SC;

      for(let i=0;i<passwordlen;i++){
        finalPass += charSet.charAt(Math.floor(Math.random()*charSet.length))
      }
      setFpass(finalPass);

    }else{
      NotificationManager.error("Please Select one CheckBox!...")
    }
  }

  let copyPass = () =>{
    NotificationManager.info("Password is Copy to the Clipboard!")
    navigator.clipboard.writeText(fpass);
  }

  return (
    <Container fluid className="m-0 p-0">
      <NotificationContainer/>
      <Row className="m-0 p-0 mainBody">
        <Col sm={10} md={8} lg={5}>
          <div className="innerBox">
            <h3>Password Generator</h3>

            <div className="passBoxIn">
              <input type="text" value={fpass} readOnly />
              <button onClick={copyPass}>Copy</button>
            </div>

            <div className="passLength">
              <label>Password Length</label>
              <input type="number" value={passwordlen} onChange={(event)=>setPasswordlen(event.target.value)} min={10} max={20} />
            </div>

            <div className="passLength">
              <label>Include Uppercase Letter</label>
              <input type="checkbox" checked={upperCase} onChange={()=>setUpperCase(!upperCase)} />
            </div>

            <div className="passLength">
              <label>Include Lowercase Letter</label>
              <input type="checkbox" checked={lowerCase} onChange={()=>setLowerCase(!lowerCase)} />
            </div>

            <div className="passLength">
              <label>Include Numbers</label>
              <input type="checkbox" checked={number} onChange={()=>setNumber(!number)} />
            </div>

            <div className="passLength">
              <label>Include Symbols</label>
              <input type="checkbox" checked={symbol} onChange={()=>setSymbol(!symbol)} />
            </div>

            <div className="passBtn">
              <button onClick={createPass}>Generate Password</button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
