import { useRouter } from 'next/router'
import {MovieSearchResult} from "../../interfaces/MovieSearch";
import {FC} from "react";

interface PaginationProps extends Pick<MovieSearchResult, 'totalResults'> {

}
export const Pagination:FC<PaginationProps> = ({totalResults}) => {
  const router = useRouter();

  const {page} = router.query;

  const totalResultNum = parseInt(totalResults || '0', 10);
  const totalPages = totalResultNum / 10 + 1;

  const currentPage = typeof page === 'string' && parseInt(page, 10) || 1;

  const setPage = (page: number) => {
    router.query.page = page + '';
    router.push(router);
  }
  const onPrevClick = () => {
    setPage(currentPage > 1 ? (currentPage - 1) : 1)
  }
  const onNextClick = () => {
    setPage(currentPage < totalPages ? (currentPage + 1) : totalPages)
  }
  return <div>
    <button onClick={onPrevClick}>prev</button>
    {currentPage}
    <button onClick={onNextClick}>next</button>
  </div>
}
