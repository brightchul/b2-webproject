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

const headers = {
  "Content-Type": "application/json",
};

export async function GET(
  request: Request,
  { params }: { params: { ranking: string } }
) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/keyword/rank/${params.ranking}`,
    {
      headers,
    }
  );

  const json = await res.json();
  const data = convertRankData(json.data);

  return Response.json(data);
}
