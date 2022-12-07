import React from 'react';

// Creates the list elements for the page
function PopulateList(props) {
    return (
        <div className={props.title + '-container'}>
            <h3>{props.title}</h3>
            <div className={props.title}>
                {props.data.available === 0 ? <>There were no {props.title} recorded </>
                    :
                    <ul>{props.data.items.map((response, i) => {
                        return (
                            <li>{response.name}</li>
                        )
                    })}</ul>
                }
            </div>
        </div>
    )
}

export default PopulateList;