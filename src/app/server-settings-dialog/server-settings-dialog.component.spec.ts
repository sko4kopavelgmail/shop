import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerSettingsDialogComponent } from './server-settings-dialog.component';

describe('ServerSettingsDialogComponent', () => {
  let component: ServerSettingsDialogComponent;
  let fixture: ComponentFixture<ServerSettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerSettingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
