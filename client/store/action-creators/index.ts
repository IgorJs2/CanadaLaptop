import * as UserActionCreators from "../action-creators/user"
import * as LaptopModelsActionCreators from "../action-creators/laptopmodels"
import * as LaptopActionCreators from "../action-creators/laptop"
import * as PartModelsActionCreators from "../action-creators/partmodels"
import * as PartActionCreators from "../action-creators/part"
import * as GlobalActionCreators from "../action-creators/global"
import * as ChatActionCreators from "../action-creators/chat"
import * as BoardTaskActionCreators from "../action-creators/board_task"
import * as InvoiceActionCreators from "../action-creators/invoice"
import * as MailActionCreators from "../action-creators/mail"
import * as MessageActionCreators from "../action-creators/message"
import * as NotificationActionCreators from "../action-creators/notification"
import * as OrderActionCreators from "../action-creators/order"
import * as PermissionActionCreators from "../action-creators/permission"
import * as RoleActionCreators from "../action-creators/role"
import * as TimeActionCreators from "../action-creators/time"
import * as CalendarEventActionCreators from "../action-creators/calendar_event"



export default {
    ...UserActionCreators,
    ...LaptopModelsActionCreators,
    ...LaptopActionCreators,
    ...PartModelsActionCreators,
    ...PartActionCreators,
    ...GlobalActionCreators,
    ...ChatActionCreators,
    ...BoardTaskActionCreators,
    ...InvoiceActionCreators,
    ...MailActionCreators,
    ...MessageActionCreators,
    ...NotificationActionCreators,
    ...OrderActionCreators,
    ...PermissionActionCreators,
    ...RoleActionCreators,
    ...TimeActionCreators,
    ...CalendarEventActionCreators
}