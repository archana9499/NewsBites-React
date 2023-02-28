import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize: 8,
    category:'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string
  }

  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading:false,
      page:1

    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsBites`;
}

async updateNews(){

  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dffbfe2a5f9c47078a9b13f9ee891e3b&page=${this.state.page}&pagesize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  let parseData = await data.json()
  this.setState({articles:parseData.articles, 
    totalResults:parseData.totalResults,
    loading:false})

}

async componentDidMount(){
 this.updateNews();
}

handlePreviousClick = async ()=>{

  await this.setState({page: this.state.page - 1});
  this.updateNews();
}

handleNextClick = async ()=>{

  await this.setState({page: this.state.page + 1});
  this.updateNews();

}

  render() {
  
    return (
      <div className='container my-3'>
           
                <h1 className='text-center'>NewsBites - Top Headlines from {this.capitalizeFirstLetter(this.props.category)} </h1>
                {/*this.state.loading && <Spinner/>*/}

                <InfiniteScroll
                  dataLength={this.state.articles.length}
                  next={this.fetchMoreData}
                  hasMore={true}
                  loader={<h4>Loading...</h4>}
                ></InfiniteScroll>

                    <div className="row" >
                      {this.state.articles.map((element)=>{
                          return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title:""} description={element.description} 
                            imageUrl= {element.urlToImage} newsUrl={element.url}
                            author = {element.author} publishedAt={element.publishedAt}
                            source = {element.source.name}/>
                                </div>
                      })}
                        
                        
                    </div>

                    <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
          
        </div>
            
      
    )
  }
}

export default News
