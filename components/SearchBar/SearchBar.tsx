import {FormEvent} from "react";
import { useRouter } from 'next/router';

export const SearchBar = () => {
  const router = useRouter();

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      title: {value: string};
    }

    router.push('/search/' + target.title.value);
  }
  return <form onSubmit={onFormSubmit}>
    <div>
      <input type={'text'} name={'title'}/>
      <button>Search</button>
    </div>
  </form>
}
