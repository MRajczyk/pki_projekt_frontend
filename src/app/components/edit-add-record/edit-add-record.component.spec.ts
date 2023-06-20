import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddRecordComponent } from './edit-add-record.component';

describe('EditAddRecordComponent', () => {
  let component: EditAddRecordComponent;
  let fixture: ComponentFixture<EditAddRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
