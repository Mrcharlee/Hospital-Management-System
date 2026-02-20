import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

// Register all community modules once (e.g. in main.ts or app.config.ts)
ModuleRegistry.registerModules([AllCommunityModule]);


bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
