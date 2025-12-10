import Heading from "@/components/heading";
import LinkCard from "@/components/linkCard";
import SubmissionTable from "@/components/submissionTable";
import { OverviewCard, OverviewField } from "@/components/overviewCard";
import {
  getAllSubmissions,
  getLatestAcSubmissions,
  getProblems,
  getAcCount,
  getLatestRating,
} from "@/lib/atcoder";
import { getColorsAndRatingToNextColor } from "@/lib/atcoder-rating";
import { fetchMeta } from "@/lib/meta";
import Heading2 from "@/components/heading2";

export default async function Page() {
  // 問題・提出情報の取得
  const problems = await getProblems();
  const allSubmissions = await getAllSubmissions();
  const latestSubmissions = getLatestAcSubmissions({
    problems: problems,
    submissions: allSubmissions,
    limit: 20,
  });

  // リンク先のメタ情報の取得
  const userPageMeta = await fetchMeta("https://atcoder.jp/users/ktsn_ud");
  const infoPageMeta = await fetchMeta(
    "https://info.atcoder.jp/utilize/jobs/rating-business-impact"
  );

  // AC数・Rating
  const acCount = await getAcCount();
  const currentRating = await getLatestRating();
  const { currentColor, nextColor, ratingToNextColor } =
    getColorsAndRatingToNextColor(currentRating);

  // TODO: 直近の提出一覧
  return (
    <div>
      <Heading labelJa="競技プログラミング" labelEn="Competitive Programming" />
      <LinkCard href="https://atcoder.jp/users/ktsn_ud" meta={userPageMeta} />
      <LinkCard
        href="https://info.atcoder.jp/utilize/jobs/rating-business-impact"
        meta={infoPageMeta}
      />

      <OverviewField>
        <OverviewCard>
          <div>AC提出数</div>
          <div className="grow flex flex-col justify-center items-center">
            <div className="text-3xl font-bold">
              {acCount}
              <span className="text-base"> 件</span>
            </div>
          </div>
        </OverviewCard>
        <OverviewCard>
          <div>Rating</div>
          <div className="grow flex flex-col justify-center items-center">
            <div
              className="text-3xl font-bold"
              style={{ color: currentColor.code }}
            >
              {currentRating}
            </div>
            <div className="text-sm">
              <span style={{ color: nextColor?.code }}>
                {nextColor?.name}色
              </span>
              まで +{ratingToNextColor}
            </div>
          </div>
        </OverviewCard>
      </OverviewField>

      <Heading2>直近のAC提出</Heading2>
      <p>最新のAC提出を20件表示しています。</p>
      <p className="text-text-secondary text-sm">
        ※ACとはAcceptedのことで、正解した提出のことを指します。
      </p>
      <SubmissionTable submissions={latestSubmissions} />
    </div>
  );
}
