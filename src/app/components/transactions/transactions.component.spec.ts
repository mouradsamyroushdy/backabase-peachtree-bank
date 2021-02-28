//#region --------------------------------------- ANGULAR
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
//#endregion ------------------------------------

//#region --------------------------------------- APPLICATION
import { TransactionsComponent } from './transactions.component';
import { TransactionDetails } from 'src/app/models';
import { FilterPipe } from '../../pipes/filter.pipe';
//#endregion ------------------------------------

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let dom: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsComponent, FilterPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    dom = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render transactions list', () => {
    // Arrange
    const transactions: Array<TransactionDetails> = [{}, {}, {}];
    component.transactions = transactions;

    // Act
    fixture.detectChanges();
    const wrapper = dom.nativeElement.querySelector('.transactions');

    // Assert
    expect(wrapper.querySelectorAll('.transaction').length).toEqual(transactions.length);
  });
});
