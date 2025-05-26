import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import ReportedCommentItem from "../organisms/ReportedCommentItem";
import { useComments } from "../../hooks/useComments";
import { ReportedComment } from "../../models/ReportedComment";
import { useBannedUsers } from "../../hooks/useBannedUsers";
import BannedUserItem from "../organisms/BannedUserItem";

const AdminReportsPage = () => {
  const { t } = useTranslation();
  const { getReportedComments, deleteComment, unreportComment } = useComments();
  const [reported, setReported] = useState<ReportedComment[]>([]);
  const { bannedUsers, loading: loadingBanned, unbanUser } = useBannedUsers();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await getReportedComments();
      setReported(res);
      setLoading(false);
    };
    fetch();
  }, [getReportedComments]);

    const handleBlock = (userId: number) => {
    unbanUser(userId);
    };
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col select-none">
      <Header />
      <main className="flex-1 px-4 py-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-10 text-center">{t("reports")}</h1>

        <div className="w-full max-w-7xl flex gap-4">
          {/* Comentarios Reportados */}
          <div className="w-[60%] border-r border-white pr-4">
            <h2 className="text-xl font-bold mb-2 border-b border-white pb-1">
              {t("reported_comments")}
            </h2>
            {loading ? (
              <p className="text-gray-400 text-sm">{t("loading")}</p>
            ) : reported.length === 0 ? (
              <p className="text-gray-400 text-sm">{t("no_reports")}</p>
            ) : (
              reported.map((report) => (
                <ReportedCommentItem
                  key={report.id}
                  commentText={report.commentText}
                  primaryTitle={report.primaryTitle}
                  tconst={report.tconst}
                  user={report.user}
                  replyToUserId={report.replyToUserId}
                  replyToUsername={report.replyToUsername}
                  onBlock={() => handleBlock(report.user.id)}
                  onDelete={() => deleteComment(report.id)}
                  onUnreport={() => unreportComment(report.id)}
                />
              ))
            )}
          </div>

          {/* Usuarios Bloqueados */}
          <div className="w-[40%] pl-4">
            <h2 className="text-xl font-bold mb-2 border-b border-white pb-1">
              {t("blocked_users")}
            </h2>
            {loadingBanned ? (
              <p className="text-gray-400 text-sm">{t("loading")}</p>
            ) : (bannedUsers?.length ?? 0) === 0 ? (
              <p className="text-gray-400 text-sm">{t("no_blocked_users")}</p>
            ) : (
              (bannedUsers ?? []).map((user) => (
                <BannedUserItem
                  key={user.id}
                  id={user.id}
                  username={user.username}
                  profileImageUrl={user.profileImageUrl}
                  currentRank={user.currentRank}
                  trendDirection={user.trendDirection}
                  onUnban={() => unbanUser(user.id)}
                />
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminReportsPage;
