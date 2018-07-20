import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

class ProfileGithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: "e0f920d50f163bd1c853",
            clientKey: "b0a7cc6b2912efbdc876c20beb3e65e33920bc45",
            count: 20,
            sort: "created: asc",
            gitRepos: []
        };
    }

    componentDidMount() {
        const { userName } = this.props;
        const { count, sort, clientId, clientKey } = this.state;
        axios
            .get(
                `https://api.github.com/users/${userName}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientKey}`
            )
            .then(res => this.setState({ gitRepos: res.data }))
            .catch(error => console.log("error", error.response.data));
    }

    render() {
        const { gitRepos } = this.state;

        const repoItems = gitRepos.map(repo => (
            <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <a
                                href={repo.html_url}
                                className="text-info"
                                target="_blank"
                            >
                                {repo.name}
                            </a>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div className="col-md-6">
                        <span className="badge badge-info mr-1">
                            Stars: {repo.stargazers_count}
                        </span>
                        <span className="badge badge-secondary mr-1">
                            Watchers: {repo.watchers_count}
                        </span>
                        <span className="badge badge-success">
                            Forks: {repo.forks_count}
                        </span>
                    </div>
                </div>
            </div>
        ));
        return (
            <div ref="myRef">
                <hr />
                <h3 className="mb-4">Latest Github Repos</h3>
                {repoItems}
            </div>
        );
    }
}

ProfileGithub.propTypes = {
    userName: PropTypes.string.isRequired
};

export default ProfileGithub;
