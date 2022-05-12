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


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiReq = http.get('http://www.omdbapi.com/?s=fiction&apikey=' + process.env.API_KEY, function(apiRes) {
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
