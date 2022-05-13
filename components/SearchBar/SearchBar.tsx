import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

import styles from '../../styles/SearchBar.module.css'

interface SearchBarProps {
  text?: string;
}
export const SearchBar:FC<SearchBarProps> = ({text= ''}) => {
  const [title, setTitle] = useState(text);
  const router = useRouter();

  useEffect(() => {
    if(text !== title) {
      setTitle(text)
    }
  }, [text])
  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    router.push('/search/' + title);
  }
  const onInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  return <form onSubmit={onFormSubmit} className={styles.form}>
      <input className={styles.searchBar} type={'text'} name={'title'} value={title} onChange={onInputChange}/>
      <Button variant={'contained'}>Search</Button>
  </form>
}
