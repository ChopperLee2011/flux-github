'use strict';
const React = require('react'),
    Router = require('react-router'),
    {Link,RouteHandler} = Router;

export default
    React.createClass({
        render() {
            return (
                <div>
                    <ul>
                        <li>
                            <Link to='login'>Sign in </Link>
                        </li>
                    </ul>
                    <hr />
                    <RouteHandler/>
                </div>
            );
        }
    });

