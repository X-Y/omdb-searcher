import type { NextApiRequest, NextApiResponse } from 'next'
import http from 'http';

import omdbApiHandler from '../../lib/api';

interface GetMovieParams {
  id?: string;
  title?: string;
  type?: 'movie' | 'series' | 'episode';
  releaseYear?: string;
  plot?: 'short' | 'full';
  dataType?: 'json' | 'xml';
  callback?: string;
  apiVersion?: number;
}

const queryKeys = {
  id: 'i',
  title: 't',
  type: 'type',
  releaseYear: 'y',
  plot: 'plot',
  dataType: 'r',
  callback: 'callback',
  apiVersion: 'v'
}

function isValidGetMovieParam(key: string): key is keyof GetMovieParams {
  return key in queryKeys;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let searchParams: [string, string][] = [];

  const query = req.query;

  for(const [key, value] of Object.entries(query)) {
    if(isValidGetMovieParam(key) && typeof value === 'string') {
      searchParams.push([queryKeys[key], value]);
    }
  }

  omdbApiHandler(req, res, searchParams);
}
