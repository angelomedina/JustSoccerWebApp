import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasAdminComponent } from './notas-admin.component';

describe('NotasAdminComponent', () => {
  let component: NotasAdminComponent;
  let fixture: ComponentFixture<NotasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
