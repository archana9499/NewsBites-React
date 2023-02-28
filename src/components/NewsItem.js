import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
   let {title, description, imageUrl, newsUrl, author, publishedAt, source}=this.props
    return (
      <div>
           <div className="my-3">
            <div className="card" style={{width: "18rem"}}>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left :'90%', zIndex:'1' }}>{source}</span>
                <img src={!imageUrl? "https://s3.cointelegraph.com/uploads/2023-02/3857f361-393c-4e22-845e-33687ac8ba25.jpg":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title.slice(0,45)}..</h5>
                    <p className="card-text">{description?description.slice(0,100):""}...</p>
                    <p className="card-text"><small>By {author?author:"Unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
                    <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read more</a>
                </div>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
