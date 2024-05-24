import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroListComponent } from './genero-list.component';

describe('GeneroListComponent', () => {
  let component: GeneroListComponent;
  let fixture: ComponentFixture<GeneroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
