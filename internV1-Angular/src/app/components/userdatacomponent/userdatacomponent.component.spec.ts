import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdatacomponentComponent } from './userdatacomponent.component';

describe('UserdatacomponentComponent', () => {
  let component: UserdatacomponentComponent;
  let fixture: ComponentFixture<UserdatacomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdatacomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserdatacomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
