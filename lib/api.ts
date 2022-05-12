import {NextApiRequest, NextApiResponse} from "next";
import http from "http";


export default function omdbApiHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  searchParams: [string, string][]
) {
  const omdbUrl = new URL(process.env.API_URL || '');

  searchParams.forEach(([key, val]) => {
    omdbUrl.searchParams.append(key, val);
  })

  omdbUrl.searchParams.append('apikey', process.env.API_KEY || '');

  console.log(omdbUrl.href);

  const apiReq = http.get(omdbUrl.href, function(apiRes) {
    console.log('STATUS: ' + apiRes.statusCode);
    console.log('HEADERS: ' + JSON.stringify(apiRes.headers));

    apiRes.setEncoding('utf8');

    let output = '';
    apiRes.on('data', function(chunk) {
      output += chunk;
    }).on('end', function() {
      const jsonRes = JSON.parse(output);
      res.status(200).json(jsonRes)
    })
  });

  apiReq.on('error', function(e) {
    console.log('ERROR: ' + e.message);
    res.status(500)
  });
}
