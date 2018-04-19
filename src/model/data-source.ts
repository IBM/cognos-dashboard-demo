import { CodeSnippetEnum } from './code-snippet';

export class DataSources {
  constructor(public type: string, public value: string) {
  }
}

export const CSVDataSource = new DataSources('Sample CSV', CodeSnippetEnum.AddCSVSource);
export const ProtectedCSVDataSource = new DataSources('Sample Protected CSV', CodeSnippetEnum.AddProtectedCSVSource);
export const BikeShareWeatherCSVSource = new DataSources('Bike Share Weather CSV', CodeSnippetEnum.AddBikeShareWeatherCSVSource);
export const BikeShareRidesDemographCSVSource = new DataSources('Bike Share Rides Demographics CSV', CodeSnippetEnum.AddBikeShareRidesDemographCSVSource);
//export const DB2DataSource = new DataSources('DB2', CodeSnippetEnum.AddDB2Source);
//export const ProtectedDB2DataSource = new DataSources('Protected DB2', CodeSnippetEnum.AddProtectedDB2Source);
