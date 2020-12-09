import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactDetailsComponent } from './transact-details.component';

describe('TransactDetailsComponent', () => {
  let component: TransactDetailsComponent;
  let fixture: ComponentFixture<TransactDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
