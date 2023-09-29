import ModeView from "./(views)/ModeView";
import RankingKeywordView from "./(views)/RankingKeywordView";
import WordCloud from "./(views)/WordCloud";

export default function Home() {
  return (
    <main className=" min-h-screen p-10">
      <div className="w-full">
        <div className="flex justify-between space-y-2 w-full">
          <h1 className="text-3xl font-bold tracking-tight">
            Top 20 most searched queries in Google
          </h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          <RankingKeywordView />
          <ModeView />
          <WordCloud />
        </div>
      </div>
    </main>
  );
}
