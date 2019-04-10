import React, { Component } from 'react';
import TimeInput from 'react-time-input';

class TimeWrapper extends Component {

    handleTimeChange = (e) => {
        console.log(e);
    }

    render() {
        return (
            <TimeInput
                initTime={this.props.displayTime}
                ref="TimeInputWrapper"
                className='form-control'
                mountFocus='true'
                onTimeChange={this.handleTimeChange}
   		    />
        );
    }
}

export default TimeWrapper;