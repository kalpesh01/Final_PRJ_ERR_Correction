import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerProductBidDetailsComponent } from './farmer-product-bid-details.component';

describe('FarmerProductBidDetailsComponent', () => {
  let component: FarmerProductBidDetailsComponent;
  let fixture: ComponentFixture<FarmerProductBidDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerProductBidDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerProductBidDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
