import React, { Component } from 'react';

class Chat extends Component {
    state = {
        comments: [],
        form: {
            name: '',
            comment: '',
        },
    };

    componentDidMount() {
        if (localStorage.getItem('state')) {
            this.setState({ ...JSON.parse(localStorage.getItem('state')) });
        }
    }

    addComment = () => {
        this.setState(
            {
                comments: [
                    ...this.state.comments,
                    {
                        id: this.state.comments.length
                            ? this.state.comments.reduce((p, c) =>
                                  p.id > c.id ? p : c
                              ).id + 1
                            : 1,
                        name: this.state.form.name,
                        comment: this.state.form.comment,
                        date: new Date(),
                    },
                ],
                form: {
                    name: '',
                    comment: '',
                },
            },
            () => localStorage.setItem('state', JSON.stringify(this.state))
        );
    };

    removeComment = (id) => {
        this.setState(
            {
                comments: this.state.comments.filter(
                    (comment) => comment.id !== id
                ),
            },
            () => localStorage.setItem('state', JSON.stringify(this.state))
        );
    };

    handleChange = (e) => {
        console.log(e.target.name);
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    render() {
        return (
            <div className="App">
                {this.state.comments.map((comment) => (
                    <div key={comment.id}>
                        <span style={{ fontStyle: 'italic' }}>
                            {comment.id}:{' '}
                        </span>
                        <strong>{comment.name}, </strong>
                        <span>{comment.comment}</span>
                        <button
                            onClick={this.removeComment.bind(null, comment.id)}
                            className="myButton"
                        ></button>
                    </div>
                ))}
                <div>
                    <p />
                    <label>
                        Имя:{' '}
                        <input
                            type="text"
                            value={this.state.form.name}
                            name="name"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        <p />
                        Ваш отзыв:{' '}
                        <textarea
                            name="comment"
                            value={this.state.form.comment}
                            onChange={this.handleChange}
                        >
                            <p />
                        </textarea>
                        <p />
                    </label>

                    <p />
                    <p />
                    <button onClick={this.addComment} className="myButton">
                        Оставить отзыв
                    </button>
                </div>
            </div>
        );
    }
}

export default Chat;
