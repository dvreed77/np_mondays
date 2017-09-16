import React, {PureComponent} from 'react';

export default class NPInfo extends PureComponent {

    render() {
        const {info} = this.props;
        const displayName = `${info.city}, ${info.state}`;

        return (
            <div>
                <div>{info.url}</div>
                <img width="240" src="http://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/DenverCP.JPG/240px-DenverCP.JPG"/>

            </div>
        );
    }
}