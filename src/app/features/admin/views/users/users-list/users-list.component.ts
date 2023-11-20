import {Component, inject, OnInit} from '@angular/core';
import {AdmUserService} from "../../../../../services/adm/adm-user.service";
import {ToasterService} from "../../../../../services/oth/toaster.service";
import {AdmUser} from "../../../../../data/models/admin";
import {ToasterEnum} from "../../../../../global/toaster-enum";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  private userService: AdmUserService  = inject(AdmUserService);
  private toastService: ToasterService = inject(ToasterService);

  user: AdmUser[] = [];

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.userService.findAll().subscribe({
      next: (response) => this.user = response.body ?? [],
      error: _ => this.toastService.show({ type: ToasterEnum.ERROR, message: 'txt_server_error' })
    });
  }

}
