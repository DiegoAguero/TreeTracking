import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateLogoComponent } from './corporate-logo.component';

describe('CorporateLogoComponent', () => {
  let component: CorporateLogoComponent;
  let fixture: ComponentFixture<CorporateLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorporateLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
