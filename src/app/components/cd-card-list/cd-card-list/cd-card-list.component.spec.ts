import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdCardListComponent } from './cd-card-list.component';

describe('CdCardListComponent', () => {
  let component: CdCardListComponent;
  let fixture: ComponentFixture<CdCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdCardListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CdCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
