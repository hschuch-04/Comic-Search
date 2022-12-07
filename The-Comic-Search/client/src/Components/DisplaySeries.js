import React, { useEffect, useState } from 'react';
import './DisplaySeries.css';
import './PopulateList.js';
import PopulateList from './PopulateList.js';
import RelatedNews from './RelatedNews.js';
import RelatedWikipedia from './RelatedWikipedia';

// Displaying all the comics
function DisplaySeries(props) {
  const [count, setCount] = useState(0)                   // Checks whether to update the <div></div>
  const [characters, setCharacters] = useState({})        // The character list
  const [issues, setIssues] = useState(0)                // The amount of issues available
  const [creators, setCreators] = useState({})            // The creators list
  const [description, setDescription] = useState("")      // The description
  const [event, setEvent] = useState([])                  // The event that occurs in the series
  const [image, setImage] = useState("")                  // The thumbnail of the series\
  const [title, setTitle] = useState("")                  // The working title of the series
  const [next, setNext] = useState({})                    // The next series after the comic
  const [previous, setPrevious] = useState({})            // The previous series of the comic

  const [article, setArticle] = useState({})
  const [returnArticle, setReturnArticle] = useState(false)


  // Populates the series data from the first api
  function createSeries() {
    if (props.series.count > 0) {
      setCount(props.series.count)
      setTitle(props.series.results[0].title)
      setImage(props.series.results[0].thumbnail.path + "." + props.series.results[0].thumbnail.extension)
      setDescription(props.series.results[0].description)
      setEvent(props.series.results[0].events)
      setCharacters(props.series.results[0].characters)
      setIssues(props.series.results[0].comics.available)
      setCreators(props.series.results[0].creators)
      setNext(props.series.results[0].next)
      setPrevious(props.series.results[0].previous)
    }
  }


  // Populates the news data from the second api
  function createNews() {
    if (props.news.totalResults > 0) {
      setArticle(props.news.articles[0])
      setReturnArticle(true)
    }
  }


  // Update the values when 
  useEffect(() => {
    createSeries()
    createNews()
  }, [props.series, props.news])



  // The Information of the Series
  return (
    <div>
      {count === 0 ? <></>
        :
        <div className='wrapper'>
          <div className='profile-information shadow'>
            <h5 className='title-text'>{title}</h5>
            <div className='thumbnail-container'>
              <a href={image}><img className='thumbnail-image' src={image} /></a>
            </div>
            <div className='info-header'>
              <h6>Series Information</h6>
            </div>
            <div className='issues-container'>
              <b>Total Issues:</b> {issues}
            </div>
            <div className='events-container'>
              <b>Events:</b> {event.available === 0 ? <>No Major Events</> :
                <ul>
                  {event.items.map((response, i) => {
                    return (
                      <li>
                        {response.name}
                      </li>
                    )
                  })}
                </ul>
              }
            </div>
            <div className='previous-container'>
              <b>Previous Series:</b> {previous === null ? <>None</> : <>{previous.name}</>}
            </div>
            <div className='next-container'>
              <b>Next Series:</b> {next === null ? <>None</> : <>{next.name}</>}
            </div>
          </div>

          <div className='series-information'>
            <div className='description-container'>
              <h3>Description</h3>
              <div className='description'>
                {description === null ? <>There is currently no description available for this series.</> : <>{description}</>}
              </div>
            </div>
            <hr />
            <PopulateList title='Characters' data={characters} />
            <hr />
            <PopulateList title='Creators and Artists' data={creators} />
            <hr />
            <RelatedNews data={article} bool={returnArticle} />
            <hr />
            <RelatedWikipedia data={creators} />
          </div>
        </div>
      }
    </div>
  )
}


export default DisplaySeries;