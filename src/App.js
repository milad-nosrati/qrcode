import "./App.css";
import Products from "./product-url.json";
import Qrcode from "./components/qrcode";
import React from "react";
import CurrentYear from "./components/currentYear";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrlink: "",
      sku: "image",
    };
    this.handleChange = this.handleChange.bind(this);
    this.downloadQR = this.downloadQR.bind(this);
    this.urlCheck = this.urlCheck.bind(this);
  }
  downloadQR() {
    const canvas = document.getElementById("qrcodeComponent");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${this.state.sku}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  handleChange(e) {
    if (document.getElementById("skuInput")) {
      const skuPhrase = document.getElementById("skuInput").value.toString();
      const searchResult = Products.filter((product) => {
        return product.SKU === skuPhrase;
      });
      if (searchResult.length > 0) {
        const parentURLRaw = searchResult[0]["Parent URL"];
        const qrlink = parentURLRaw.slice(0, parentURLRaw.indexOf("?"));
        const sku = searchResult[0].SKU;

        this.setState({
          qrlink,
          sku,
        });
      } else {
        this.setState({
          qrlink: "",
          sku: "image",
        });
      }
    }
  }
  urlCheck(e) {
    //if(e.code ==='Enter' | e.code ==='NumpadEnter'){
    if (document.getElementById("urlInput")) {
      const qrlink = document.getElementById("urlInput").value.toString();
      const sku = "image";
      this.setState({
        qrlink,
        sku,
      });
    } else {
      this.setState({
        qrlink: "",
        sku: "image",
      });
    }
  }
  handleFocus = (event) => event.target.select()
    

  render() {
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
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
            
            <input
              id="urlInput"
              className="input"
              type="input"
              placeholder="Url"
              onChange={this.urlCheck}
              onFocus={this.handleFocus}
            />
          </section>
          <section className="smallSec">
            <div className={this.state.qrlink === "" ? "hidden" : "visible"}>
              <Qrcode qrlink={this.state.qrlink} />
              <button id="downloadBTN" onClick={this.downloadQR}>
                {" "}
                Download QR{" "}
              </button>
            </div>
          </section>
        </main>
        <footer className="footer">
          <span>
            Copyright © <CurrentYear /> - Milad Norati
          </span>
        </footer>
      </div>
    );
  }
}

export default App;
