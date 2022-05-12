import {FormEvent} from "react";

export const SearchBar = () => {
  const onFormSubmit = (e: FormEvent) => {
    const target = e.target as typeof e.target & {
      title: {value: string};
      type: {value: string};
      releaseYear: {value: number}
    }
    const searchQueries = Object.fromEntries([
      ['title', target.title.value],
      ['type', target.type.value],
      ['releaseYear', target.releaseYear.value]
    ].filter(([, val]) => !!val));

    fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(searchQueries)
    })
      .then(res => res.json())
      .then(data => console.log(data));
    e.preventDefault();
  }
  return <form onSubmit={onFormSubmit}>
    <div>
      <input type={'text'} name={'title'}/>
      <button>Search</button>
    </div>

    <div>
      <label>type:
        <select name={'type'}>
          <option value={''}>---</option>
          <option value={'movie'}>Movie</option>
          <option value={'series'}>Series</option>
          <option value={'episode'}>Episode</option>
        </select>
      </label>
      <label>release year: <input type={'number'} min={1850} max={2022} name={'releaseYear'} /></label>
    </div>

  </form>
}
