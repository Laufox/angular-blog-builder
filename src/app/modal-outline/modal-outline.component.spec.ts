import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOutlineComponent } from './modal-outline.component';

describe('ModalOutlineComponent', () => {
  let component: ModalOutlineComponent;
  let fixture: ComponentFixture<ModalOutlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalOutlineComponent]
    });
    fixture = TestBed.createComponent(ModalOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
