import type { LatestAcSubmission } from "@/lib/atcoder";

function getSubmissionUrl(contestId: string, submissionId: number) {
  return `https://atcoder.jp/contests/${contestId}/submissions/${submissionId}`;
}

function convertEpochToDate(epochSecond: number) {
  const date = new Date(epochSecond * 1000);
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function removeBrackets(str: string) {
  return str.replace(/\(.+?\)/, "");
}

export default function SubmissionTable({
  submissions,
}: {
  submissions: LatestAcSubmission[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-y border-border">
        <thead>
          <tr className="bg-gray-600 text-white">
            <th className="p-2 border-y border-border w-30">提出日</th>
            <th className="p-2 border-y border-border w-50">問題</th>
            <th className="p-2 border-y border-border w-25">言語</th>
            <th className="p-2 border-y border-border w-20">得点</th>
            <th className="p-2 border-y border-border w-30">リンク</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s.id} className="even:bg-gray-100">
              <td className="p-2 border-y border-border w-30">
                {convertEpochToDate(s.epoch_second)}
              </td>
              <td className="p-2 border-y border-border truncate w-50">
                {s.problem.title}
              </td>
              <td className="p-2 border-y border-border w-25">
                {removeBrackets(s.language)}
              </td>
              <td className="p-2 border-y border-border w-20">{s.point}</td>
              <td className="p-2 border-y border-border w-30">
                <a
                  href={getSubmissionUrl(s.contest_id, s.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700"
                >
                  #{s.id}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
