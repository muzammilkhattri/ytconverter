export const config = {
  api: {
    responseLimit: false,
  },
};
const ytdl = require("ytdl-core");


import { NextApiRequest, NextApiResponse } from 'next';

export default function yt(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === "POST") {
    try {
      const url = request.body.url;
      const type = request.body.type;
      if (type === "mp3") {
        response.setHeader("content-type", "audio/mpeg");
        ytdl(url, {
          format: "mp3",
          filter: "audioonly",
        }).pipe(response);
      } else if (type === "mp4") {
        response.setHeader("content-type", "video/mp4");
        ytdl(url).pipe(response);
      }
    } catch (err) {
      console.log("err: ", err);
    }
  } else {
    response.status(400).json({ result: false });
  }
}
