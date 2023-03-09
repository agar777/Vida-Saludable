import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ejercicioComponent } from './ejercicio.component';

describe('ejercicioComponent', () => {
  let component: ejercicioComponent;
  let fixture: ComponentFixture<ejercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ejercicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ejercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
