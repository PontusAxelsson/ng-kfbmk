import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLoginButtonComponent } from './email-login-button.component';

describe('EmailLoginButtonComponent', () => {
  let component: EmailLoginButtonComponent;
  let fixture: ComponentFixture<EmailLoginButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailLoginButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailLoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
