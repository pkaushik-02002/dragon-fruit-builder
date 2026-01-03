export interface UserRole {
  role: string;
  description: string;
  permissions: string[];
}

export interface PageRequirement {
  name: string;
  path: string;
  description: string;
  accessRoles: string[];
  components: string[];
}

export interface DataField {
  name: string;
  type: string;
  required: boolean;
}

export interface DataModel {
  name: string;
  fields: DataField[];
}

export interface Workflow {
  name: string;
  trigger: string;
  steps: string[];
}

export interface Feature {
  name: string;
  description: string;
  priority: 'must-have' | 'nice-to-have';
}

export interface Requirements {
  projectName: string | null;
  description: string | null;
  users: UserRole[];
  pages: PageRequirement[];
  dataModels: DataModel[];
  workflows: Workflow[];
  features: Feature[];
}

export interface ParseResponse {
  action: 'extract' | 'clarify' | 'confirm';
  message: string;
  requirements?: Requirements;
  clarifications?: string[];
  changes?: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  requirements?: Requirements;
  changes?: string[];
}
