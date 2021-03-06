import React from "react";
import QrCode from "qrcode.react";
import { Button, Card } from "react-bootstrap";
import translation from "../../locales/translation.json";
import { useLang } from "../../context/LanguageContext";

// download QR code
const downloadQRCode = () => {
  const qrCodeURL = document
    .getElementById("generatedQrCode")
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let aEl = document.createElement("a");
  aEl.href = qrCodeURL;
  aEl.download = "QR_Code.png";
  document.body.appendChild(aEl);
  aEl.click();
  document.body.removeChild(aEl);
};

const QrCodeHandler = ({ value, fullFunctions }) => {
  const { language } = useLang();

  return (
    <Card className="text-center">
      <Card.Subtitle className="mb-2 text-muted">{value}</Card.Subtitle>
      <Card.Body>
        <QrCode id={"generatedQrCode"} value={value} size={400} />
      </Card.Body>
      {fullFunctions ? (
        <Card.Footer className="text-muted">
          <Button variant="primary" onClick={downloadQRCode}>
            {translation[language].download}
          </Button>
        </Card.Footer>
      ) : (
        <div></div>
      )}
    </Card>
  );
};

export default QrCodeHandler;
