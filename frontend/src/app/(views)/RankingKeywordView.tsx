"use client";

import { useState } from "react";
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

import useRankData from "../hooks/useRankData";

const rankNumberArr = Array.from({ length: 14 }, (_, idx) =>
  (idx + 1).toString()
);

export default function RankingKeywordView() {
  const [rankNumber, setRankNumber] = useState("1");
  const rankData = useRankData(rankNumber);

  return (
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
  );
}
