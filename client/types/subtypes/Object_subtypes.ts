import {IBoardTask} from "../board_task";
import {ICalendarEvent} from "../calendar_event";
import {IChat} from "../chat";
import {IGlobal} from "../globalState";
import {IInvoice} from "../invoice";
import {ILaptop} from "../laptop";
import {ILaptopModel} from "../laptopmodel";
import {IParts} from "../parts";
import {IPartModel} from "../partsmodel";
import {IMail} from "../mail";
import {IMessage} from "../message";
import {INotification} from "../notification";
import {IOrder} from "../order";
import {IPermission} from "../permission";
import {IRole} from "../role";
import {ITime} from "../time";
import {IUser} from "../user";

export type TObjects = IBoardTask | ICalendarEvent | IChat | IGlobal | IInvoice | ILaptop | ILaptopModel | IParts | IPartModel | IMail | IMessage | INotification | IOrder | IPermission | IRole | ITime | IUser

export type TTableObjects = IInvoice | ILaptop | ILaptopModel | IParts | IPartModel | IMail | IOrder | IPermission | IRole | IUser

export type TTableArrayObjects = IInvoice[] | ILaptop[] | ILaptopModel[] | IParts[] | IPartModel[] | IMail[] | IOrder[] | IPermission[] | IRole[] | IUser[]