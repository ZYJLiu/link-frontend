import { useState } from "react";
import dynamic from "next/dynamic";
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

const QrScanner = () => {
  const [data, setData] = useState("No result");
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (scanData: string) => {
    if (!scanData) return;

    if (!scanData.startsWith("solana:")) {
      alert("Only valid with Solana Pay QR codes");
      setData("No result");
      return;
    }

    scanData = scanData.substring(7);
    scanData = decodeURIComponent(scanData);

    setData(scanData);
    setIsScanning(false);
  };

  return (
    <div className="flex flex-col items-center">
      {isScanning ? (
        <div className="mb-32 flex flex-col">
          <QrReader
            facingMode="environment"
            delay={500}
            onError={(err) => console.log(err)}
            onScan={(scanData) => handleScan(scanData)}
            style={{ width: "200px", height: "100px" }}
          />
          <button className="mt-32" onClick={() => setIsScanning(false)}>
            Close Scanner
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap flex-col">
          <p>Not scanning</p>
          <button onClick={() => setIsScanning(true)}>Scan</button>
          <p className="break-all">Data: {data}</p>
        </div>
      )}
    </div>
  );
};

export default QrScanner;
