export type NetlifySite = {
  name?: string
  account_name: string
  id?: string
  created_at?: string
  updated_at?: string
  deploy_hook?: string
  custom_domain?: string
  default_domain?: string
  screenshot_url?: string
  domain_aliases?: string[]
  build_image?: string
  build_settings?: {
    allowed_branches?: string[]
    base?: null
    base_rel_dir?: boolean
    cmd?: string
    created_at?: string
    deploy_key_id?: string
    dir?: string
    env?: {}
    functions_dir?: null
    installation_id?: number
    private_logs?: null
    provider?: string
    public_repo?: boolean
    repo_branch?: string
    repo_path?: string
    repo_type?: string
    repo_url?: string
    skip_prs?: null
    stop_builds?: boolean
    untrusted_flow?: string
    updated_at?: string
  }

  capabilities?: {
    asset_acceleration?: boolean
    branch_deploy?: boolean
    build_node_pool?: string
    cdn_propagation?: string
    cdn_tier?: string
    domain_aliases?: boolean
    form_processing?: boolean
    geo_ip?: boolean
    id?: string
    ipvnumber_domain?: string
    managed_dns?: boolean
    prerendering?: boolean
    proxying?: boolean
    rate_cents?: number
    secure_site?: boolean
    split_testing?: boolean
    ssl?: string
    title?: string
    yearly_rate_cents?: number
  }

  published_deploy: {
    id: string
    site_id: string
    user_id: string
    build_id: string
    state: string
    name: string
    url: string
    ssl_url: string
    admin_url: string
    deploy_url: string
    deploy_ssl_url: string
    screenshot_url: string
    review_id: number
    draft: boolean
    required: unknown[]
    required_functions: unknown[]
    error_message: string
    branch: string
    commit_ref: string
    commit_url: string
    skipped: boolean
    created_at: string
    updated_at: string
    published_at: string
    title: string
    context: string
    locked: boolean
    review_url: string
    site_capabilities: {}
    framework?: string
  }

  ssl?: boolean
  ssl_plan?: null
  ssl_status?: null
  ssl_url?: string
  url?: string
}

export type Hook = {
  id: string
  site_id: string
  form_id: null | string
  form_name: null | string
  user_id: string
  type: string
  event: string
  data: {
    email?: string
  }
  success: boolean
  created_at: string
  updated_at: string
  actor: string
  disabled: boolean
  restricted: boolean
}

export type Deploy = {
  summary?: {
    status?: string
    messages?: Array<{
      type?: string
      title?: string
      description?: string
      details?: string
    }>
  }
  admin_url?: string
  available_functions?: unknown[]
  branch?: string
  build_id?: string
  commit_ref?: string
  commit_url?: string
  committer?: string
  context?: string
  created_at?: string
  deploy_ssl_url?: string
  deploy_time?: number
  deploy_url?: string
  error_message?: string | null
  file_tracking_optimization?: boolean
  has_edge_handlers?: boolean
  id?: string
  links?: {
    permalink?: string
    alias?: string
  }
  locked?: null
  manual_deploy?: boolean
  name?: string
  plugin_state?: string
  published_at?: null
  required?: unknown[]
  required_functions?: unknown[]
  review_id?: number
  review_url?: string
  screenshot_url?: null
  site_id?: string
  skipped?: null
  skipped_log?: null
  ssl_url?: string
  state?: string
  title?: string
  updated_at?: string
  url?: string
  user_id?: string
}

export type User = {
  affiliate_id?: string
  avatar_url?: string
  connected_accounts?: {}
  created_at?: string
  email?: string
  full_name?: string
  has_pending_email_verification?: boolean
  id?: string
  last_login?: string
  login_providers?: [string]
  mfa_enabled?: boolean
  pending_email?: null | string
  preferred_account_id?: string
  saml_account_id?: string
  saml_slug?: null | string
  sandbox?: boolean
  site_count?: number
  slug?: string
  tracking_id?: string
  uid?: null | string
}

export type Account = {
  id: string
  name: string
  slug: string
  type: string
  capabilities: {
    sites: {
      included: number
      used: number
    }
    bandwidth: {
      included: number
      used: number
    }
    collaborators: {
      included: number
      used: number
    }
    build_minutes: {
      included: number
      used: number
    }
    concurrent_builds: {
      included: number
      max: number
      used: number
    }
    collaborators: {
      included: number
      used: number
    }
  }
  billing_name: string
  billing_email: string
  billing_details: string
  billing_period: string
  payment_method_id: string
  type_name: string
  type_id: string
  owner_ids: string[]
  roles_allowed: string[]
  created_at: string
  updated_at: string
  team_logo_url: string
  type_slug: string

  site_capabilities: {
    title: string
    asset_acceleration: boolean
    form_processing: boolean
    cdn_propagation: string
    domain_aliases: boolean
    secure_site: boolean
    secure_site_context: boolean
    prerendering: boolean
    proxying: boolean
    ssl: string
    rate_cents: number
    yearly_rate_cents: number
    ipvnumber_domain: string
    branch_deploy: boolean
    managed_dns: boolean
    geo_ip: boolean
    split_testing: boolean
    id: string
  }
  saml_enabled: boolean
  default: boolean
  has_builds: boolean
  enforce_saml: string
  team_logo_url: null
  can_start_trial: boolean
  on_trial: boolean
  gitlab_self_hosted_config: null
  github_enterprise_config: null
}

export type Submission = {
  body?: string
  company?: null
  created_at?: string
  data?: {
    email?: string
    ip?: string
    message?: string
    name?: string
    referrer?: string
    subject?: string
    user_agent?: string
  }
  email?: string
  first_name?: string
  form_id?: string
  form_name?: string
  human_fields?: {
    Email?: string
    Message?: string
    Name?: string
    Subject?: string
  }
  id?: string
  last_name?: string
  name?: string
  number?: number
  ordered_human_fields?: { title: string; name: string; value: string }[]
  site_url?: string
  summary?: string
  title?: string
}

export type Build = {
  sha: string
  done: boolean
  error: null
  created_at: string
  started_at: string
  site_id: string
  build_time: number
  state: 'done'
  subdomain: string
  custom_domain: string
  context: string
  branch: string
  commit_ref: string
  commit_url: string
  review_id: null
  review_url: null
  title: string
  deploy_time: number
  links: {
    permalink: string
    alias: string
    branch: null | string
  }
  id: string
  deploy_id: string
  error_message: null
  deploy_state: string
  deploy_ssl_url: string
  committer: string
  priority: null
}
