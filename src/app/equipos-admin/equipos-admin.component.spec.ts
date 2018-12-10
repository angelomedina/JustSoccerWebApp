import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposAdminComponent } from './equipos-admin.component';

describe('EquiposAdminComponent', () => {
  let component: EquiposAdminComponent;
  let fixture: ComponentFixture<EquiposAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquiposAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquiposAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
