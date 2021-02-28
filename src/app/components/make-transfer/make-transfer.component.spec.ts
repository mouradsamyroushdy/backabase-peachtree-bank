//#region --------------------------------------- ANGULAR
import { ComponentFixture, TestBed } from '@angular/core/testing';
//#endregion ------------------------------------

//#region --------------------------------------- 3RD-PARTIES
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
//#endregion ------------------------------------

//#region --------------------------------------- APPLICATION
import { TransactionsService } from 'src/app/services';
import { MakeTransferComponent } from './make-transfer.component';
//#endregion ------------------------------------

describe('MakeTransferComponent', () => {
  //#region ------------------------------------- SELECTORS
  const INPUT_FROM_ACCOUNT = "[data-test='from-account']";
  //#endregion ----------------------------------

  //#region ------------------------------------- VARIABLES
  let component: MakeTransferComponent;
  let fixture: ComponentFixture<MakeTransferComponent>;
  let nativeElement: HTMLElement;
  //#endregion ----------------------------------

  //#region ------------------------------------- MOCKS
  const mockTransactionsService = jasmine.createSpyObj(TransactionsService, ['addTransfer']);
  const mockMatDialog = jasmine.createSpyObj(MatDialog, ['open', 'afterClosed']);
  mockMatDialog.open.and.returnValue({ afterClosed: () => of(true) });
  const mockMatSnackBar = jasmine.createSpyObj(MatSnackBar, ['openFromTemplate']);
  //#endregion ----------------------------------

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeTransferComponent],
      providers: [
        { provide: TransactionsService, useValue: mockTransactionsService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransferComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "fromAccount" as disabled input', () => {
    // Arrange
    const fromAccount = nativeElement.querySelector(INPUT_FROM_ACCOUNT) as HTMLInputElement;

    // Assert
    expect(fromAccount.disabled).toBeTruthy();
  });

  it('should render "fromAccount" filled with data', () => {
    // Arrange
    const fromAccount = nativeElement.querySelector(INPUT_FROM_ACCOUNT) as HTMLInputElement;

    // Assert
    expect(fromAccount?.value).toEqual(`My Personal Account: € ${component.amount}`);
  });

  it('should open dialog when submit a valid form', () => {
    // Arrange
    const formValue = { fromAccount: 'a', toAccount: 'b', amount: component.amount };
    component.form.setValue(formValue);

    // Act
    component.submitForm();

    // Assert
    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should open snackbar when submit invalid form', () => {
    // Arrange
    const formValue = { fromAccount: 'a', toAccount: 'b', amount: component.amount + 1 };
    component.form.setValue(formValue);

    // Act
    component.submitForm();

    // Assert
    expect(mockMatSnackBar.openFromTemplate).toHaveBeenCalled();
  });
});
