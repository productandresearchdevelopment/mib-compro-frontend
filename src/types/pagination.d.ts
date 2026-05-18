import {
  ICatalog,
  ICatalogJourney,
  ICatalogProduct,
  IChangeRequest,
  IOpportunity,
  IRole,
  ISolution,
  ISolutionCompetitor,
  ISolutionProduct,
  IUser,
} from "./model";

export type IPageEntry = number | "dots";

export interface IPaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface IPaginationResponse {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_records: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface IPaginationUserParams extends IPaginationParams {
  role_id?: string;
}

export interface IPaginationCatalogPrams extends IPaginationParams {
  type?: string;
}

export interface IPaginationCatalogProductParams extends IPaginationParams {
  catalog_id?: string;
}

export interface IPaginationCatalogJourneyParams extends IPaginationParams {
  catalog_id?: string;
}

export interface IPaginationSolutionProductParams extends IPaginationParams {
  solution_id?: string;
}

export interface IPaginationSolutionCompetitorParams extends IPaginationParams {
  solution_id?: string;
}

export interface IUserPaginatedResponse {
  data: IUser[];
  pagination: IPaginationResponse;
}

export interface IRolePaginatedResponse {
  data: IRole[];
  pagination: IPaginationResponse;
}

export interface INotificationRulePaginatedResponse {
  data: INotificationRule[];
  pagination: IPaginationResponse;
}

export interface IModuleTypePaginatedResponse {
  data: IModuleType[];
  pagination: IPaginationResponse;
}

export interface ICatalogPaginatedResponse {
  data: ICatalog[];
  pagination: IPaginationResponse;
}

export interface ICatalogProductPaginatedResponse {
  data: ICatalogProduct[];
  pagination: IPaginationResponse;
}

export interface ICatalogJourneyPaginatedResponse {
  data: ICatalogJourney[];
  pagination: IPaginationResponse;
}

export interface ISolutionPaginatedResponse {
  data: ISolution[];
  pagination: IPaginationResponse;
}

export interface ISolutionProductPaginatedResponse {
  data: ISolutionProduct[];
  pagination: IPaginationResponse;
}

export interface ISolutionCompetitorPaginatedResponse {
  data: ISolutionCompetitor[];
  pagination: IPaginationResponse;
}

export interface IOpportunityPaginatedResponse {
  data: IOpportunity[];
  pagination: IPaginationResponse;
}

export interface IChangeRequestPaginatedResponse {
  data: IChangeRequest[];
  pagination: IPaginationResponse;
}
