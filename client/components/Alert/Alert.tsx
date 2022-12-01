import React from 'react';
import PropTypes from 'prop-types';

import { alertService, alertType } from './service/alert.service';
import {Alert, AlertTitle} from "@mui/material";

const propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool,
    severity: PropTypes.string,
    type: PropTypes.string,
    message: PropTypes.string
};

const defaultProps = {
    id: 'default-alert',
    fade: true
};

type alertProps = {severity: string, type: string, message: string}

class CustomAlert extends React.Component {
    constructor(props: alertProps) {
        super(props);

        this.state = {
            alerts: new Array<alertProps>()
        };
    }

    componentDidMount() {
        // subscribe to new alert notifications
        this.subscription = alertService.onAlert(this.props.id)
            .subscribe(alert => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    // filter out alerts without 'keepAfterRouteChange' flag
                    const alerts = this.state.alerts.filter(x => x.keepAfterRouteChange);

                    // remove 'keepAfterRouteChange' flag on the rest
                    alerts.forEach(x => delete x.keepAfterRouteChange);

                    this.setState({ alerts });
                    return;
                }

                // add alert to array
                this.setState({ alerts: [...this.state.alerts, alert] });

                // auto close alert if required
                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3000);
                }
            });
    }

    componentWillUnmount() {
        // unsubscribe & unlisten to avoid memory leaks
        this.subscription.unsubscribe();
    }

    removeAlert(alert) {
        if (this.props.fade) {
            // fade out alert
            const alertWithFade = { ...alert, fade: true };
            this.setState({ alerts: this.state.alerts.map(x => x === alert ? alertWithFade : x) });

            // remove alert after faded out
            setTimeout(() => {
                this.setState({ alerts: this.state.alerts.filter(x => x !== alertWithFade) })
            }, 250);
        } else {
            // remove alert
            this.setState({ alerts: this.state.alerts.filter(x => x !== alert) })
        }
    }

    cssClasses(alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [alertType.success]: 'alert alert-success',
            [alertType.error]: 'alert alert-danger',
            [alertType.info]: 'alert alert-info',
            [alertType.warning]: 'alert alert-warning'
        }

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }

    render() {
        const { alerts } = this.state;
        if (!alerts.length) return null;
        return (
            <div className="m-3">
                {alerts.map((alert, index) =>
                    <Alert severity={alert.severity} onClick={() => this.removeAlert(alert)} className="absolute right-10 w-2/12">
                        <AlertTitle>{alert.type}</AlertTitle>
                        {alert.message}
                    </Alert>
                )}
            </div>
        );
    }
}

CustomAlert.propTypes = propTypes;
CustomAlert.defaultProps = defaultProps;
export default CustomAlert;