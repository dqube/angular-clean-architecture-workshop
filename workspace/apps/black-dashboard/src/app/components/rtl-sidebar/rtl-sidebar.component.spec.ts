import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RtlSidebarComponent } from "./rtl-sidebar.component";

describe("RtlSidebarComponent", () => {
  let component: RtlSidebarComponent;
  let fixture: ComponentFixture<RtlSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RtlSidebarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtlSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
