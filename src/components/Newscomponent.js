import React, { Component } from 'react'

export class Newscomponent extends Component {

    render() {
        let { title, description, imageurl, newsurl, author, date,source } = this.props;
        return (
            <div>
                <div className="card" style={{ width: "18rem" }}>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {source}
                        
                    </span>
                    <img src={imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toUTCString()}</small></p>
                        <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-primary btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newscomponent
