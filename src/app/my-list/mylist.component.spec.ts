import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListComponent } from './mylist.component';

describe('MyListComponent', () => {
  let component: MyListComponent;
  let fixture: ComponentFixture<MyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyListComponent]
    });
    fixture = TestBed.createComponent(MyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
