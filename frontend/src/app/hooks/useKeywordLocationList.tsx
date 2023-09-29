import { useState, useEffect } from "react";

export default function useKeywordLocationList() {
  const [keywordLocationList, setKeywordLocationList] = useState<string[]>([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/keyword/location")
      .then((res) => res.json())
      .then(({ data }) => setKeywordLocationList(data));
  }, []);

  return keywordLocationList;
}
