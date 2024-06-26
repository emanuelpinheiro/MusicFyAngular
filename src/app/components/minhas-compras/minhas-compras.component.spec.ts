import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasComprasComponent } from './minhas-compras.component';

describe('MinhasComprasComponent', () => {
  let component: MinhasComprasComponent;
  let fixture: ComponentFixture<MinhasComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhasComprasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinhasComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
