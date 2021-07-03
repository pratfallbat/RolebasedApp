import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { OrderStatsComponent } from './order-stats.component';

describe('OrderStatsComponent', () => {
  let component: OrderStatsComponent;
  let fixture: ComponentFixture<OrderStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderStatsComponent],
      imports: [NgxDatatableModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
