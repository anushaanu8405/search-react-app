import React from 'react';

import './search-results.css';

function SearchResults(props) {

    if (!props.searchKey) {
        return null
    }
    const recipes = props.recipes.map(({ recipe }, index) => {
        return (
            <div className="card" key={recipe.label + index}>
                <img className="card-img" src={recipe.image} alt="image of the recipe" />
                <div className="card-body">
                    <p>{recipe.label}</p>
                </div>
            </div>
        )
    });

    return (
        <React.Fragment>
            {props.recipes.length ? recipes : <p className="no-records-view">No records found</p>}
        </React.Fragment>
    )
}

export default SearchResults
