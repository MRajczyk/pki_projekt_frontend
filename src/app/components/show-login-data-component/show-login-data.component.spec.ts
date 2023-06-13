import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLoginDataComponent } from './show-login-data.component';

describe('ShowLoginDataComponentComponent', () => {
  let component: ShowLoginDataComponent;
  let fixture: ComponentFixture<ShowLoginDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowLoginDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowLoginDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
