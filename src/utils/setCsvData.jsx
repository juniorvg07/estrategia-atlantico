import { useEffect, useState } from "react";
import Papa from "papaparse";

export function setCsvData(urlData) {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    if (!urlData) return;

    fetch(urlData)
      .then((res) => res.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data;
            setCsvData(data);
          },
        });
      });
  }, [urlData]);

  return csvData;
}
