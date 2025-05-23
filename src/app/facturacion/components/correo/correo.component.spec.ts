/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CorreoComponent } from './correo.component';

describe('CorreoComponent', () => {
  let component: CorreoComponent;
  let fixture: ComponentFixture<CorreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
