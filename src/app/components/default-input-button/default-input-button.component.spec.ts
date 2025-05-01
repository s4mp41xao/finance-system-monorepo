import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultInputButtonComponent } from './default-input-button.component';

describe('DefaultInputButtonComponent', () => {
  let component: DefaultInputButtonComponent;
  let fixture: ComponentFixture<DefaultInputButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultInputButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultInputButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
