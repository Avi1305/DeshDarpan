import React, { Component } from 'react'
import Newscomponent from './Newscomponent'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        pageSize: 6,
        country: "in",
        category: "general"
    };
    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
    };


    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0

        }
        document.title = `${this.capitalizeFirstLetter((this.props.category))} - DeshDarpan`
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=ca6c3d24861f40e1bba30492f8f51a0f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        this.props.setProgress(20)
        let data = await fetch(url)
        this.props.setProgress(40)

        let parsedData = await data.json();
        this.props.setProgress(70)

        this.setState({
            // page: this.state.page + 1,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)


    }
    async componentDidMount() {
        
        this.updateNews();

    }


    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca6c3d24861f40e1bba30492f8f51a0f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };


    handleNextClick = async () => {
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        //     console.log("Next")
        //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=ca6c3d24861f40e1bba30492f8f51a0f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true })
        //     let data = await fetch(url)
        //     let parsedData = await data.json();
        //     this.setState({ loading: false })
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles
        //     })
        // }
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    handlePreviousClick = async () => {
        // console.log("Previous")
        // // this.setState({this.state.page})
        // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=ca6c3d24861f40e1bba30492f8f51a0f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url)
        // let parsedData = await data.json();
        // this.setState({ loading: false })
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles
        // })
        this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }

    render() {
        return (
            <div className='container'>
                <img style={{ width: "150px", position: "absolute", margin: "10px 0px", top: "65px", borderRadius: "20px" }} src="/LOGO.png" alt="" />
                <h1 className='text-center' style={{ margin: "50px 0 80px 0" }}>DeshDarpan - Top {this.capitalizeFirstLetter((this.props.category))}  Headlines </h1>
                {this.state.loading && <Spinner />}
                
                <InfiniteScroll
                    next={this.fetchMoreData}
                    dataLength={this.state.articles.length}
                    hasMore={this.state.articles.length != this.state.totalResults}
                     // Updated hasMore condition
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => (
                                <div className="col-md-4 my-5" key={element.url}>
                                    <Newscomponent
                                        title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        imageurl={element.urlToImage ? element.urlToImage : "https://cdn.ndtv.com/common/images/ogndtv.png"}
                                        newsurl={element.url}
                                        author={element.author ? element.author : "Unknown"}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>



                {/* <div className="container d-flex justify-content-around">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    // </div> */}
                {/* {{this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newscomponent title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage ? element.urlToImage : "https://cdn.ndtv.com/common/images/ogndtv.png"} newsurl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}} */}

            </div>




        )
    }
}


export default News
