import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloActividadComponent } from './titulo-actividad.component';

describe('TituloActividadComponent', () => {
  let component: TituloActividadComponent;
  let fixture: ComponentFixture<TituloActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TituloActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TituloActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
