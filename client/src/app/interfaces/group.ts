export interface Group {
    name: string;
    connections: Connection[]
}

export interface Connection {
    conectionId: string;
    username: string;
}