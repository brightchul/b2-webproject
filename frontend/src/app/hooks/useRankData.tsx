import { useState, useEffect } from "react";

type RawData = {
  [country: string]: [keyword: string, frequency: number];
};

type RankData = {
  country: string;
  keyword: string;
  frequency: number;
}[];

function convertRankData(data: RawData): RankData {
  return Object.keys(data).map((country) => ({
    country,
    keyword: data[country][0],
    frequency: data[country][1],
  }));
}

export default function useRankData(rankNumber: string) {
  const [rankData, setRankData] = useState<RankData>([]);

  useEffect(() => {
    if (!rankNumber) return;

    fetch(`http://localhost:3000/api/keyword/rank/${rankNumber}`)
      .then((res) => res.json())
      .then(setRankData);
  }, [rankNumber]);

  return rankData;
}
