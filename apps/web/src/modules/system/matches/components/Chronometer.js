import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Chronometer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            minutes: 0,
            seconds: 0,
            millis: 0,
            maxMinutes: null,
            maxSeconds: null,
            running: false,
        }

        this._handleStartClick = this._handleStartClick.bind(this);
        this._handleStopClick = this._handleStopClick.bind(this);
        this._handleResetClick = this._handleResetClick.bind(this);
    }

    componentDidMount() {
        const { maxTime, command } = this.props;

        if (maxTime) {
            const times = maxTime.split(':');
            this.setState({ maxMinutes: parseInt(times[0]), maxSeconds: parseInt(times[1]) });
        }

        if (command === 'start') {
            this._handleStartClick();
        } else if (command === 'stop') {
            this._handleStopClick();
        } else if (command === 'reset') {
            this._handleResetClick();
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.command !== this.props.command) {
            if (nextProps.command === 'start') {
                this._handleStartClick();
                return true;
            } else if (nextProps.command === 'stop') {
                this._handleStopClick();
                return true;
            } else if (nextProps.command === 'reset') {
                this._handleResetClick();
                return true;
            }
            return false;
        }
        return true;
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    

    _handleStartClick() {
        var _this = this;
        if (!this.state.running) {
            this.interval = setInterval(() => {
                this.tick();
            }, 100);

            this.setState({running: true});
            this.props.onStart && this.props.onStart();
        }
    }

    _handleStopClick(autoStop) {        
        if (this.state.running) {
            clearInterval(this.interval);
            this.setState({running: false});
            if (autoStop) {
                this.props.onAutoStop && this.props.onAutoStop();
            } else {
                this.props.onStop && this.props.onStop();
            }
        }
    }

    _handleResetClick() {
        this._handleStopClick();
        this.update(0, 0, 0);
        this.props.onReset && this.props.onReset();
    }

    tick() {

        let millis = this.state.millis + 1;
        let seconds = this.state.seconds;
        let minutes = this.state.minutes;

        if (millis === 10) {
            millis = 0;
            seconds = seconds + 1;
        }

        if (seconds === 60) {
            millis = 0;
            seconds = 0;
            minutes = minutes + 1;
        }

        this.update(millis, seconds, minutes);
    
        const { maxMinutes, maxSeconds } = this.state;
        if (minutes === maxMinutes && seconds === maxSeconds) {
            this._handleStopClick(true);
        }
        
    }

    zeroPad(value) {
        return value < 10 ? `0${value}` : value;
    }

    update(millis, seconds, minutes) {
        this.setState({
            millis: millis,
            seconds: seconds,
            minutes: minutes
        });
        const currentTime = `${this.zeroPad(this.state.minutes)}:${this.zeroPad(this.state.seconds)}`;
        this.props.onUpdateTime && this.props.onUpdateTime(currentTime);
    }

    render() {
        return `${this.zeroPad(this.state.minutes)}:${this.zeroPad(this.state.seconds)}`;
    };
}

Chronometer.propTypes = {
    command: PropTypes.oneOf(['start', 'stop', 'reset']).isRequired,
    maxTime: function(props, propName, componentName) {
        if (!/^[0-9]{1,2}:[0-9]{2}$/.test(props[propName])) {
          return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Validation failed. Valid format sample: "10:00" or "9:59".'
          );
        }
    },
    onReset: PropTypes.func,
    onStop: PropTypes.func,
    onAutoStop: PropTypes.func,
    onStart: PropTypes.func,
    onUpdateTime: PropTypes.func,
};

export default Chronometer;