import { useEffect, useRef, useState } from "react";
import "./App.css";
import Particles from "react-tsparticles";
import particlesConfig from "./config/particles-config";

function App() {
  const [days, setdays] = useState("00");
  const [hours, sethours] = useState("00");
  const [minutes, setminutes] = useState("00");
  const [seconds, setseconds] = useState("00");

  let interval = useRef();
  const startTimer = () => {
    const countdownDate = new Date("April 2, 2022 00:00:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      let Days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let Hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let Minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let Seconds = Math.floor((distance % (1000 * 60)) / 1000);

      Days = Days < 10 ? "0" + Days : Days;
      Hours = Hours < 10 ? "0" + Hours : Hours;
      Minutes = Minutes < 10 ? "0" + Minutes : Minutes;
      Seconds = Seconds < 10 ? "0" + Seconds : Seconds;
      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setdays(Days);
        sethours(Hours);
        setminutes(Minutes);
        setseconds(Seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    const hello = interval.current;
    startTimer();
    return () => {
      clearInterval(hello);
    };
  }, []);

  return (
    <div className="container">
      <Particles className="particles" params={particlesConfig}></Particles>
      <div className="overlay">
        <div>
          <h2 className="header" style={{ fontSize: "40px" }}>
            Time left for Ramadan 2022
          </h2>
          <h4 style={{ textAlign: "center", fontSize: "30px" }}>Bangladesh</h4>
        </div>
        <div
          className="shadow"
          style={{
            display: "flex",
            textAlign: "center",
            marginTop: "20px",
            border: "1px solid white",
            padding: "20px",
          }}
        >
          <section>
            <p className="para">{days}</p>
            <p>
              <small>Days</small>
            </p>
          </section>
          <span>:</span>
          <section>
            <p className="para">{hours}</p>
            <p>
              <small>Hours</small>
            </p>
          </section>
          <span>:</span>
          <section>
            <p className="para">{minutes}</p>
            <p>
              <small>Minutes</small>
            </p>
          </section>
          <span>:</span>
          <section>
            <p className="para">{seconds}</p>
            <p>
              <small>Seconds</small>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
