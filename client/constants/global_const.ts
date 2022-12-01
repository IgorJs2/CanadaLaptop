export enum item_types {
    PartModel = "PartModel",
    LaptopModel = "LaptopModel",
    Laptop = "Laptop",
    Part = "Part",
    Mail = "Mail",
    User = "User",
    Role = "Role",
    Order = "Order",
    Notification = "Notification",
    Message = "Message",
    Chat = "Chat",
    Invoice = "Invoice",
    Permission = "Permission"
}

export enum PriorityCategory {
    Count = "Most buyed",
    Profit = "Most profit",
    Quantity = "Most quantity"
}

export const PriorityHeaders: string[] = [
    "Most buyed",
    "Most profit",
    "Most quantity"
]