import React, {PureComponent} from 'react';
import moment from 'moment'

export default class NPInfo extends PureComponent {

    render() {

        const {info} = this.props;

        const displayName = `${info.city}, ${info.state}`;

        return (
            <div>
                <div>
                    {moment(info.date).format("MMM Do YYYY")}
                    <a href={info.url} target="_blank">(link)</a>
                </div>
                <img width="240" src={info.img}/>

            </div>
        );
    }
}