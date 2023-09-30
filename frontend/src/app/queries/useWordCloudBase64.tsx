import { useQuery } from "@tanstack/react-query";

interface Response {
  data: string;
}

async function getWordCloudBase64(
  country: string,
  rank: string | number
): Promise<Response> {
  return fetch(
    `http://127.0.0.1:8000/api/word-cloud?country=${country}&rank=${rank}`
  ).then((res) => res.json());
}

export default function useWordCloudBase64(
  country: string,
  rank: string | number
) {
  return useQuery({
    queryKey: ["wordCloud", "base64", country, rank],
    queryFn: () => getWordCloudBase64(country, rank),
    gcTime: 0,
    refetchOnWindowFocus: false,
  });
}
