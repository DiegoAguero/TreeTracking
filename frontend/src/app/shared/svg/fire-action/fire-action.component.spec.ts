import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireActionComponent } from './fire-action.component';

describe('FireActionComponent', () => {
  let component: FireActionComponent;
  let fixture: ComponentFixture<FireActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FireActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
