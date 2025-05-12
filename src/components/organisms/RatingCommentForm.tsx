import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface Props {
  onSubmit: (text: string, containsSpoiler: boolean) => void;
}

const isValidAscii = (text: string): boolean => {
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) > 255) {
      return false;
    }
  }
  return true;
};

const RatingCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [containsSpoiler, setContainsSpoiler] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) {
      toast.error(t("empty_comment"));
      return;
    }

    if (!isValidAscii(text)) {
      toast.error(t("invalid_characters"));
      return;
    }

    onSubmit(text, containsSpoiler);
    setText("");
  };

  return (
    <div className="bg-neutral-900 p-4 rounded-lg mt-4 text-center w-full">
      <textarea
        className="w-full p-2 rounded bg-neutral-800 text-white text-sm resize-none mb-2"
        placeholder={t("write_comment")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
      <div className="flex justify-between items-center">
        <label className="flex items-center gap-2 text-sm text-gray-400">
          <input
            type="checkbox"
            checked={containsSpoiler}
            onChange={(e) => setContainsSpoiler(e.target.checked)}
            className="form-checkbox text-red-500"
          />
          {t("contains_spoiler")}
        </label>
        <button
          onClick={handleSubmit}
          className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
        >
          {t("submit")}
        </button>
      </div>
    </div>
  );
};

export default RatingCommentForm;
