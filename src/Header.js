import Moment from 'moment'
import React, { Component } from 'react';

class Header extends Component {
    render() {
        // eslint-disable-next-line
        let indo = require("moment/locale/id")
        // console.log(indo)
        Moment.updateLocale("id, indonesia")
        return (
            <div>
                <h3>Aplikasi Aktivitas Harian</h3><br/>
                <p>{Moment().format('dddd ')}{Moment().format('LLL')}</p>
            </div>
        );
    }
}

export default Header;