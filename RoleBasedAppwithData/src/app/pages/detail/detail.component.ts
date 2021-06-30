import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  userId: string;
  currentUser: User;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('detailUser'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.userId = params.get('id');
      }
    });
  }
}
