import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

const alertSubject = new Subject();
const defaultId = 'default-alert';

export const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert,
    clear
};

type TOptions = {
    autoClose: boolean, keepAfterRouteChange: boolean
}

type TTypeAlert = {
    message: string,
    severity: string,
}

export const alertType = {
    success: 'Success',
    error: 'Error',
    info: 'Info',
    warning: 'Warning'
}

// enable subscribing to alerts observable
function onAlert(id = defaultId) {
    return alertSubject.asObservable().pipe(filter(x => x && x.id === id));
}

// convenience methods
function success(alertOptions: TTypeAlert, options: TOptions) {
    alert({ ...options, type: alertType.success, severity: alertOptions.severity, message: alertOptions.message });
}

function error(alertOptions: TTypeAlert, options: TOptions) {
    alert({ ...options, type: alertType.error, severity: alertOptions.severity, message: alertOptions.message });
}

function info(alertOptions: TTypeAlert, options: TOptions) {
    alert({ ...options, type: alertType.info, severity: alertOptions.severity, message: alertOptions.message });
}

function warn(alertOptions: TTypeAlert, options: TOptions) {
    alert({ ...options, type: alertType.warning, severity: alertOptions.severity, message: alertOptions.message });
}

function alert(alert: TTypeAlert & TOptions & {type: string}) {
    //@ts-ignore
    alert.id = alert.id || defaultId;
    alertSubject.next(alert);
}

function clear(id = defaultId) {
    alertSubject.next({ id });
}