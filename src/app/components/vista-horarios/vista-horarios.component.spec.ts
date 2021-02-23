import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaHorariosComponent } from './vista-horarios.component';

describe('VistaHorariosComponent', () => {
  let component: VistaHorariosComponent;
  let fixture: ComponentFixture<VistaHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaHorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
