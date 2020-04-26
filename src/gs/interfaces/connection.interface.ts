export interface Connection {
    readonly client_secret: ClientSecret;
    readonly spreadsheet_id: string;
    readonly spreadsheet_id_routringsteps: string;
}

interface ClientSecret {
    client_email: string;
    private_key: string;
}