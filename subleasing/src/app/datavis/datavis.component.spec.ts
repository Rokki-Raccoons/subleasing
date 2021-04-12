import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatavisComponent } from './datavis.component';

describe('DatavisComponent', () => {
  let component: DatavisComponent;
  let fixture: ComponentFixture<DatavisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatavisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatavisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
