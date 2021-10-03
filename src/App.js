import "./App.css";
import Products from "./product-url.json";
import QRCode from "qrcode.react";
import React from "react";

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

  render() {
    return (
      <div className="App">
        <input
          id="skuInput"
          className="input"
          type="text"
          placeholder="SKU Code"
          onChange={this.handleChange}
        />
        <input
          id="urlInput"
          className="input"
          type="input"
          placeholder="Url"
          onChange={this.urlCheck}
        />
        <button id="downloadBTN" onClick={this.downloadQR}>
          {" "}
          Download QR{" "}
        </button>

        <QRCode
          id="qrcodeComponent"
          value={this.state.qrlink}
          size={185}
          className={this.state.qrlink === "" ? "hidden" : "visible"}
          renderAs="canvas"
          fgColor="#000000"
          bgColor="#FFFFFF"
          includeMargin={true}
        />
        {/* <button onClick={this.handleClick}>Generate QR code</button> */}
      </div>
    );
  }
}

export default App;
