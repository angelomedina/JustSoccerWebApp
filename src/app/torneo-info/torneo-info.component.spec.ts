import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneoInfoComponent } from './torneo-info.component';

describe('TorneoInfoComponent', () => {
  let component: TorneoInfoComponent;
  let fixture: ComponentFixture<TorneoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorneoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorneoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
