import { JsonData, JsonDataKey, OneRow } from "./type";

function convertDataToTable(data: JsonData) {
  let idx = 0;
  const result = [];
  const keyArr = Object.keys(data) as JsonDataKey[];

  while (data[keyArr[0]][idx.toString()] !== undefined) {
    const oneRow: OneRow = {};

    keyArr.forEach((key) => {
      const currentKey = key === "1" ? "keyword" : key;
      oneRow[currentKey] = data[key][idx];
    });

    result.push(oneRow);
    idx++;
  }

  return result;
}

export async function GET() {
  const res = await fetch("http://localhost:8000/api/mode", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await res.json();
  const data = convertDataToTable(json);

  return Response.json({ data });
}
