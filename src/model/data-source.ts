import { CodeSnippet, CSVSourceCS, DB2SourceCS, ProtectedDB2SourceCS } from '../model/code-snippet'

export class DataSources {
  constructor(public type: string, public value: string, public codeSnippet: CodeSnippet) {
  }
}

export const DefaultOption = new DataSources('Select an option', '', CSVSourceCS);
export const CSVDataSource = new DataSources('CSV', 'csv', CSVSourceCS);
export const DB2DataSource = new DataSources('DB2', 'db2', DB2SourceCS);
export const ProtectedDB2DataSource = new DataSources('Protected DB2', 'protected db2', ProtectedDB2SourceCS);
