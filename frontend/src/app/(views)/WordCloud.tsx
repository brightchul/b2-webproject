"use client";

import { use, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WordCloud() {
  const [selectedLocation, setSelectedLocation] = useState<
    undefined | string
  >();
  const [keywordLocationList, setKeywordLocationList] = useState<string[]>([]);
  const [countryRanks, setCountryRanks] = useState(5);
  const [wordCloudBase64, setSetKeywordLocationList] = useState();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/keyword/location")
      .then((res) => res.json())
      .then(({ data }) => setKeywordLocationList(data));
  }, []);

  useEffect(() => {
    if (!selectedLocation) return;

    const url = `http://127.0.0.1:8000/api/word-cloud?${
      selectedLocation ?? `country=${selectedLocation}&`
    }rank=${countryRanks}`;

    fetch(url)
      .then((res) => res.json())
      .then(({ data }) => setSetKeywordLocationList(data));
  }, [selectedLocation, countryRanks]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Word Cloud</CardTitle>
      </CardHeader>
      <CardContent className="mt-5">
        <div className="flex gap-3">
          <Select
            onValueChange={(value) => {
              setSelectedLocation(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {keywordLocationList.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              setCountryRanks(parseInt(value, 10));
            }}
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select Country Ranks" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={`${num}`}>
                    {num}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="min-h-[280px] mt-5 flex justify-center">
          {wordCloudBase64 && (
            <img src={`data:image/jpeg;base64,${wordCloudBase64}` ?? ""} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
