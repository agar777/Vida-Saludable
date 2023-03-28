import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuzSolarComponent } from './luz-solar.component';

describe('LuzSolarComponent', () => {
  let component: LuzSolarComponent;
  let fixture: ComponentFixture<LuzSolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuzSolarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuzSolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
