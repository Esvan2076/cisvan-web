import { BASE_API } from "../constants/api";
import { errorMessages } from "../constants/errors";
import { Content } from "../models/content";

export const getContentById = async (
  contentId: string,
  language: string
): Promise<Content> => {
  const url = `${BASE_API}/title/basic/${contentId}`;

  const response = await fetch(url, {
    headers: {
      "Accept-Language": language,
    },
  });

  if (!response.ok) throw new Error(errorMessages.content);

  const data = await response.json();

  return {
    ...data,
    streamingServices: Array.isArray(data.streamingServices) ? data.streamingServices : [],
  };
};
