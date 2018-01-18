import { environment } from '../environments/environment';

interface Scripts {
   name: string;
   src: string;
}
export const ScriptStore: Scripts[] = [
   {name: 'cognosapijs', src: environment.cognos_api_js}
];
