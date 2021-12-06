import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasterNotifierComponent } from './toaster-notifier.component';

describe('ToasterNotifierComponent', () => {
  let component: ToasterNotifierComponent;
  let fixture: ComponentFixture<ToasterNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToasterNotifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToasterNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
