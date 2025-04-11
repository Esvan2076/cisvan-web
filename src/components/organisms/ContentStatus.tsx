import React from "react";
import { useTranslation } from "react-i18next";

interface ContentStatusProps {
  loading?: boolean;
  error?: string;
  notFound?: boolean;
  children: React.ReactNode;
}

const ContentStatus: React.FC<ContentStatusProps> = ({
  loading,
  error,
  notFound,
  children,
}) => {
  const { t } = useTranslation();

  if (loading) {
    return <div className="text-white text-center p-4">{t("loading")}</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {t("error")}: {error}
      </div>
    );
  }

  if (notFound) {
    return <div className="text-white text-center p-4">{t("no_data")}</div>;
  }

  return <>{children}</>;
};

export default ContentStatus;
