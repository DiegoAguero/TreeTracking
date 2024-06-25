import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationGenericComponent } from './information-generic.component';

describe('InformationGenericComponent', () => {
  let component: InformationGenericComponent;
  let fixture: ComponentFixture<InformationGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationGenericComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
