import { useQuery } from "@tanstack/react-query";

interface Rank {
  country: string;
  keyword: string;
  frequency: number;
}

async function getRankData(rankNumber: string | number): Promise<Rank[]> {
  return fetch(`http://localhost:3000/api/keyword/rank/${rankNumber}`).then(
    (res) => res.json()
  );
}

export default function useRankData(rankNumber: string) {
  return useQuery({
    queryKey: ["rankData", rankNumber],
    queryFn: () => getRankData(rankNumber),
  });
}
