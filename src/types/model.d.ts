export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface IUpload {
  id?: string;
  filename: string;
  filename_origin: string;
  category: string;
  path: string;
  type: string;
  mime: string;
  extension: string;
  size: number;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface ImportResult {
  total_rows: number;
  success_count: number;
  error_count: number;
  warning_count: number;
  logs: Array<{
    row: number;
    status: "success" | "error" | "warning";
    message: string;
    data?: string;
  }>;
  processed_at: string;
  processing_time: string;
}

export interface IUser {
  id?: string;

  name: string;
  username: string;
  email: string;
  password?: string;
  address?: string;
  avatar_id?: string;
  role_id: string;
  country_code?: string;
  contact_number?: string;
  meta_data?: JsonValue;
  email_verified_at?: Date;
  email_verification_token?: string;
  email_verification_token_expires_at?: Date;
  email_verification_retry_count?: number;
  last_email_verification_sent_at?: Date;
  password_reset_token?: string;
  password_reset_token_expires_at?: Date;
  password_reset_retry_count?: number;
  last_password_reset_sent_at?: Date;
  last_app_id?: string;
  last_module_id?: number;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  avatar?: IUpload;
  role?: IRole;
  app?: IApp;
  module?: IModule;
}

export interface IRole {
  id?: string;
  name: string;
  alias: string;
  color: string;
  description?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  users?: IUser[];
  role_modules?: IRoleModule[];
}

export interface IModuleType {
  id?: string;
  name: string;
  icon?: string;
  description?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  modules?: IModule[];
}

export interface IModule {
  id?: number;
  module_type_id: string;
  parent_id?: number;
  path?: string;
  name: string;
  icon?: string;
  route?: string;
  method?: string;
  description?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  module_type?: IModuleType;
  parent?: IModule;
  children?: IModule[];
  role_modules?: IRoleModule[];
}

export interface IRoleModule {
  id?: string;
  role_id: string;
  module_id: number;
  app_id: string;
  checked: boolean;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  role?: IRole;
  module?: IModule;
  app?: IApp;
}

export interface ICatalog {
  id?: string;
  name: string;
  description?: string;
  type: CatalogType;
  logo_id?: string;
  website_url?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;

  logo?: IUpload;
  products?: ICatalogProduct[];
  journeys?: ICatalogJourney[];
}

export interface ICatalogProduct {
  id?: string;
  catalog_id: string;
  name: string;
  short_description: string;
  start_price: number;
  end_price: number;
  currency: string;
  image_id?: string;
  start_price: number;
  end_price: number;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;

  catalog?: ICatalog;
  image?: IUpload;
  brochure?: IUpload;
  present_file?: IUpload;
  description?: ICatalogProductDescription;
  features?: ICatalogProductFeature[];
  key_features?: ICatalogProductKeyFeature[];
  specifications?: ICatalogProductSpecification[];
  use_cases?: ICatalogProductUseCase[];
  documents?: ICatalogProductDocument[];
}

export interface ICatalogProductDescription {
  id?: string;
  product_id?: string;
  description?: string;
  product_overview?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
}

export interface ICatalogProductFeature {
  id?: string;
  product_id?: string;
  title: string;
  sort_order?: number;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
}

export interface ICatalogProductKeyFeature {
  id?: string;
  product_id?: string;

  title: string;
  description?: string;
  icon?: string;
  sort_order?: number;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
}

export interface ICatalogProductSpecification {
  id?: string;
  product_id?: string;

  spec_key: string;
  spec_value: string;
  sort_order?: number;
  is_main: boolean;
  icon?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
}

export interface ICatalogProductUseCase {
  id?: string;
  product_id?: string;
  description: string;
  sort_order?: number;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
}

export interface ICatalogProductDocument {
  id?: string;
  product_id?: string;
  file_id?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;

  product?: ICatalogProduct;
  file?: IUpload;
}

export interface ICatalogJourney {
  id?: string;
  catalog_id: string;

  partner_name: string;
  status: CatalogProductJourneyStatus;
  notes?: string;
  journey_date: Date;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;

  catalog?: ICatalog;
}

export interface ISolution {
  id?: string;
  name: string;
  description?: string;
  icon?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;

  products?: ISolutionProduct[];
  competitors?: ISolutionCompetitor[];
}

export interface ISolutionProduct {
  id?: string;
  solution_id: string;
  product_id: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;

  solution?: ISolution;
  product?: ICatalogProduct;
}

export interface ISolutionCompetitor {
  id?: string;
  name: string;
  description: string;
  start_price: number;
  end_price: number;
  currency: string;
  image_id?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;

  solution?: ISolution;
  image?: IUpload;
}

export interface IOpportunity {
  id?: string;

  title: string;
  description?: string;
  department?: string;
  status?: string;
  assignee?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  created_by?: string;
  updated_by?: string;
  deleted_by?: string;

  timelines?: IOpportunityTimeline[];
  comments?: IOpportunityComment[];
}

export interface IOpportunityTimeline {
  id?: string;

  opportunity_id: string;

  action: string;
  notes?: string;

  actor_name: string;
  event_type: string;
  // submitted | status_change | assigned | approved | comment

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
}

export interface IOpportunityComment {
  id?: string;

  opportunity_id: string;

  author_name: string;
  content: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
}

export interface IChangeRequest {
  id?: string;

  title: string;
  description?: string;
  department?: string;

  status?: string;
  priority?: string;

  assignee?: string;
  due_date?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  created_by?: string;
  updated_by?: string;
  deleted_by?: string;

  timelines?: IChangeRequestTimeline[];
  comments?: IChangeRequestComment[];
}

export interface IChangeRequestTimeline {
  id?: string;

  change_request_id: string;

  action: string;
  notes?: string;

  actor_name: string;
  event_type: string;
  // submitted | status_change | assigned | approved | comment

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
}

export interface IChangeRequestComment {
  id?: string;

  change_request_id: string;

  author_name: string;
  content: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
}

type CatalogType = "internal" | "partnership";
type CatalogProductJourneyStatus =
  | "product_demo"
  | "business_discussion"
  | "merchant_registration"
  | "testing"
  | "production";
