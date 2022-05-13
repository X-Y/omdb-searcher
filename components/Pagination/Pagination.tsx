import { useRouter } from 'next/router'
import {MovieSearchResult} from "../../interfaces/MovieSearch";
import {ChangeEvent, FC, useEffect, useRef, useState} from "react";

interface PaginationProps extends Pick<MovieSearchResult, 'totalResults'> {

}
export const Pagination:FC<PaginationProps> = ({totalResults}) => {
  const router = useRouter();

  const {pathname, query} = router;
  const {page} = router.query;

  const totalResultNum = parseInt(totalResults || '0', 10);
  const totalPages = Math.floor(totalResultNum / 10) + 1;

  const currentPage = typeof page === 'string' && parseInt(page, 10) || 1;
  const prevPage = currentPage > 1 ? (currentPage - 1) : 1;
  const nextPage = currentPage < totalPages ? (currentPage + 1) : totalPages;

  const [pageSetterValue, setPageSetterValue] = useState(currentPage);

  useEffect(() => {
    if(currentPage !== pageSetterValue) {
      setPageSetterValue(currentPage);
    }

    const prevUrl = router.asPath.replace(/page=\d+/, 'page=' + prevPage)
    const nextUrl = router.asPath.replace(/page=\d+/, 'page=' + nextPage)
    router.prefetch(prevUrl);
    router.prefetch(nextUrl);

  }, [router])

  const setPage = (page: number) => {
    router.query.page = page + '';
    router.push({pathname, query});
  }

  const onPrevClick = () => {
    setPage(prevPage);
  }
  const onNextClick = () => {
    setPage(nextPage);
  }
  const onPageSet = () => {
    setPage(pageSetterValue);
  }
  const onPageSetterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value || '') || 1;
    const pageToSet = Math.min(Math.max(inputValue, 1), totalPages);
    setPageSetterValue(pageToSet);
  }
  return <div>
    <button onClick={onPrevClick}>prev</button>
    <input type={'text'} value={pageSetterValue} onChange={onPageSetterChange} onBlur={onPageSet}/>/{totalPages}
    <button onClick={onNextClick}>next</button>
  </div>
}
