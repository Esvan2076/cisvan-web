import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";  // Importación del toast

interface Props {
  onSubmit: (text: string, containsSpoiler: boolean) => void;
  onCancel: () => void;
}

const isValidAscii = (text: string): boolean => {
  // Verifica si cada carácter está en el rango ASCII extendido (0-255)
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) > 255) {
      return false;
    }
  }
  return true;
};

const CommentForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [containsSpoiler, setContainsSpoiler] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) {  // Verifica que el comentario no esté vacío o tenga solo espacios
      toast.error(t("empty_comment"));  // Muestra el Toast de error
      return;
    }

    if (!isValidAscii(text)) {  // Verifica si contiene caracteres fuera del rango ASCII extendido
      toast.error(t("invalid_characters"));  // Muestra el Toast de error
      return;
    }

    onSubmit(text, containsSpoiler);
    setText("");
  };

  return (
    <div className="bg-neutral-800 p-3 rounded mb-4">
      <textarea
        className="w-full p-2 rounded bg-neutral-700 text-white text-sm resize-none mb-2"
        placeholder={t("write_comment")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-400">
          <input
            type="checkbox"
            checked={containsSpoiler}
            onChange={(e) => setContainsSpoiler(e.target.checked)}
            className="form-checkbox text-red-500"
          />
          {t("contains_spoiler")}
        </label>
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-blue-500 text-white rounded text-xs font-bold hover:bg-blue-600 transition"
          >
            {t("submit")}
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-red-500 text-white rounded text-xs font-bold hover:bg-red-600 transition"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
