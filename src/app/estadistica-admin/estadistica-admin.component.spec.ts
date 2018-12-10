import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaAdminComponent } from './estadistica-admin.component';

describe('EstadisticaAdminComponent', () => {
  let component: EstadisticaAdminComponent;
  let fixture: ComponentFixture<EstadisticaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
