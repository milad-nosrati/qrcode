import "./App.css";
import Qrcode from "./components/qrcode";
import React, { useState } from "react";
import CurrentYear from "./components/currentYear";
import API from "./Auth/api";

const App = () => {
  const [qrlink, setQrlink] = useState("");
  const [sku, setSku] = useState("image");
  const [isLoading, setIsLoading] = useState(false);

  const downloadQR = () => {
    const canvas = document.getElementById("qrcodeComponent");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${sku}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const handleChange = (e) => {
    setIsLoading(true);
    const skuInputText = e.target.value;
    setSku(skuInputText);
    if (skuInputText.length > 14) {
      const apiQuery = `products/?sku=${skuInputText}`;
      console.log(apiQuery);
      API.get(apiQuery)
        .then((res) => {
          if (res.data === []) {
            console.log("Nothing returned.");
          } else {
            setQrlink(res.data[0].permalink);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(
            "Error Getting results from the server, please try again"
          );
          console.log(err.response);
        });
    } else {
      setQrlink("");
      setSku("image");
    }
  };
  const urlCheck = (e) => {
    setIsLoading(true);
    //if(e.code ==='Enter' | e.code ==='NumpadEnter'){
    if (e.target.value) {
      setQrlink(e.target.value);
      setSku("image");
    } else {
      setQrlink("");
      setSku("image");
    }
    setIsLoading(false);
  };
  const handleFocus = (event) => event.target.select();

  return (
    <div className="App">
      <header className="header">
        <img
          src="/images/logo.png"
          id="main-logo"
          alt="Payless Flooring logo"
        />
      </header>
      <main className="container">
        <section className="smallSec">
          <input
            id="skuInput"
            className="input"
            type="text"
            placeholder="SKU Code"
            onChange={handleChange}
            onFocus={handleFocus}
          />

          <input
            id="urlInput"
            className="input"
            type="input"
            placeholder="Url"
            onChange={urlCheck}
            onFocus={handleFocus}
          />
        </section>
        <section className="smallSec">
          <div className={qrlink === "" || isLoading ? "hidden" : "visible"}>
            <Qrcode qrlink={qrlink} />
            <button id="downloadBTN" onClick={downloadQR}>
              Download QR
            </button>
          </div>
          <div className={qrlink === "" ? "hidden" : "visible"}>
            <div className={ !isLoading ? "hidden" : "visible"}>
              <div class="lds-dual-ring"></div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <span>
          Copyright © <CurrentYear /> - Milad Nosrati
        </span>
      </footer>
    </div>
  );
};

export default App;
