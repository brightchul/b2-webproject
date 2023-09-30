import { useQuery } from "@tanstack/react-query";

interface Response {
  data: string[];
}

function getKeywordLocationList(): Promise<Response> {
  return fetch("http://127.0.0.1:8000/api/keyword/location").then((res) =>
    res.json()
  );
}

export default function useKeywordLocationList() {
  return useQuery({
    queryKey: ["keywordLocation", "list"],
    queryFn: getKeywordLocationList,
  });
}
