import React from 'react';

// Populates the page with information received from the NEWS API
function RelatedNews(props) {
    return (
        <div className='news-container'>
            <h3>Related News</h3>
            <div className='news'>
                {props.bool === false ? <>There are no related articles available currently</>
                    :
                    <>
                        <h5>{props.data.title}</h5>
                        <p>{props.data.description}</p>
                        <a href={props.data.url}>{props.data.source.name}</a>
                    </>
                }
            </div>
        </div>
    )
}
export default RelatedNews;