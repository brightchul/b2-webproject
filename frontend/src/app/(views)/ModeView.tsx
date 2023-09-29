import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { OneRow } from "../api/mode/type";

async function getModeData(): Promise<OneRow[]> {
  const data = await fetch("http://localhost:3000/api/mode");
  const jsonData = await data.json();
  return jsonData.data;
}

export default async function ModeView() {
  const modeData = await getModeData();

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
            {modeData &&
              modeData.map(
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
