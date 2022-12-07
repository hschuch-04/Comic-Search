import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import DisplaySeries from './Components/DisplaySeries';

// --------------------------------- The Main Page --------------------------------- //


// The main application
function App() {
  const [search, setSearch] = useState("");
  const [apiSeries, setApiSeries] = useState({});
  const [apiNews, setApiNews] = useState({});
  const [button, setButton] = useState('Submit')
  const [active, setActive] = useState(false)


  // The backend function to star the API calls
  async function fetchData() {
    setButton('Loading...')
    setActive(true)
    await axios.get(`/comic/${search}`)
      .then((response) => {
        setApiSeries(response.data.series.data)
        setApiNews(response.data.news)
        setButton('Submit')
        setActive(false)
      })
      .catch((error) => {
        setButton('Submit')
        setActive(false)
        alert(`There was an issue finding that Comic Series: ${search}`)
      })

  }

  // The function for handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  }

  // The Core of the Application
  return (
    <>
      <div className='bg'>
        <div className="search-container shadow">
          <div className="filter-sort">
            <h1>The Comic Search</h1>
            <hr />
            <form className="contact-form"
              onSubmit={handleSubmit}
              method="POST"
              target="_blank"
            >
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search Here..."
                  value={search}
                  required
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button
                  type="submit"
                  className="border-0 submit-question submit-button"
                  disabled={active}
                >
                  {button}
                </button>
              </div>
            </form>

            <DisplaySeries series={apiSeries} news={apiNews} />

          </div>
        </div>
        <div className='bottom'></div>
      </div>
    </>
  );
}

export default App;
