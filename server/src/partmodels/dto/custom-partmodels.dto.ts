export class GetPartModelsDto {
    _id: string;
    img: string[];
    ID: string;
    Model_ID: string;
    Price: string;
    Category: string[];
    Description: string;
    CategoryDescr: string;
    ConditionDescription: string;
    ShippingType: string;
    Part_Number: string;
    MPN: string;
}

export class ProfitByModelPartModelsDto {
    _id: string;
    img: string[];
    ID: string;
    Model: string;
    Price: string;
    CategoryDescr: string;
    Part_Number: string;
    MPN: string;
}