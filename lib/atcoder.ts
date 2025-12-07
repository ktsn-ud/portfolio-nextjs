import "server-only";

const ATCODER_USER = "ktsn_ud";

function getYearAgoEpochSecond(years: number): number {
  const now = new Date();
  now.setFullYear(now.getFullYear() - years);
  return Math.floor(now.getTime() / 1000);
}

const FROM_SECOND = getYearAgoEpochSecond(1);

const API_PROBLEMS_URL = "https://kenkoooo.com/atcoder/resources/problems.json";
const API_SUBMISSIONS_URL = `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${ATCODER_USER}&from_second=${FROM_SECOND}`;
const API_AC_COUNT_URL = `https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=${ATCODER_USER}`;

interface RawProblem {
  id: string;
  contest_id: string;
  problem_index: string;
  name: string;
  title: string;
}

interface RawSubmission {
  id: number;
  epoch_second: number;
  problem_id: string;
  contest_id: string;
  user_id: string;
  language: string;
  point: number;
  length: number;
  result: string;
  execution_time: number;
}

interface LatestAcSubmission {
  id: number;
  epoch_second: number;
  problem: {
    id: string;
    title: string;
  };
  contest_id: string;
  language: string;
  point: number;
  result: string;
}

interface RawAcCount {
  count: number;
  rank: number;
}

export const LANGUAGES = ["C++", "Python"];
type Language = (typeof LANGUAGES)[number];

/**
 * Atcoder API から問題情報を取得する
 * @returns RawProblem[]
 */
export async function getProblems(): Promise<RawProblem[]> {
  const res = await fetch(API_PROBLEMS_URL, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch problems: ${res.status} ${res.statusText}`
    );
  }
  const fetchedData = (await res.json()) as RawProblem[];
  return fetchedData;
}

/**
 * Atcoder API から提出情報を取得する
 * @returns RawSubmission[]
 */
export async function getAllSubmissions(): Promise<RawSubmission[]> {
  const res = await fetch(API_SUBMISSIONS_URL, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch submissions: ${res.status} ${res.statusText}`
    );
  }
  const fetchedData = (await res.json()) as RawSubmission[];
  return fetchedData;
}

function isLanguageMatch(
  submissionLanguage: string,
  filterLanguage?: string
): boolean {
  if (!filterLanguage) {
    return true; // No filter applied
  }
  return submissionLanguage
    .toLowerCase()
    .includes(filterLanguage.toLowerCase());
}

/**
 * 最新の AC 提出情報を取得する
 * @param problems 問題情報の配列
 * @param submissions 提出情報の配列
 * @param limit 取得する提出数の上限
 * @param language 使用言語フィルタ（未指定の場合はすべての言語）
 * @returns LatestAcSubmissions[]
 */
export function getLatestAcSubmissions(
  problems: RawProblem[],
  submissions: RawSubmission[],
  limit?: number,
  language?: Language
): LatestAcSubmission[] {
  let acSubmissions = submissions
    .filter((s) => s.result === "AC" && isLanguageMatch(s.language, language))
    .sort((a, b) => b.epoch_second - a.epoch_second);

  if (limit) {
    acSubmissions = acSubmissions.slice(0, limit);
  }

  const titleMap: Record<string, string> = problems.reduce((acc, prob) => {
    acc[prob.id] = prob.title;
    return acc;
  }, {} as Record<string, string>);

  const latestAcSubmissions: LatestAcSubmission[] = acSubmissions.map(
    (submission) => ({
      id: submission.id,
      epoch_second: submission.epoch_second,
      problem: {
        id: submission.problem_id,
        title: titleMap[submission.problem_id] || "Unknown Title",
      },
      contest_id: submission.contest_id,
      language: submission.language,
      point: submission.point,
      result: submission.result,
    })
  );

  return latestAcSubmissions;
}

/**
 * AC 提出数をカウントする
 * @param submissions 提出情報の配列
 * @returns AC 提出数
 */
export async function getAcCount(): Promise<number> {
  const res = await fetch(API_AC_COUNT_URL, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch AC count: ${res.status} ${res.statusText}`
    );
  }
  const data = (await res.json()) as RawAcCount;
  return data.count;
}
