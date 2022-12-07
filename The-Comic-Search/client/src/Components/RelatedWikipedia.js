import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Grabs related wikipedia details about the creators
function RelatedWikipedia(props) {
    const [wikiLink, setWikiLink] = useState([]) // All the wiki information

    // Fetches wikipedia api info
    async function fetchWiki() {
        let results = [];
        let promises = [];
        for (let i = 0; i < props.data.items.length; i++) {
            promises.push(
                axios.get(`/wiki/${props.data.items[i].name}`).then(response => {
                    for (var key in response.data.pages) {
                        results.push(response.data.pages[key])
                    }
                })
            )
        }
        // Awaits all promises to resolve
        Promise.all(promises)
            .then(() => {
                setWikiLink(results)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Checks whether props have been passed with information
    useEffect(() => {
        if (props.data != {}) {
            fetchWiki()
        }
    }, [props.data])


    return (
        <div className='wiki-container'>
            <h3>Related Wikipedia</h3>
            <div className='wiki'>
                {wikiLink.length === 0 ? <>There was no Creators or Artists available</>
                    :
                    <ul>
                        {wikiLink.map((data, i) => {
                            return (
                                <li><b>{data.title}</b> - <a href={data.fullurl}>{data.fullurl}</a></li>
                            )
                        })}
                    </ul>
                }

            </div>
        </div>
    )
}

export default RelatedWikipedia;