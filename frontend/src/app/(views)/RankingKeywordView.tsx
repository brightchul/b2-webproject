"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const rankNumberArr = Array.from({ length: 14 }, (_, idx) =>
  (idx + 1).toString()
);

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

export default function RankingKeywordView() {
  const [rankNumber, setRankNumber] = useState("1");
  const [rankData, setRankData] = useState<RankData>();

  useEffect(() => {
    if (!rankNumber) return;

    fetch(`http://127.0.0.1:8000/api/keyword/rank/${rankNumber}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setRankData(convertRankData(data));
      });
  }, [rankNumber]);

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Ranking Keyword</CardTitle>
        </CardHeader>
        <CardContent className="mt-5">
          <div className="flex gap-3">
            <Select
              defaultValue={rankNumber}
              onValueChange={(value) => {
                setRankNumber(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {rankNumberArr.map((rankNum) => (
                    <SelectItem key={rankNum} value={`${rankNum}`}>
                      {rankNum}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="min-h-[280px] mt-5 flex justify-center">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={rankData}>
                <XAxis dataKey="country" stroke="#888888" fontSize={12} />
                <YAxis
                  dataKey="frequency"
                  stroke="#888888"
                  fontSize={12}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="frequency" fill="#82ca9d" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="keyword" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
