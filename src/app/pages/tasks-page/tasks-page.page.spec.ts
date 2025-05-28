import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksPagePage } from './tasks-page.page';

describe('TasksPagePage', () => {
  let component: TasksPagePage;
  let fixture: ComponentFixture<TasksPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
