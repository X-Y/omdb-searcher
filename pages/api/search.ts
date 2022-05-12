import type { NextApiRequest, NextApiResponse } from 'next'
import http from 'http';

import omdbApiHandler from '../../lib/backendApi';


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
  let searchParams: [string, string][] = [];

  const query = req.query;

  for(const [key, value] of Object.entries(query)) {
    if(isValidSearchParam(key) && typeof value === 'string') {
      searchParams.push([queryKeys[key], value]);
    }
  }

  omdbApiHandler(req, res, searchParams);

}
