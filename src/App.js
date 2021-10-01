import "./App.css";
import Products from "./product-url.json";
import QRCode from "qrcode.react";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrlink: "",
      sku: 'image',
    };
    this.handleChange = this.handleChange.bind(this);
    this.downloadQR = this.downloadQR.bind(this);
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
      const skuPhrase = document.getElementById("skuInput").value;
      const searchResult = Products.filter((product) => {
        return product.SKU == skuPhrase;
      });
      console.log(searchResult);
      const parentURLRaw = searchResult[0]["Parent URL"];
      const parentURL = parentURLRaw.slice(0, parentURLRaw.indexOf("?"));

      this.setState({
        qrlink: parentURL,
        sku: searchResult[0].SKU,
      });
    }
  }
  render() {
    return (
      <div className="App">
        <input
          id="skuInput"
          type="text"
          placeholder="SKU Code"
          onChange={this.handleChange}
        />
        <button id="downloadBTN" onClick={this.downloadQR}> Download QR </button>
        {/* <button onClick={this.handleClick}>Generate QR code</button> */}
        <QRCode
          id="qrcodeComponent"
          value={this.state.qrlink}
          size={185}
          renderAs="canvas"
          fgColor="#000000"
          bgColor="#FFFFFF"
          includeMargin={true}
        />
      </div>
    );
  }
}

export default App;
