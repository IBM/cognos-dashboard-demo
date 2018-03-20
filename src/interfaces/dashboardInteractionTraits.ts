import { APIAndDashboardTraits } from './apiAndDashboardTraits'

export interface DashboardInteractionTraits extends APIAndDashboardTraits {
   customName1?: string; // holds the "datasource" name
   customValue1?: string; //holds the datasource value
   uiElement: string;
}
