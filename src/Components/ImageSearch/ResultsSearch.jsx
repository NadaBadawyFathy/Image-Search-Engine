import React from 'react'
import './ImageSearch.css';

const ResultsSearch = (props) => {
  return (
    <div>
        <a href={props.link} target="_blank" rel="noopener noreferrer">
            <img src={props.img} alt="" />
        </a>
    </div>
  )
}

export default ResultsSearch
