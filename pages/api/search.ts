import type { NextApiRequest, NextApiResponse } from 'next'
import http from 'http';

interface SearchParams {
  title: string;
  type?: 'movie' | 'series' | 'episode';
  releaseYear?: string;
  dataType?: 'json' | 'xml';
  page?: number;
  callback?: string;
  apiVersion?: number;
}

const queryKeys = {
  title: 's',
  type: 'type',
  releaseYear: 'y',
  dataType: 'r',
  page: 'page',
  callback: 'callback',
  apiVersion: 'v'
}

function isValidSearchParam(key: string): key is keyof SearchParams {
  return key in queryKeys;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.body;

  const omdbUrl = new URL(process.env.API_URL || '');

  for(const [key, value] of Object.entries(query)) {
    if(isValidSearchParam(key) && typeof value === 'string') {
      omdbUrl.searchParams.append(queryKeys[key], value);
    }
  }

  omdbUrl.searchParams.append('apikey', process.env.API_KEY || '');

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
