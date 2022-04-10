import axios from 'axios';
import { Fetcher } from 'swr';

export const fetcher: Fetcher<any> = (url: string) =>
  axios.get(url).then((res) => res.data);
