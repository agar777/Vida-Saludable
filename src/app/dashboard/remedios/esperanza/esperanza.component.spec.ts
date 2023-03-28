import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsperanzaComponent } from './esperanza.component';

describe('EsperanzaComponent', () => {
  let component: EsperanzaComponent;
  let fixture: ComponentFixture<EsperanzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsperanzaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsperanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
