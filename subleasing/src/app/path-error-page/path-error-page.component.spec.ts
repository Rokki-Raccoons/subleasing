import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathErrorPageComponent } from './path-error-page.component';

describe('PathErrorPageComponent', () => {
  let component: PathErrorPageComponent;
  let fixture: ComponentFixture<PathErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathErrorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
