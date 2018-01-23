import { CodeSnippetEnum } from './code-snippet';

export class DataSources {
  constructor(public type: string, public value: string) {
  }
}

export const CSVDataSource = new DataSources('CSV', CodeSnippetEnum.AddCSVSource);
export const DB2DataSource = new DataSources('DB2', CodeSnippetEnum.AddDB2Source);
export const ProtectedDB2DataSource = new DataSources('Protected DB2', CodeSnippetEnum.AddProtectedDB2Source);
export const ProtectedCSVDataSource = new DataSources('Protected CSV', CodeSnippetEnum.AddProtectedCSVSource);
