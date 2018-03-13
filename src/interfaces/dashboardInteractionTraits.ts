import { APIAndDashboardTraits } from './apiAndDashboardTraits'

export interface DashboardInteractionTraits extends APIAndDashboardTraits {
   dataSource?: string;
   uiElement: string;
}
