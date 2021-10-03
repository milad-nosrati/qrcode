import QRCode from "qrcode.react";

function Qrcode(props) {
  return (
    <QRCode
      id="qrcodeComponent"
      value={props.qrlink}
      size={185}
      renderAs="canvas"
      fgColor="#000000"
      bgColor="#FFFFFF"
      includeMargin={true}
    />
  );
}
export default Qrcode;