import Heading from "@/components/heading";
import {
  getAllSubmissions,
  getLatestAcSubmissions,
  getProblems,
  getAcCount,
} from "@/lib/atcoder";

export default async function Page() {
  const problems = await getProblems();
  const allSubmissions = await getAllSubmissions();
  const latestCppSubmissions = getLatestAcSubmissions(
    problems,
    allSubmissions,
    20,
    "C++"
  );
  const latestPythonSubmissions = getLatestAcSubmissions(
    problems,
    allSubmissions,
    20,
    "Python"
  );
  const acCount = await getAcCount();

  // TODO: ユーザーのAtCoderプロフィールページへのリンク
  // TODO: AC数の表示
  // TODO: 直近の提出一覧
  return (
    <div>
      <Heading labelJa="競技プログラミング" labelEn="Competitive Programming" />
      <p>AC 提出数: {acCount}</p>
      <pre>{JSON.stringify(latestCppSubmissions, null, 2)}</pre>
    </div>
  );
}
