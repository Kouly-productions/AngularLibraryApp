import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveThisComponent } from './remove-this.component';

describe('RemoveThisComponent', () => {
  let component: RemoveThisComponent;
  let fixture: ComponentFixture<RemoveThisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveThisComponent]
    });
    fixture = TestBed.createComponent(RemoveThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
