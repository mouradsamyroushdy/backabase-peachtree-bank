//#region --------------------------------------- ANGULAR
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
//#endregion ------------------------------------

//#region --------------------------------------- 3RD-PARTIES
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//#endregion ------------------------------------

//#region --------------------------------------- APPLICATION
import { ReviewTransferDialogComponent } from './review-transfer-dialog.component';
//#endregion ------------------------------------

describe('ReviewTransferDialogComponent', () => {
  //#region ------------------------------------- SELECTORS
  const TEXT_ACCOUNT = '[data-test=account]';
  const TEXT_AMOUNT = '[data-test=amount]';
  //#endregion ----------------------------------

  //#region ------------------------------------- VARIABLES
  let component: ReviewTransferDialogComponent;
  let fixture: ComponentFixture<ReviewTransferDialogComponent>;
  let nativeElement: HTMLElement;
  const mockDialogData = { amount: 1000, account: 'backbase' };
  //#endregion ----------------------------------

  //#region ------------------------------------- MOCKS
  const mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  //#endregion ----------------------------------

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewTransferDialogComponent],
      providers: [
        // { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTransferDialogComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on close button click', () => {
    // Act
    component.onClose();

    // Assert
    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });

  it('should create render dialog data', () => {
    // Act
    const account = nativeElement.querySelector(TEXT_ACCOUNT);
    const amount = nativeElement.querySelector(TEXT_AMOUNT);

    // Assert
    expect(account?.textContent).toEqual(mockDialogData.account);
    expect(amount?.textContent).toEqual(`€ ${mockDialogData.amount}`);
  });
});
