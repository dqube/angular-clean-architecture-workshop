import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { VersionInfo } from '@buildmotion/common';

@NgModule({
  imports: [CommonModule],
})
export class VersionCheckModule {
  static forRoot(versionContext: VersionInfo): ModuleWithProviders<VersionCheckModule> {
    return {
      ngModule: VersionCheckModule,
      providers: [
        {
          provide: VersionInfo,
          useValue: versionContext,
        },
      ],
    };
  }
}
