import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.page.html',
  styleUrls: ['./select-course.page.scss'],
})
export class SelectCoursePage implements OnInit {

  private list: [];
  private idCourse: number = undefined;

  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getCourses().subscribe(data => {
      this.list = data;
    }, error => {
      console.log(error);
    })
  }

  setCourse(idCourse: number) {
    this.api.setCourse(idCourse, localStorage.getItem('sub')).subscribe(data => {
      console.log(data);
      this.userPage(data.email);
    }, error => {
      console.log(error);
    })

  }

  userPage(email: string) {
    if (email.includes('aluno')) {
      this.router.navigate(['student'], { replaceUrl: true });
    } else {
      this.router.navigate(['supervisor'], { replaceUrl: true });
    }
  }

}
