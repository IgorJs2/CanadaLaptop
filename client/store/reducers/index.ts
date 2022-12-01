import {combineReducers} from "redux";
import {HYDRATE} from "next-redux-wrapper";
import {userReducer} from "./userReducer";
import {LaptopModelsReducer} from "./laptopmodelsReducer";
import {PartModelsReducer} from "./partmodelsReducer";
import {LaptopReducer} from "./laptopsReducer";
import {PartReducer} from "./partsReducer";
import {GlobalReducer} from "./globalReducer";
import {BoardTaskReducer} from "./board_task";
import {ChatReducer} from "./chat";
import {InvoiceReducer} from "./invoice";
import {MailReducer} from "./mail";
import {MessageReducer} from "./message";
import {NotificationReducer} from "./notification";
import {OrderReducer} from "./order";
import {PermissionReducer} from "./permission";
import {RoleReducer} from "./role";
import {TimeReducer} from "./time";
import {CalendarEventReducer} from "./calendar_event";


const rootReducer = combineReducers({
    user: userReducer,
    board_task: BoardTaskReducer,
    chat: ChatReducer,
    invoice: InvoiceReducer,
    mail: MailReducer,
    message: MessageReducer,
    notification: NotificationReducer,
    order: OrderReducer,
    permission: PermissionReducer,
    role: RoleReducer,
    time: TimeReducer,
    laptopmodel: LaptopModelsReducer,
    partmodel: PartModelsReducer,
    laptop: LaptopReducer,
    part: PartReducer,
    global: GlobalReducer,
    calendar_event: CalendarEventReducer
})

export const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        }
        if (state.count) nextState.count = state.count
        return nextState
    } else {
        return rootReducer(state, action)
    }
}

export type RootState = ReturnType<typeof rootReducer>