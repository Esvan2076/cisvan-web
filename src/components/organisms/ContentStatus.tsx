import React from "react";
import { useTranslation } from "react-i18next";
import { FaSpinner, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

interface ContentStatusProps {
  loading?: boolean;
  error?: string;
  notFound?: boolean;
  loadingMessage?: string;
  errorMessage?: string;
  notFoundMessage?: string;
  children: React.ReactNode;
}

const ContentStatus: React.FC<ContentStatusProps> = ({
  loading,
  error,
  notFound,
  loadingMessage,
  errorMessage,
  notFoundMessage,
  children,
}) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="text-white text-center p-4 animate-pulse">
        <FaSpinner className="inline-block mr-2 animate-spin" />
        {loadingMessage || t("loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <FaExclamationTriangle className="inline-block mr-2" />
        {errorMessage || `${t("error")}: ${error}`}
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-gray-400 text-center p-4">
        <FaInfoCircle className="inline-block mr-2" />
        {notFoundMessage || t("no_data")}
      </div>
    );
  }

  return <>{children}</>;
};

export default ContentStatus;
