import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
describe('LoginComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [LoginComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-amgular-app'`, () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('loginPage');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('my-amgular-app app is running!');
  });
});