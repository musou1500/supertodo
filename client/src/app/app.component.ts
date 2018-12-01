import { Component, OnInit } from '@angular/core';
import { TaskService } from './api/task.service';
import { Task } from './api/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  ngOnInit() {}

  constructor(private taskService: TaskService) {}
}
