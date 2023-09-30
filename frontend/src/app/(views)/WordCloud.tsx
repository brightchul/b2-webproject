"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useKeywordLocationList from "../queries/useKeywordLocationList";
import useWordCloudBase64 from "../queries/useWordCloudBase64";

const arrLength30 = Array.from({ length: 30 }, (_, i) => i + 1);

export default function WordCloud() {
  const [selectedLocation, setSelectedLocation] = useState("US");
  const [countryRanks, setCountryRanks] = useState(5);

  const { data } = useKeywordLocationList();
  const keywordLocationList = data?.data;

  const { data: wordCloudData } = useWordCloudBase64(
    selectedLocation,
    countryRanks
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Word Cloud</CardTitle>
      </CardHeader>
      <CardContent className="mt-5">
        <div className="flex gap-3">
          <Select
            defaultValue={selectedLocation}
            onValueChange={setSelectedLocation}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {keywordLocationList &&
                  keywordLocationList.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            defaultValue={`${countryRanks}`}
            onValueChange={(value) => {
              setCountryRanks(parseInt(value, 10));
            }}
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select Country Ranks" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {arrLength30.map((num) => (
                  <SelectItem key={num} value={`${num}`}>
                    {num}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="min-h-[280px] mt-5 flex justify-center">
          {wordCloudData && (
            <img src={`data:image/jpeg;base64,${wordCloudData.data}`} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
