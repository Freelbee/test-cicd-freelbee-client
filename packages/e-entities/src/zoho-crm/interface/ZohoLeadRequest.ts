export interface ZohoLeadInfo {
    Last_Name: string,
    Company?: string, 
    First_Name?: string,
    Email?: string,
    Lead_Source?: string,
    State?: string,
    Street?: string,
    City?: string,
    Country?: string,
    Phone?: string,
    Description?: string,
    // Поле 'Комментарий к заявке'
    field?: string;
}

export interface ZohoLeadRequest {
    data: Array<ZohoLeadInfo>,
    trigger: Array<string>
}