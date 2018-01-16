import { CodeSnippet, CSVSourceCS, DB2SourceCS } from '../model/code-snippet'

export class DataSources {
  constructor(public type: string, public value: string, public codeSnippet: CodeSnippet) {
  }
}

export const DefaultOption = new DataSources('Select an option', '', null);
export const CSVDataSource = new DataSources('CSV', 'csv', CSVSourceCS);
export const DB2DataSource = new DataSources('DB2', 'db2', DB2SourceCS);
