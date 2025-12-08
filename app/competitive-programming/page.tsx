import Heading from "@/components/heading";
import LinkCard from "@/components/linkCard";
import {
  getAllSubmissions,
  getLatestAcSubmissions,
  getProblems,
  getAcCount,
} from "@/lib/atcoder";
import { fetchMeta } from "@/lib/meta";

export default async function Page() {
  const problems = await getProblems();
  const allSubmissions = await getAllSubmissions();
  const latestCppSubmissions = getLatestAcSubmissions({
    problems: problems,
    submissions: allSubmissions,
    limit: 20,
    language: "C++",
  });
  const latestPythonSubmissions = getLatestAcSubmissions({
    problems: problems,
    submissions: allSubmissions,
    limit: 20,
    language: "Python",
  });
  const acCount = await getAcCount();

  const userPageMeta = await fetchMeta("https://atcoder.jp/users/ktsn_ud");
  const infoPageMeta = await fetchMeta(
    "https://info.atcoder.jp/utilize/jobs/rating-business-impact"
  );

  // TODO: AC数の表示
  // TODO: 直近の提出一覧
  return (
    <div>
      <Heading labelJa="競技プログラミング" labelEn="Competitive Programming" />
      <LinkCard href="https://atcoder.jp/users/ktsn_ud" meta={userPageMeta} />
      <LinkCard
        href="https://info.atcoder.jp/utilize/jobs/rating-business-impact"
        meta={infoPageMeta}
      />
      <p>AC 提出数: {acCount}</p>
      <pre>{JSON.stringify(latestCppSubmissions, null, 2)}</pre>
    </div>
  );
}
