import { useState, useEffect } from "react";

export default function useWordCloudBase64(
  selectedLocation: string,
  countryRanks: number
) {
  const [wordCloudBase64, setWordCloudBase64] = useState();

  useEffect(() => {
    if (!selectedLocation && !countryRanks) return;

    const url = `http://127.0.0.1:8000/api/word-cloud?${
      selectedLocation ?? `country=${selectedLocation}&`
    }rank=${countryRanks}`;

    fetch(url)
      .then((res) => res.json())
      .then(({ data }) => setWordCloudBase64(data));
  }, [selectedLocation, countryRanks]);

  return wordCloudBase64;
}
