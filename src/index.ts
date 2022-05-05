import { Currency } from "ts-money";

export interface Link {
  description?: string;
  uri: string;
}

export interface MetaData {
  description?: string;
  geoLocationPositions?: GeolocationPosition[];
  links?: Link[];
}

export interface DateRange {
  from: string;
  to: string;
}

export interface ParticipantKey {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  public: string;
  private?: string;
  effective: DateRange;
  participant?: Participant;
}

export enum OrganizationRole {
  CHARITY = "CHARITY",
  FOUNDATION = "FOUNDATION",
  CHURCH = "CHURCH",
}

export const OrganizationRoles = [
  OrganizationRole.CHARITY,
  OrganizationRole.FOUNDATION,
  OrganizationRole.CHURCH,
];

export interface Organization {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  name: string;
  phone?: string;
  url?: string;
  participants?: Participant[];
  roles: OrganizationRole[];
  domains?: string[];
}

export enum ParticipantRole {
  VOLUNTEER = "VOLUNTEER",
  NODE = "NODE",
  ORG_ADMIN = "ORG_ADMIN",
}

export const ParticipantRoles = [
  ParticipantRole.VOLUNTEER,
  ParticipantRole.NODE,
  ParticipantRole.ORG_ADMIN,
];

export interface Participant {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  keys?: ParticipantKey[];
  roles?: ParticipantRole[];
  organizations?: Organization[];
}

export enum TransactionType {
  TIME = "TIME",
  TREASURE = "TREASURE",
}

export const TransactionTypes = [
  TransactionType.TIME,
  TransactionType.TREASURE,
];

export interface TimeTransactionDetails {
  dateRanges: DateRange[];
  metaData?: MetaData;
}

export interface TreasureTransactionDetails {
  amount: number;
  currency: Currency;
  metaData?: MetaData;
}

export type TransactionDetails =
  | TimeTransactionDetails
  | TreasureTransactionDetails;

export interface PendingTransaction<T extends TransactionDetails> {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  from?: Participant;
  to: Participant;
  type: T extends TimeTransactionDetails
    ? TransactionType.TIME
    : TransactionType.TREASURE;
  details: T;
  description: string;
}

export interface SignedTransaction<T extends TransactionDetails>
  extends PendingTransaction<T> {
  goodPoints: number;
  signature?: string;
}

export interface BlockTransaction<T extends TransactionDetails>
  extends SignedTransaction<T> {
  block?: Block;
}

export interface Block {
  id?: string;
  sequenceId: number;
  createdAt?: string;
  updatedAt?: string;
  transactions: BlockTransaction<TransactionDetails>[];
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
