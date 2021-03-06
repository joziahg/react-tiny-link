import { ReactTinyLinkType } from '../../ReactTinyLinkTypes';
import { isEmpty, getYoutTubeVideoId } from "../utils";

const titleRegex = /"title":"(.+?)"/g;

export const ScrapYoutube = async (url, htmlDoc) => {
  const id = getYoutTubeVideoId(url);
  try {
    const { title } = JSON.parse(
      `{${
        htmlDoc
          .querySelector('html')
          .innerHTML.toString()
          .match(titleRegex)[0]
      }}`,
    );
    return {
      title: title,
      url: url,
      description: url,
      type: ReactTinyLinkType.TYPE_YOUTUBE,
      video: [],
      image: [
        `https://img.youtube.com/vi/${id}/0.jpg`,
        `https://img.youtube.com/vi/${id}/1.jpg`,
        `https://img.youtube.com/vi/${id}/2.jpg`,
        `https://img.youtube.com/vi/${id}/3.jpg`,
      ].filter(i => !isEmpty(i)),
    };
  } catch (error) {
    return {
      title: htmlDoc.querySelector('title').innerText,
      url: url,
      description: url,
      type: ReactTinyLinkType.TYPE_YOUTUBE,
      video: [],
      image: [
        `https://img.youtube.com/vi/${id}/0.jpg`,
        `https://img.youtube.com/vi/${id}/1.jpg`,
        `https://img.youtube.com/vi/${id}/2.jpg`,
        `https://img.youtube.com/vi/${id}/3.jpg`,
      ].filter(i => !isEmpty(i)),
    };
  }
};
