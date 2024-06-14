import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropletComponent } from './droplet.component';

describe('DropletComponent', () => {
  let component: DropletComponent;
  let fixture: ComponentFixture<DropletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
