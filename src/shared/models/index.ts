// Core domain models
export interface IProject {
  id: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  createdDate: Date;
  modifiedDate: Date;
  assignedTo?: string;
  priority: Priority;
}

export interface IListItem {
  Id: number;
  Title: string;
  Created: string;
  Modified: string;
  Author: {
    Title: string;
    Email: string;
  };
}

export enum ProjectStatus {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Completed = 'Completed',
  OnHold = 'On Hold',
  Cancelled = 'Cancelled'
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical'
}

// API Response types
export interface IApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  timestamp: Date;
}

export interface IListResponse<T> extends IApiResponse<T[]> {
  totalCount: number;
  hasMore: boolean;
}

// Error handling
export interface IAppError {
  message: string;
  code?: string;
  details?: any;
  timestamp: Date;
}
