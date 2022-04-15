export interface ParticipantKey {
  public: string;
  private?: string;
}

export enum Roles {
  VOLUNTEER = "VOLUNTEER",
  CHARITY = "CHARITY",
  NODE = "NODE",
  ORG_ADMIN = "ORG_ADMIN"
}

export interface Organization {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  phone?: string;
  url?: string;
  participants?: Participant[];
}

export interface Participant {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  key: ParticipantKey;
  roles?: Roles[];
  organizations?: Organization[];
}

export interface Transaction {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  from?: string;
  to: string;
  amount: number;
  description: string;
  signature?: string;
}

export interface Block {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  transactions: Transaction[];
  nonce: number;
  previousHash: string;
  hash: string;
}

export interface Node {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  baseUrl: string;
}
