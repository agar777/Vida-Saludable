import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEjerciciosComponent } from './tipo-ejercicios.component';

describe('TipoEjerciciosComponent', () => {
  let component: TipoEjerciciosComponent;
  let fixture: ComponentFixture<TipoEjerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEjerciciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
