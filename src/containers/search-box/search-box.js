import React, { Component } from 'react';
import { API_BASE_URL } from '../../instance';
import SearchResults from '../search-results/search-results';
import logo from '../../logo.svg';

import './search-box.css';

export class SearchBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchKey: '',
            errorInfo: null,
            isLoading: false,
            results: [],
            recentSearchKeys: []
        }
    }

    handleInputChange = (event) => {
        this.setSearchKey(event.target.value);
    }

    setSearchKey = (searchKey) => {
        if (searchKey && searchKey.trim()) {
            this.setState({
                searchKey
            }, () => {
                if (!this.state.isLoading) {
                    this.getSearchResults();
                }
            });
        } else {
            this.setState({
                searchKey: '',
                results: [],
            });
        }
    }

    getSearchResults = () => {
        this.setState({
            isLoading: true,
        }, () => {
            let searchKey = this.state.searchKey;
            fetch(`${API_BASE_URL}&q=${searchKey}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET'
                }
            })
                .then(res => res.json())
                .then((res) => {
                    if (res && res.status && res.status === 'error') {
                        this.setState({
                            isLoading: false,
                            results: [],
                            errorInfo: { ...res }
                        });
                    } else {
                        this.addToRecentSearchKeys(searchKey);
                        this.setState({
                            isLoading: false,
                            results: res.hits ? res.hits : [],
                            errorInfo: null
                        });
                        if (this.state.searchKey && searchKey && this.state.searchKey !== searchKey) {
                            this.getSearchResults();
                        }
                    }
                }, (error) => {
                    this.setState({
                        isLoading: false,
                        results: [],
                        errorInfo: error
                    });
                });
        });
    }

    addToRecentSearchKeys(key) {
        const searchKeys = this.state.recentSearchKeys;
        if (searchKeys.length === 5) {
            searchKeys.pop();
        }
        const trimmedKey = key && key.trim();
        if (!searchKeys.includes(trimmedKey)) {
            searchKeys.unshift(trimmedKey);
        }
        this.setState({ recentSearchKeys: searchKeys })
    }




    render() {

        const { searchKey, recentSearchKeys, isLoading, errorInfo, results } = this.state;

        const recentSearches = recentSearchKeys.map((key, index) =>
            <span key={key + index} className="recent-search-item" onClick={() => this.setSearchKey(key)}>
                {key}
            </span>
        );


        return (
            <div >
                <input type="text"
                    className="form-control"
                    placeholder="Search for recipes"
                    aria-label="search"
                    onChange={this.handleInputChange}
                    value={searchKey} />

                {/* Recent Searches */}
                {
                    recentSearchKeys && recentSearchKeys.length > 0 ?
                        <div className="recent-search-view">
                            Your recent searches are : {recentSearches}
                        </div> : null
                }

                {/* Search results */}
                {isLoading ?
                    <p>
                        Loading.....
                    <img src={logo} className="App-logo slow-animation" alt="logo" />
                    </p>
                    : errorInfo && errorInfo.message ? <p style={{ color: 'red' }}>{errorInfo.message}</p> :
                        <>
                            {searchKey ? <p>Search Results for <b>{searchKey}</b> are</p> : ""}
                            <SearchResults recipes={results} searchKey={searchKey} />
                        </>
                }
            </div>
        )
    }
}

export default SearchBox
