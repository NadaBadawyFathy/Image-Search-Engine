import React, { useRef, useState } from 'react'
import './ImageSearch.css'
import ResultsSearch from './ResultsSearch';
const ImageSearch = () => {

    const [results,setResults] = useState([]);
    const [visibleBtn,setvisibleBtn] = useState('none');
    const [page,setPage] = useState(1);
    const inputRef = useRef(null);

    let keyword = "";
    let accessKey = 'bITxVU4xI6RxBF8_JY6nyn-KeXZoyFMNisEUW29D-Sk';

    async function searchImages(valuePage) {
        keyword = inputRef.current.value;
        if (keyword !=='') {
            const url = `https://api.unsplash.com/search/photos?page=${valuePage}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    
            let response = await fetch(url);
            let data = await response.json();
    
            let getResults = await data.results;

            setResults(prevResults => [...prevResults,...getResults]);
            setvisibleBtn('block')
        }else{
            return;
        }
    }

    function submitForm() {
        setResults([]);
        searchImages(1);
        setPage(2)
      }

    function showMore() {
        searchImages(page);
        setPage(page +1);
    }

  return (
    <div className='ai-image-generator'>
      <div className="header">Image Search <span>Engine</span></div>

      <div className="search-form">
        <input ref={inputRef} type="text" className='search-box' placeholder='Search anything here...'/>
        <div className="search-btn" onClick={()=> submitForm()}>Search</div>
      </div>

      <div id="search-result">
            {
                results.map((result, index) => (
                  <ResultsSearch key={index} link={result.links.html} img={result.urls.small}/>
                ))
            }

      </div>
      <button id="show-more-btn" onClick={()=> showMore()} style={{display: visibleBtn}}>Show more</button>
    </div>
  )
}
export default ImageSearch;
