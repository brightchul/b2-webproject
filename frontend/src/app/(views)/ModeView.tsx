import { use } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type JsonData = {
  "1": { [key: string]: string }; // '0': 'Coolio',
  year: { [key: string]: number }; // '1': 2022,
  month: { [key: string]: number }; //  '1': 9,
  level_2: { [key: string]: number }; //  '1': 0,
  contries_share: { [key: string]: string }; // '0': 'DE,IT,US,UK,NL,AUS',
};
type JsonDataKey = keyof JsonData;
type OneRow = Record<string, string | number>;

function convertDataToTable(data: JsonData) {
  let idx = 0;
  const result = [];
  const keyArr = Object.keys(data) as JsonDataKey[];

  while (true) {
    const oneRow: OneRow = {};
    keyArr.forEach((key) => {
      const currentKey = key === "1" ? "keyword" : key;
      oneRow[currentKey] = data[key][idx];
    });
    result.push(oneRow);

    if (data[keyArr[0]][idx.toString()] === undefined) {
      break;
    }
    idx++;
  }

  return result;
}

export default function ModeView() {
  const convertedData = use(
    fetch("http://localhost:8000/api/mode").then((res) =>
      res.json().then(convertDataToTable)
    )
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">
          Most frequent query year/month
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>keyword</TableHead>
              <TableHead className="text-center">year</TableHead>
              <TableHead className="text-center">month</TableHead>
              <TableHead className="text-center">level2</TableHead>
              <TableHead className="text-right">countries share</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {convertedData.map(
              ({ keyword, year, month, level_2, countries_share }, idx) => (
                <TableRow key={`${idx}-${keyword}`}>
                  <TableCell>{keyword}</TableCell>
                  <TableCell className="text-center">{year}</TableCell>
                  <TableCell className="text-center">{month}</TableCell>
                  <TableCell className="text-center">{level_2}</TableCell>
                  <TableCell className="text-right">
                    {countries_share}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
