import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountsService, AccountsServiceMock } from '@buildmotion/accounts/accounts-service';
import { LoggingService, LoggingServiceMock } from '@buildmotion/logging';
import { NewAccountUIService, } from './new-account-ui.service';

import { NewAccountComponent } from './new-account.component';

describe('NewAccountComponent', () => {
  let component: NewAccountComponent;
  let fixture: ComponentFixture<NewAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAccountComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        FormBuilder,
        NewAccountUIService,
        {
          provide: LoggingService,
          useClass: LoggingServiceMock
        },
        {
          provide: AccountsService,
          useClass: AccountsServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
