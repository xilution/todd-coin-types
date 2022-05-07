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
  RELIGIOUS = "RELIGIOUS",
  NON_PROFIT = "NON_PROFIT",
  CORPORATION = "CORPORATION",
  SMALL_BUSINESS = "SMALL_BUSINESS",
  GOVERNMENT = "GOVERNMENT",
  POLITICAL = "POLITICAL",
  MILITARY = "MILITARY",
  EDUCATION = "EDUCATION",
  ATHLETICS_DEPARTMENT = "ATHLETICS_DEPARTMENT",
}

export const OrganizationRoles = [
  OrganizationRole.CHARITY,
  OrganizationRole.FOUNDATION,
  OrganizationRole.RELIGIOUS,
  OrganizationRole.NON_PROFIT,
  OrganizationRole.CORPORATION,
  OrganizationRole.SMALL_BUSINESS,
  OrganizationRole.GOVERNMENT,
  OrganizationRole.POLITICAL,
  OrganizationRole.MILITARY,
  OrganizationRole.EDUCATION,
  OrganizationRole.ATHLETICS_DEPARTMENT,
];

export interface Organization {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  email?: string;
  name: string;
  phone?: string;
  url?: string;
  vision?: string;
  mission?: string;
  roles: OrganizationRole[];
  domains?: string[]; // this will be used to associate participants with organizations by their email address
  participants?: Participant[];
  administrators?: Participant[];
  authorizedSigners?: Participant[];
}

export enum ParticipantRole {
  VOLUNTEER = "VOLUNTEER",
  BENEFACTOR = "BENEFACTOR",
  CONTRIBUTOR = "CONTRIBUTOR",
  PATRON = "PATRON",
  DO_GOODER = "DO_GOODER",
  HELPER = "HELPER",
  BLEEDING_HEART = "BLEEDING_HEART",
  ATHLETICS_BOOSTER = "ATHLETICS_BOOSTER",
  PHILANTHROPIST = "PHILANTHROPIST",
  DONOR = "DONOR",
  ALLY = "ALLY",
  NODE = "NODE",
  BENEFICIARY = "BENEFICIARY",
}

export const ParticipantRoles = [
  ParticipantRole.VOLUNTEER,
  ParticipantRole.BENEFACTOR,
  ParticipantRole.CONTRIBUTOR,
  ParticipantRole.PATRON,
  ParticipantRole.DO_GOODER,
  ParticipantRole.HELPER,
  ParticipantRole.BLEEDING_HEART,
  ParticipantRole.ATHLETICS_BOOSTER,
  ParticipantRole.PHILANTHROPIST,
  ParticipantRole.DONOR,
  ParticipantRole.ALLY,
  ParticipantRole.NODE,
  ParticipantRole.BENEFICIARY,
];

export interface Participant {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  password?: string;
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
  from: Participant | Organization;
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
  signature: string;
  participantKeyId: string;
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
